"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { verifyCode, VerifyCodeFormState } from "~/actions/verifyCode";

export function SignUpVerifyCodePresentation() {
  const searchParams = useSearchParams();
  // TODO: エスケープ
  const email = searchParams.get("email") ?? "";

  const initialState: VerifyCodeFormState = {};
  const [state, dispatch] = useActionState(verifyCode, initialState);

  return (
    <div className="min-h-screen text-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md mx-auto">
        <h1 className="mb-4 text-center text-2xl font-bold">
          認証コードの確認
        </h1>

        <form action={dispatch}>
          <div className="mb-2">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              メールアドレス
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              name="email"
              readOnly
              className="w-full rounded-lg border border-gray-300 p-2.5 bg-gray-100"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="code" className="mb-2 block text-sm font-medium">
              認証コード
            </label>
            <Input
              type="text"
              id="code"
              name="code"
              className="w-full rounded-lg border border-gray-300 p-2.5"
              placeholder="123456"
            />
            {state.errors?.code?._errors && (
              <p className="mt-2 text-sm text-destructive">
                {state.errors.code._errors[0]}
              </p>
            )}
          </div>

          {state.apiError && (
            <p className="mb-4 text-sm text-destructive">{state.apiError}</p>
          )}

          <SubmitButton />
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mx-auto flex" type="submit" isProcessing={pending}>
      コードを送信
    </Button>
  );
}
