export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  let key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

  if (!key.startsWith("ACU_images/")) {
    return new Response('Not Found', { status: 404 });
  }

  const object = await env["acu-web-assets"].get(key);
  if (!object) {
    return new Response('File Not Found', { status: 404 });
  }

  let contentType = 'application/octet-stream';
  if (key.endsWith('.ico')) contentType = 'image/x-icon';
  else if (key.endsWith('.png')) contentType = 'image/png';
  else if (key.endsWith('.jpg') || key.endsWith('.jpeg')) contentType = 'image/jpeg';
  else if (key.endsWith('.gif')) contentType = 'image/gif';
  else if (key.endsWith('.webp')) contentType = 'image/webp';

  return new Response(object.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}