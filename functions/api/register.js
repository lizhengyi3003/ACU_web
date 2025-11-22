export async function onRequest(context) {
  const { request, env } = context;
  try {
    // 只接受 POST 请求
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    // 解析表单数据
    const contentType = request.headers.get('content-type') || '';
    let formData;
    if (contentType.includes('multipart/form-data')) {
      formData = await request.formData();
    } else {
      return new Response('Unsupported Content-Type', { status: 400 });
    }
    // 获取字段
    const email = formData.get ? formData.get('email') : formData.get('email');
    const password = formData.get ? formData.get('password') : formData.get('password');
    const password_confirm = formData.get ? formData.get('password_confirm') : formData.get('password_confirm');
    const verify_code = formData.get ? formData.get('verify_code') : formData.get('verify_code');
    // 邮箱格式校验
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailReg.test(email)) {
      return new Response('FALSE-1'); 
    }
    // 密码一致性校验
    if (password !== password_confirm) {
      return new Response('FALSE-2'); 
    }
    // 验证码校验
    if (!verify_code) {
      return new Response('no-verify-code'); 
    }
    const codeInStore = await env['acu-web-kv'].get(email);
    if (!codeInStore) {
      return new Response('FALSE-5');
    }
    if (codeInStore !== verify_code) {
      return new Response('FALSE-7'); 
    }
    // 检查邮箱是否已注册
    const db = env['acu-web-sql'];
    const checkSql = 'SELECT COUNT(*) as count FROM account WHERE email = ?';
    const checkRes = await db.prepare(checkSql).bind(email).first();
    if (checkRes && checkRes.count > 0) {
      return new Response('FALSE-8'); 
    }
    // 注册用户
    const maxIdRes = await db.prepare('SELECT MAX(id) as maxId FROM account').first();
    const id = (maxIdRes && maxIdRes.maxId ? maxIdRes.maxId : 0) + 1;
    const insertSql = 'INSERT INTO account (id, email, password) VALUES (?, ?, ?)';
    await db.prepare(insertSql).bind(id, email, password).run();
    // 注册成功，删除验证码
    await env['acu-web-kv'].delete(email);
    return new Response('TRUE-2');
  } catch (err) {
    return new Response('ERROR: ' + err.message, { status: 500 });
  }
}