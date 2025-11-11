export async function onRequest(context) {
  const { request, env } = context;
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  const db = acu-web-sql; 
  const { results } = await db.prepare(
    `SELECT * FROM account 
     WHERE (username = ? OR phone = ? OR mail = ?)
     AND password = ?`
  ).bind(username, username, username, password).all();

  if (results && results.length > 0) {
    return new Response('TRUE');
  } else {
    return new Response('FALSE');
  }
}