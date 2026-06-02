# Image Background Remover - 部署指南

本文档介绍如何部署 Image Background Remover 到 Cloudflare Workers。

## 前置条件

1. **Cloudflare 账号**  
   注册地址：https://dash.cloudflare.com/sign-up

2. **Remove.bg API Key**  
   注册地址：https://www.remove.bg/api  
   免费额度：每月 50 张图片

3. **Node.js 和 npm**  
   Node.js v18+ 和 npm 9+

## 步骤 1：安装 Wrangler CLI

```bash
npm install -g wrangler
```

## 步骤 2：登录 Cloudflare

```bash
wrangler login
```

这会打开浏览器，授权 Wrangler 访问你的 Cloudflare 账号。

## 步骤 3：配置环境变量

在项目根目录运行：

```bash
cd worker
wrangler secret put REMOVE_BG_API_KEY
```

输入你的 Remove.bg API Key。

**⚠️ 重要：** API Key 会加密存储在 Cloudflare，不会暴露在代码中。

## 步骤 4：测试本地开发

```bash
npm run dev
```

访问 http://localhost:8787 测试功能是否正常。

## 步骤 5：部署到 Cloudflare Workers

```bash
npm run deploy
```

部署成功后，你会获得一个 Workers 域名，例如：
```
https://image-background-remover.your-subdomain.workers.dev
```

## 步骤 6：配置自定义域名（可选）

### 6.1 在 Cloudflare Dashboard 配置

1. 访问 https://dash.cloudflare.com
2. 进入 Workers & Pages
3. 选择你的 Worker
4. 点击 Settings → Triggers → Custom Domains
5. 添加你的域名（例如 `bg-remover.yourdomain.com`）

### 6.2 配置 DNS

确保你的域名 DNS 记录指向 Cloudflare：
```
A    bg-remover    -> Cloudflare IP
CNAME bg-remover    -> your-worker.workers.dev
```

## 验证部署

1. 访问你的域名
2. 上传一张测试图片
3. 等待处理完成
4. 下载去背景后的图片

## 监控和日志

### 查看日志

```bash
wrangler tail
```

### 查看指标

访问 Cloudflare Dashboard → Workers & Pages → 你的 Worker → Analytics

## 常见问题

### Q1: 部署失败提示 "Authentication error"

**解决：** 重新运行 `wrangler login` 重新认证。

### Q2: API 调用失败

**检查：**
- Remove.bg API Key 是否正确配置
- 免费额度是否用完
- 网络连接是否正常

### Q3: 图片上传失败

**检查：**
- 图片大小是否超过 5MB
- 图片格式是否为 JPG/PNG/WebP
- 浏览器是否支持 FormData API

### Q4: 自定义域名访问 404

**解决：**
- 检查 DNS 记录是否正确
- 确保 Worker 已绑定到自定义域名
- 等待 DNS 生效（最长 48 小时）

## 成本估算

| 服务 | 免费额度 | 超出费用 |
|------|---------|---------|
| Cloudflare Workers | 10万请求/天 | $5/月（100万请求） |
| Remove.bg | 50张/月 | $0.20/张（按量） |
| 域名 | 可用自有域名 | ~$10/年 |

## 更新部署

修改代码后，重新运行：

```bash
npm run deploy
```

## 回滚

如果新版本有问题，可以查看部署历史：

```bash
wrangler versions list
wrangler rollback <version-id>
```

## 联系方式

如有问题，请提交 Issue：
https://github.com/yourname/image-background-remover/issues