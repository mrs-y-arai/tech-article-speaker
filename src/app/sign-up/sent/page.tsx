export default function SignUpSentPage() {
  return (
    <div className="min-h-screen text-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md mx-auto">
        <h1 className="mb-4 text-center text-2xl font-bold">
          メールを送信しました
        </h1>
        <p className="text-center text-gray-600">
          ご登録いただいたメールアドレスに確認メールを送信しました。
          <br />
          メール内のリンクをクリックして、登録を完了してください。
        </p>
      </div>
    </div>
  );
}
