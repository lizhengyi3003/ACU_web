// Cloudflare Worker API: /api/sendcode
// 依赖：KV 命名空间 acu-web-kv，MailerSend API Token 存储于环境变量 MAILERSEND_TOKEN

import { buildVerifyMail } from './mailTemplate.js';

export async function onRequest(context) {
  const { request, env } = context;
  try {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    const { email, turnstileToken } = await request.json();
    if (!email) {
      return new Response('邮箱不能为空', { status: 400 });
    }
    // 校验邮箱格式
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      return new Response('邮箱格式错误', { status: 400 });
    }
    // 校验人机验证token（Cloudflare Turnstile）
    if (!turnstileToken) {
      return new Response('请先完成人机验证', { status: 400 });
    }
    const secretKey = env['cf-turnstile'];
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: turnstileToken,
        // remoteip: request.headers.get('CF-Connecting-IP') || ''
      })
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return new Response('你被判定为机器人，请刷新界面重新验证', { status: 400 });
    }

    // 生成6位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 获取 SendPulse access_token
    const tokenRes = await fetch('https://api.sendpulse.com/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: env.SENDPULSE_CLIENT_ID,      // 需在环境变量中配置
        client_secret: env.SENDPULSE_CLIENT_SECRET // 需在环境变量中配置
      })
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return new Response('SendPulse授权失败', { status: 500 });
    }
    const accessToken = tokenData.access_token;

    // 使用模板生成邮件内容
    const { subject, text } = buildVerifyMail(code, email);

    // 发送邮件（SendPulse API）
    // 具体API参数请参考 https://sendpulse.com/integrations/api
    const mailRes = await fetch('https://api.sendpulse.com/smtp/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: {
          from: { email: '', name: '' }, // 发件人邮箱和姓名（需补充）
          to: [{ email }],               // 收件人邮箱
          subject,                       // 邮件主题
          text                           // 邮件正文
          // 其它参数可参考SendPulse文档
        }
      })
    });
    const mailData = await mailRes.json();
    // SendPulse返回结构请根据实际API文档调整
    if (!mailData.result) { // result字段仅为示例，请根据实际API返回判断
      return new Response('邮件发送失败', { status: 500 });
    }

    // 存储验证码到 KV，5分钟有效
    await env['acu-web-kv'].put(email, code, { expirationTtl: 300 });

    return new Response('验证码已发送');
  } catch (err) {
    return new Response('ERROR: ' + err.message, { status: 500 });
  }
}
