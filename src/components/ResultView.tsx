interface ResultViewProps {
  url: string;
  fileName: string;
  onReset: () => void;
}

export default function ResultView({ url, fileName, onReset }: ResultViewProps) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `removed-bg-${Date.now()}.png`;
    a.click();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">✅ 处理完成</h2>
        <span className="text-xs text-gray-400 truncate max-w-[200px]">
          {fileName}
        </span>
      </div>

      {/* 透明背景网格预览 */}
      <div
        className="rounded-xl border border-gray-200 p-3 mb-5 overflow-hidden"
        style={{
          backgroundImage:
            "conic-gradient(#e5e7eb 0 25%, #fff 0 50%)",
          backgroundSize: "20px 20px",
        }}
      >
        <img
          src={url}
          alt="移除背景后的图片"
          className="w-full h-auto rounded-lg mx-auto"
        />
      </div>

      {/* 按钮组 */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
        >
          ⬇️ 下载图片
        </button>
        <button
          onClick={onReset}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 active:scale-[0.98]"
        >
          🔄 继续处理
        </button>
      </div>
    </div>
  );
}
