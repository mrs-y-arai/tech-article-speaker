import Link from "next/link";

export default function SignUpCompletedPage() {
  return (
    <div className="min-h-screen text-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md mx-auto">
        <h1 className="mb-4 text-center text-2xl font-bold">
          登録が完了しました
        </h1>
        <p className="text-center text-gray-600">
          アカウントの本登録が完了しました。
        </p>
        <Link
          className="text-primary underline mx-auto w-fit block mt-3"
          href="/"
        >
          TOPへ
        </Link>
      </div>
    </div>
  );
}
