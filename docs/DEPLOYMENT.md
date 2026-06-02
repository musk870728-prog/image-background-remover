# 部署指南

## 部署到 Vercel（推荐）

Vercel 是 Next.js 的官方部署平台，支持开箱即用。

### 步骤

1. 访问 https://vercel.com/new
2. 导入 GitHub 仓库 `musk870728-prog/image-background-remover`
3. 在环境变量中添加：
   - `REMOVE_BG_API_KEY` = 你的 Remove.bg API Key
4. 点击部署

### 自动部署

连接 GitHub 后，每次推送 `master` 分支都会自动重新部署。

## 部署到 Cloudflare Pages

Next.js 在 Cloudflare Pages 需要额外配置：

1. 安装 `@cloudflare/next-on-pages`
2. 按照 [官方文档](https://developers.cloudflare.com/pages/framework-guides/nextjs/) 配置

## 监控

- Vercel: Dashboard → Analytics
- Cloudflare: Dashboard → Workers & Pages → Analytics

