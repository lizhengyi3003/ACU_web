export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // 获取路径最后一段作为文件名
    const filename = url.pathname.split('/').pop();
    const object = await env.content.get(`ACU_images/${filename}`);

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
}