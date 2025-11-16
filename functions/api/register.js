export async function onRequest(context) {
  const { request, env } = context;
  try {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // 解析表单数据
    const contentType = request.headers.get('content-type') || '';
    let formData;
    if (contentType.includes('multipart/form-data')) {
      formData = await request.formData();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      formData = await request.formData();
    } else if (contentType.includes('application/json')) {
      const json = await request.json();
      formData = new Map(Object.entries(json));
    } else {
      return new Response('Unsupported Content-Type', { status: 400 });
    }

    // 获取字段
    const mail = formData.get ? formData.get('mail') : formData.get('mail');
    const password = formData.get ? formData.get('password') : formData.get('password');
    const password_confirm = formData.get ? formData.get('password_confirm') : formData.get('password_confirm');
    const verify_code = formData.get ? formData.get('verify_code') : formData.get('verify_code');

    // Turnstile 校验
    const turnstileToken = formData.get
      ? formData.get('cf-turnstile-response')
      : formData.get('cf-turnstile-response');
    if (!turnstileToken) {
      return new Response('FALSE-3'); // 没有人机验证token
    }

    // 校验 Turnstile token
    const secretKey = env['cf-turnstile']; // 你的secret
    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: turnstileToken,
        // remoteip: context.request.headers.get('CF-Connecting-IP') || '' // 可选
      })
    });
    const verifyJson = await verifyRes.json();
    if (!verifyJson.success) {
      // 机器人或验证失败
      return new Response('FALSE-4');
    }

    // 邮箱格式校验
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(mail)) {
      return new Response('FALSE-5'); // 邮箱格式错误
    }

    // 密码一致性校验
    if (password !== password_confirm) {
      return new Response('FALSE-1'); // 密码不一致
    }

    // 验证码校验（假设验证码存储在 KV 或 D1，示例用 env.ACU_VERIFY_KV）
    if (!verify_code) {
      return new Response('FALSE-3'); // 验证码未填写
    }
    // 这里假设验证码存储为 key: mail, value: code
    const codeInStore = await env.ACU_VERIFY_KV.get(mail);
    if (!codeInStore || codeInStore !== verify_code) {
      return new Response('FALSE-3'); // 验证码错误
    }

    // 检查邮箱是否已注册
    const db = env['acu-web-sql'];
    const checkSql = 'SELECT COUNT(*) as count FROM users WHERE mail = ?';
    const checkRes = await db.prepare(checkSql).bind(mail).first();
    if (checkRes && checkRes.count > 0) {
      return new Response('FALSE-2'); // 用户已存在
    }

    // 注册用户
    const insertSql = 'INSERT INTO users (mail, password) VALUES (?, ?)';
    await db.prepare(insertSql).bind(mail, password).run();

    // 注册成功，删除验证码
    await env.ACU_VERIFY_KV.delete(mail);

    return new Response('TRUE'); // 注册成功
  } catch (err) {
    // 错误日志
    return new Response('ERROR: ' + err.message, { status: 500 });
  }
}