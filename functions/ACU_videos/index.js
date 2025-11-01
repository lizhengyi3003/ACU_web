export async function onRequest(context) {
  const filename = context.params.filename; // 获取路径参数
  const object = await context.env.content.get(`ACU_videos/${filename}`); // 从R2读取

  // 判断Content-Type
  function getContentType(filename) {
    if (filename.endsWith('.mp4')) return 'video/mp4';
    if (filename.endsWith('.webm')) return 'video/webm';
    if (filename.endsWith('.ogg')) return 'video/ogg';
    return 'application/octet-stream';
  }

  if (object) {
    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || getContentType(filename),
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } else {
    return new Response('Not found', { status: 404 });
  }
}