import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen bg-[#1e1e1e] text-[#cccccc] flex flex-col items-center justify-center font-mono">
      <p className="text-[#4ec9b0] text-sm mb-4">{`// 404.tsx — file not found`}</p>
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-lg text-[#777] mb-2">
        The file you're looking for doesn't exist.
      </p>
      <p className="text-sm text-[#777] mb-8">
        It may have been moved, deleted, or never existed.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-[#007acc] text-white rounded text-sm hover:bg-[#005a9e] transition-colors no-underline"
      >
        Go to Home
      </Link>
    </div>
  );
}
