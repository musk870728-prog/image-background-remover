# Image Background Remover

> 一个轻量级的在线图片背景移除工具，基于 Next.js + Tailwind CSS + Remove.bg API

## 技术栈

- **前端：** Next.js 14 (App Router) + React 18
- **样式：** Tailwind CSS
- **API 后端：** Next.js API Route
- **外部 API：** [Remove.bg API](https://www.remove.bg/api)
- **部署：** Cloudflare Pages / Vercel

## 快速开始

### 前置要求

1. Node.js 18+
2. [Remove.bg API Key](https://www.remove.bg/api)（免费版每月 50 张）

### 安装

```bash
git clone https://github.com/musk870728-prog/image-background-remover.git
cd image-background-remover

# 安装依赖
npm install

# 配置 API Key
cp .env.local.example .env.local
# 编辑 .env.local，填入你的 Remove.bg API Key
```

### 本地开发

```bash
npm run dev
```

访问 http://localhost:3000

### 部署到 Cloudflare Pages

1. 在 Cloudflare Dashboard 创建 Pages 项目
2. 连接到 GitHub 仓库
3. 构建设置：
   - **Build command:** `npm run build`
   - **Build output:** `.next`
4. 在环境变量中添加 `REMOVE_BG_API_KEY`
5. 部署！

> 注意：Next.js 在 Cloudflare Pages 上需要配合 `@cloudflare/next-on-pages` 使用，或者直接部署到 Vercel。

## 项目结构

```
image-background-remover/
├── src/
│   ├── app/
│   │   ├── globals.css          # 全局样式 (Tailwind)
│   │   ├── layout.tsx           # 根布局
│   │   ├── page.tsx             # 主页
│   │   └── api/remove-bg/
│   │       └── route.ts         # 去背景 API
│   └── components/
│       ├── UploadArea.tsx       # 上传区域
│       ├── Spinner.tsx          # 加载动画
│       ├── ResultView.tsx       # 结果预览
│       └── ErrorMessage.tsx     # 错误提示
├── docs/
│   └── DEPLOYMENT.md
├── MVP_REQUIREMENTS.md
└── README.md
```

## 功能特性

✅ 单张图片上传和处理（支持 JPG/PNG/WebP）  
✅ 点击或拖拽上传  
✅ 即时预览和下载  
✅ 客户端文件验证（类型 + 大小）  
✅ 友好的错误提示  
✅ 响应式设计（桌面端 + 移动端）  
✅ Modern UI（Tailwind CSS）

## 成本

| 服务 | 免费额度 | 超出费用 |
|------|---------|---------|
| Vercel / Cloudflare Pages | 标准免费额度 | 按量计费 |
| Remove.bg | 50张/月 | $0.20/张 |
