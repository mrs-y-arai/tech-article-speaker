import Link from "next/link";
import { X } from "lucide-react";

export default function BookmarkListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link
        href="/"
        prefetch
        className="absolute text-foreground top-4 right-4 p-2 rounded-full hover:opacity-60 transition-opacity"
      >
        <X className="h-6 w-6" />
      </Link>
      {children}
    </div>
  );
}
