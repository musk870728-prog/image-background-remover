# Image Background Remover

> 一个轻量级的在线图片背景移除工具，基于 Cloudflare Workers + Remove.bg API

## 项目简介

让用户通过简单的上传操作即可获得去背景后的图片，适用于电商产品图、头像制作、设计素材处理等场景。

## 技术栈

- **前端：** HTML + Vanilla JavaScript + CSS3
- **后端：** Cloudflare Workers + TypeScript
- **外部 API：** Remove.bg API
- **路由：** itty-router

## 快速开始

### 前置要求

1. [Node.js](https://nodejs.org/) (v18+)
2. [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
3. [Remove.bg API Key](https://www.remove.bg/api)

### 安装

```bash
# 克隆项目
git clone https://github.com/yourname/image-background-remover.git
cd image-background-remover

# 安装依赖
npm install

# 配置 API Key
npx wrangler secret put REMOVE_BG_API_KEY
# 输入你的 Remove.bg API Key
```

### 本地开发

```bash
# 启动本地开发服务器
npm run dev
```

访问 http://localhost:8787 测试

### 部署到 Cloudflare

```bash
# 登录 Cloudflare
npx wrangler login

# 部署
npm run deploy
```

## 项目结构

```
image-background-remover/
├── public/          # 前端静态文件
│   └── index.html   # 主页面
├── worker/          # Cloudflare Worker 代码
│   ├── src/
│   │   └── index.ts # Worker 主入口
│   └── wrangler.toml # Cloudflare 配置
├── docs/            # 项目文档
│   └── DEPLOYMENT.md
├── MVP_REQUIREMENTS.md  # MVP 需求文档
└── README.md
```

## 功能特性

✅ 单张图片上传和处理  
✅ 支持 JPG、PNG、WebP 格式  
✅ 点击或拖拽上传  
✅ 即时预览和下载  
✅ 简单的错误提示  
✅ 响应式设计（支持移动端）

## 限制说明

- 图片大小限制：5MB
- Remove.bg 免费版：每月 50 张
- Cloudflare Workers 免费版：每天 100,000 请求

## 待办事项

- [ ] 批量处理功能
- [ ] 图片裁剪和调整大小
- [ ] 支持更多图片格式
- [ ] 用户账户系统
- [ ] 图片历史记录

## 文档

- [MVP 需求文档](./MVP_REQUIREMENTS.md)
- [部署指南](./docs/DEPLOYMENT.md)

## License

MIT

## 作者

[@克林](https://github.com/yourname)