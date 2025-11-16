// 邮件模板生成函数
export function buildVerifyMail(code, email) {
  return {
    subject: '您的验证码',
    text: `尊敬的用户（${email}）：\n\n您的验证码是：${code}，5分钟内有效。如非本人操作请忽略。\n\nACU团队`
    // 如需 HTML 格式可加 html 字段
    // html: `<p>尊敬的用户（${email}）：<br>您的验证码是：<b>${code}</b>，5分钟内有效。如非本人操作请忽略。<br>ACU团队</p>`
  };
}
