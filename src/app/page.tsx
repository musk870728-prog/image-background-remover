"use client";

import { useState, useCallback } from "react";
import UploadArea from "@/components/UploadArea";
import Spinner from "@/components/Spinner";
import ResultView from "@/components/ResultView";
import ErrorMessage from "@/components/ErrorMessage";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 4 * 1024 * 1024; // 4MB (Vercel 限制)

type Status = "idle" | "uploading" | "processing" | "success" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("idle");
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const reset = useCallback(() => {
    setStatus("idle");
    setResultUrl(null);
    setError("");
    setFileName("");
  }, []);

  const handleFile = useCallback(async (file: File) => {
    // 验证文件类型
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("不支持的图片格式，请使用 JPG、PNG 或 WebP");
      setStatus("error");
      return;
    }

    // 验证文件大小
    if (file.size > MAX_SIZE) {
      setError("图片太大，请上传 4MB 以内的图片");
      setStatus("error");
      return;
    }

    setFileName(file.name);
    setStatus("uploading");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setStatus("processing");

      const res = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "处理失败，请重试");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStatus("success");
    } catch (err: any) {
      setError(err.message || "网络错误，请检查连接后重试");
      setStatus("error");
    }
  }, []);

  return (
    <main className="w-full max-w-xl">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧐 图片背景移除
          </h1>
          <p className="text-gray-500">上传图片，一键移除背景</p>
        </div>

        {/* Upload Area */}
        {(status === "idle" || status === "error") && (
          <UploadArea onFileSelect={handleFile} />
        )}

        {/* Error Message */}
        {status === "error" && (
          <div className="mt-4">
            <ErrorMessage message={error} onRetry={reset} />
          </div>
        )}

        {/* Spinner */}
        {(status === "uploading" || status === "processing") && (
          <Spinner
            message={
              status === "uploading" ? "正在上传图片..." : "正在移除背景..."
            }
          />
        )}

        {/* Result */}
        {status === "success" && resultUrl && (
          <div className="mt-6">
            <ResultView url={resultUrl} fileName={fileName} onReset={reset} />
          </div>
        )}

        {/* Footer */}
        {status === "idle" && (
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <a
              href="https://github.com/musk870728-prog/image-background-remover"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              View on GitHub →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
