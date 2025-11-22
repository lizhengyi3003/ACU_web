// 邮件模板生成函数
export function buildVerifyMail(code, email) {
  return {
    subject: '您的验证码',
    text: `尊敬的羽协会员（${email}）：\n\n您正在注册羽协账户，您的验证码是：${code}，5分钟内有效。如非本人操作请忽略。\n\n飞船ACU团队`,
    html: `
      <div style="max-width:500px;margin:50px auto;padding:25px 35px;background:#fff;border-radius:10px;box-shadow:2px 2px 10px rgba(0,0,0,0.08);">
        <h2 style="color:#2d8cf0;margin-bottom:15px;">羽毛球协会注册验证码</h2>
        <p style="font-size:15px;color:#333;">尊敬的羽协会员（${email}）：</p>
        <p style="font-size:15px;color:#333;margin:25px 0 15px 0;">
          您正在注册羽协账户，您的验证码是：<span style="font-size:25px;font-weight:bold;color:#2d8cf0;">${code}</span>
        </p>
        <p style="font-size:15px;color:#888;">5分钟内有效。如非本人操作请忽略。</p>
        <div style="border-top:1px solid #eee;margin:35px 0 5px 0;padding-top:15px;">
          <span style="font-size:10px;color:#aaa;">飞船ACU团队</span>
        </div>
      </div>
    `
  };
}