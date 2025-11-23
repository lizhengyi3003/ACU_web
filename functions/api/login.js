export async function onRequest(context) {
  try {
    const { request, env } = context;
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    const db = env['acu-web-sql'];
    const { results } = await db.prepare(
      `SELECT * FROM account 
       WHERE (username = ? OR phone = ? OR email = ?)
       AND password = ?`
    ).bind(username, username, username, password).all();

    if (results && results.length > 0) {
      return new Response(JSON.stringify({
        success: true,
        admin: results[0].limitation === 'admin',
      }), { headers: { 'Content-Type': 'application/json'} });
    } else {
      return new Response(JSON.stringify({
        success: false,
        admin: false
      }), { headers: { 'Content-Type': 'application/json'} });
    }
  } catch (err) {
    return new Response('ERROR: ' + err.message, { status: 500 });
  }
}