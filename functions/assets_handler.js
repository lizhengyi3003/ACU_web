export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  let key = url.pathname.startsWith('/') ? url.pathname.slice(1) : url.pathname;

  // 允许访问指定目录下的资源
  const allowPrefixes = [
    "ACU_videos/",
    "ACU_assets/ACU_fonts/",
    "ACU_assets/ACU_images/"
  ];
  if (!allowPrefixes.some(prefix => key.startsWith(prefix))) {
    return new Response('Not Found', { status: 404 });
  }

  // 从 R2 读取对象
  const object = await env["acu-web-assets"].get(key);
  if (!object) {
    return new Response('File Not Found', { status: 404 });
  }

  // 设置 Content-Type
  let contentType = 'application/octet-stream';
  if (key.endsWith('.mp4')) contentType = 'video/mp4';
  else if (key.endsWith('.jpg') || key.endsWith('.jpeg')) contentType = 'image/jpeg';
  else if (key.endsWith('.png')) contentType = 'image/png';
  else if (key.endsWith('.ttf')) contentType = 'font/ttf';
  else if (key.endsWith('.otf')) contentType = 'font/otf';
  else if (key.endsWith('.woff')) contentType = 'font/woff';
  else if (key.endsWith('.woff2')) contentType = 'font/woff2';

  return new Response(object.body, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600'
    }
  });
}