interface SpinnerProps {
  message: string;
}

export default function Spinner({ message }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 animate-spin" />
      </div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}
