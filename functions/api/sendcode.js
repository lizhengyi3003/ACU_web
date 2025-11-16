// Cloudflare Worker API: /api/sendcode
// 依赖：KV 命名空间 acu-web-kv，MailerSend API Token 存储于环境变量 MAILERSEND_TOKEN
// 发送邮箱验证码并存储到 KV

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
    // 可选：校验人机验证token（如需安全，可复用 register.js 的校验逻辑）
    // ...

    // 生成6位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 使用模板生成邮件内容
    const { subject, text } = buildVerifyMail(code, email);

    // 发送邮件
    const mailRes = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.MAILERSEND_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: { email: 'MS_hGaadw@test-eqvygm01zwdl0p7w.mlsender.net', name: 'ACU' },
        to: [{ email }],
        subject,
        text
      })
    });
    const mailData = await mailRes.json();
    if (!mailData.message_id) {
      return new Response('邮件发送失败', { status: 500 });
    }

    // 存储验证码到 KV，5分钟有效
    await env['acu-web-kv'].put(email, code, { expirationTtl: 300 });

    return new Response('验证码已发送');
  } catch (err) {
    return new Response('ERROR: ' + err.message, { status: 500 });
  }
}
