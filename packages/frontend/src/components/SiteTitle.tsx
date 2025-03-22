import Link from "next/link";

export function SiteTitle() {
  return (
    <Link href="/">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent py-2 hover:opacity-80 transition-opacity">
        Bookmark Speaker
      </h1>
    </Link>
  );
}
