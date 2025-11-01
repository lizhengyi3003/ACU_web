export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // 获取路径最后一段作为文件名
    const filename = url.pathname.split('/').pop();
    const object = await env['acu-web-assets'].get(`ACU_videos/${filename}`);

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
}