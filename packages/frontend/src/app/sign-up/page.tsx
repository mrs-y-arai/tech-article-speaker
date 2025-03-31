"use client";

import { signUp, SignUpFormState } from "~/actions/signUp";
import { Input } from "~/components/ui/input";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  const initialState: SignUpFormState = {};
  const [state, dispatch] = useActionState(signUp, initialState);

  return (
    <div className="min-h-screen text-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md mx-auto">
        <h1 className="mb-4 text-center text-2xl font-bold">新規登録</h1>

        <form action={dispatch}>
          <div className="mb-2">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              メールアドレス
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-gray-300 p-2.5"
              placeholder="example@example.com"
            />
            {state.errors?.email?._errors && (
              <p className="mt-2 text-sm text-destructive">
                {state.errors.email._errors[0]}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              パスワード
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg border border-gray-300 p-2.5"
              placeholder="••••••••"
            />
            {state.errors?.password?._errors && (
              <p className="mt-2 text-sm text-destructive">
                {state.errors.password._errors[0]}
              </p>
            )}
          </div>

          {state.apiError && (
            <p className="mb-4 text-sm text-destructive">{state.apiError}</p>
          )}

          <SubmitButton />
          <Link
            className="text-primary underline mx-auto w-fit block mt-3"
            href="/login"
          >
            ログイン
          </Link>
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mx-auto flex" type="submit" isProcessing={pending}>
      新規登録
    </Button>
  );
}
