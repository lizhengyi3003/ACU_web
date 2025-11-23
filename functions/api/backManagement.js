export async function onRequest(context) {
  const { env } = context;
  const db = env['acu-web-sql'];
  const result = await db.prepare('SELECT id FROM account ORDER BY id DESC LIMIT 1').first();
  return new Response(JSON.stringify({ lastId: result?.id || 0 }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
