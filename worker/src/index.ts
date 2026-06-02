import { Router } from 'itty-router';

const router = Router();

/**
 * CORS 预检请求处理
 */
router.options('*', () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
});

/**
 * 主页路由 - 返回前端 HTML
 */
router.get('/', () => {
  // 从 KV 或本地读取 index.html（这里简化为静态返回）
  // 实际部署时，前端应该部署到 Cloudflare Pages
  return new Response('请访问 Cloudflare Pages 部署的前端页面', {
    status: 200,
    headers: { 'Content-Type': 'text/plain' },
  });
});

/**
 * 健康检查
 */
router.get('/health', () => {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

/**
 * 去背景 API 端点
 */
router.post('/api/remove-bg', async (request, env) => {
  try {
    // 1. 解析请求
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return new Response(JSON.stringify({ error: 'No image provided' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 2. 验证文件大小（5MB）
    const MAX_SIZE = 5 * 1024 * 1024;
    if (imageFile.size > MAX_SIZE) {
      return new Response(JSON.stringify({ error: 'Image too large (max 5MB)' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 3. 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(imageFile.type)) {
      return new Response(JSON.stringify({ error: 'Unsupported image type (use JPG, PNG, or WebP)' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 4. 转换为 base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64Image = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    // 5. 调用 Remove.bg API
    const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': env.REMOVE_BG_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_file_b64: base64Image,
        size: 'auto',
        type: 'auto',
        scale: 'original',
        detect: 'default',
      }),
    });

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text();
      console.error('Remove.bg error:', errorText);

      let errorMessage = 'Failed to remove background';
      if (removeBgResponse.status === 401) {
        errorMessage = 'Invalid API Key';
      } else if (removeBgResponse.status === 402) {
        errorMessage = 'API quota exceeded';
      } else if (removeBgResponse.status === 429) {
        errorMessage = 'Too many requests';
      }

      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 6. 返回处理后的图片
    const processedImage = await removeBgResponse.arrayBuffer();

    return new Response(processedImage, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="removed-bg-${Date.now()}.png"`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Disposition',
      },
    });

  } catch (error: any) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});

/**
 * 404 处理
 */
router.all('*', () => {
  return new Response('Not Found', { status: 404 });
});

/**
 * Cloudflare Worker 入口
 */
export default {
  fetch: (request: Request, env: Env, ctx: ExecutionContext) => {
    return router.handle(request, env, ctx).catch((err) => {
      console.error('Router error:', err);
      return new Response('Internal Error', { status: 500 });
    });
  },
};

/**
 * 环境变量类型定义
 */
interface Env {
  REMOVE_BG_API_KEY: string;
}