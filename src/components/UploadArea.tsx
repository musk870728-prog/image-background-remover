"use client";

import { useCallback, useRef, useState } from "react";

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export default function UploadArea({ onFileSelect }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => inputRef.current?.click();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFileSelect(file);
      // reset so same file can be re-selected
      e.target.value = "";
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        relative cursor-pointer rounded-xl border-2 border-dashed p-10
        transition-all duration-200 text-center
        ${
          isDragging
            ? "border-indigo-400 bg-indigo-50 scale-[1.02]"
            : "border-gray-300 bg-gray-50/50 hover:border-indigo-300 hover:bg-indigo-50/30"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
      />

      <div className="text-5xl mb-4 select-none">
        {isDragging ? "📥" : "📷"}
      </div>
      <p className="text-base font-medium text-gray-600 mb-1">
        {isDragging ? "松开鼠标上传" : "点击或拖拽图片到此处"}
      </p>
      <p className="text-xs text-gray-400">支持 JPG、PNG、WebP，最大 5MB</p>
    </div>
  );
}
