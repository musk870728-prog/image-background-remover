import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "图片背景移除 | Image Background Remover",
  description: "快速移除图片背景的在线工具，支持 JPG、PNG、WebP 格式",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}
