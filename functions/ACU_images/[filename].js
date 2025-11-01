export async function onRequest(context) {
  const filename = context.params.filename; // 获取路径参数
  const object = await context.env.content.get(`ACU_images/${filename}`); // 从R2读取

  // 判断Content-Type
  function getContentType(filename) {
    if (filename.endsWith('.png')) return 'image/png';
    if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
    if (filename.endsWith('.gif')) return 'image/gif';
    if (filename.endsWith('.webp')) return 'image/webp';
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