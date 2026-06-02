const REMOVE_BG_API = "https://api.remove.bg/v1.0/removebg";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile) {
      return Response.json({ error: "请上传图片" }, { status: 400 });
    }

    // 验证类型
    if (!ALLOWED_TYPES.includes(imageFile.type)) {
      return Response.json(
        { error: "不支持的图片格式，请使用 JPG、PNG 或 WebP" },
        { status: 400 }
      );
    }

    // 验证大小
    if (imageFile.size > MAX_SIZE) {
      return Response.json(
        { error: "图片太大，请上传 5MB 以内的图片" },
        { status: 400 }
      );
    }

    // 转 base64
    const buffer = await imageFile.arrayBuffer();
    const base64 = btoa(
      String.fromCharCode(...new Uint8Array(buffer))
    );

    // 调用 Remove.bg
    const apiKey = process.env.REMOVE_BG_API_KEY;
    if (!apiKey) {
      console.error("REMOVE_BG_API_KEY not configured");
      return Response.json(
        { error: "服务配置错误，请联系管理员" },
        { status: 500 }
      );
    }

    const bgRes = await fetch(REMOVE_BG_API, {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_file_b64: base64,
        size: "auto",
        type: "auto",
        scale: "original",
      }),
    });

    if (!bgRes.ok) {
      const errorText = await bgRes.text();
      console.error("Remove.bg error:", bgRes.status, errorText);

      const errorMap: Record<number, string> = {
        401: "API Key 无效",
        402: "API 额度已用完",
        429: "请求太频繁，请稍后重试",
      };

      return Response.json(
        { error: errorMap[bgRes.status] || "背景移除服务暂时不可用" },
        { status: 500 }
      );
    }

    // 返回图片
    const imageBuffer = await bgRes.arrayBuffer();
    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="removed-bg-${Date.now()}.png"`,
      },
    });
  } catch (err: any) {
    console.error("Server error:", err);
    return Response.json(
      { error: "服务器内部错误，请稍后重试" },
      { status: 500 }
    );
  }
}
