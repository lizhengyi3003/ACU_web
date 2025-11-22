// 导入邮件内容的模板
import { buildVerifyMail } from './mailTemplate.js';
// 接受前端POST请求
export async function onRequest(context) {
  const { request, env } = context;
  try {
    console.log('收到请求');
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    // 校验邮箱是否存在
    const { email, turnstileToken } = await request.json();
    console.log('参数解析', { email, turnstileToken });
    if (!email) {
      return new Response('邮箱不能为空', { status: 400 });
    }
    // 校验邮箱格式
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      return new Response('FALSE-1', { status: 400 });
    }
    // 校验人机验证token（Cloudflare Turnstile）
    if (!turnstileToken) {
      return new Response('FALSE-3', { status: 400 });
    }
    const secretKey = env['cf-turnstile'];
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: turnstileToken,
      })
    });
    const verifyData = await verifyRes.json();
    console.log('Turnstile 校验结果', verifyData);
    if (!verifyData.success) {
      return new Response('FALSE-4', { status: 400 });
    }
    // 生成6位验证码（保证生成的验证码一定是6位数且不会出现前导0）
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // 获取 SendPulse access_token
    const tokenRes = await fetch('https://api.sendpulse.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: env.SENDPULSECLIENTID,
        client_secret: env.SENDPULSECLIENTSECRET
      })
    });
    const tokenData = await tokenRes.json();
    console.log('SendPulse tokenData', tokenData);
    if (!tokenData.access_token) {
      return new Response('SendPulse授权失败, tokenData: ' + JSON.stringify(tokenData), { status: 500 });
    }
    const accessToken = tokenData.access_token;
    // 使用模板生成邮件内容
    const { subject, text } = buildVerifyMail(code, email);
    // 发送邮件
    const mailRes = await fetch('https://api.sendpulse.com/smtp/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: {
          from: { email: 'acu@feichuan.ltd', name: '飞船ACU' },
          to: [{ email }],
          subject,
          text
        }
      })
    });
    const mailData = await mailRes.json();
    console.log('SendPulse mailData', mailData);
    if (!mailData.result) {
      return new Response('FALSE-6, mailData: ' + JSON.stringify(mailData), { status: 500 });
    }
    // 存储验证码到 KV，5分钟有效
    try {
      console.log('准备存储到KV', { email, code });
      await env['acu-web-kv'].put(email, code, { expirationTtl: 300 });
      console.log('验证码已存储到KV');
      // 存储成功
      return new Response('验证码储存到KV成功');
    } catch (kvErr) {
      // 存储失败
      return new Response('验证码储存到KV失败, kvErr: ' + kvErr.message, { status: 500 });
    }
  } catch (err) {
    // 其它未知错误
    return new Response('未知错误, err: ' + err.message, { status: 500 });
  }
}