interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">❌</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-red-800 mb-1">处理失败</p>
          <p className="text-sm text-red-600 break-words">{message}</p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="mt-3 w-full text-sm text-red-700 bg-red-100 hover:bg-red-200 font-medium py-2 px-4 rounded-lg transition-colors"
      >
        重新上传
      </button>
    </div>
  );
}
