"use server";

import { createAuthClient } from "~/libs/supabase/supabaseAuthInit";
import { z, ZodFormattedError } from "zod";
import { passwordRule } from "~/libs/validation";
import { customErrorMap } from "~/libs/validation";
import { redirect } from "next/navigation";

// 共通エラーメッセージ設定
// 毎度呼び出すのが嫌なので、他にいいやり方あれば知りたい
z.setErrorMap(customErrorMap);

export type SignUpFormState = {
  isSuccess?: boolean;
  apiError?: string;
  errors?: ZodFormattedError<{
    email: string;
    password: string;
  }>;
};

export async function signUp(state: SignUpFormState, formData: FormData) {
  const supabaseAuth = createAuthClient();

  const email = formData.get("email");
  const password = formData.get("password");

  const schema = z.object({
    email: z
      .string()
      .min(1)
      .max(255)
      .email("メールアドレスの形式で入力してください"),
    password: z.string().min(1).max(255).superRefine(passwordRule()),
  });

  const validateResult = schema.safeParse({
    email,
    password,
  });

  if (!validateResult.success) {
    const formattedErrors = validateResult.error.format();
    return {
      isSuccess: false,
      errors: formattedErrors,
    };
  }

  const supabase = await supabaseAuth;

  const { error } = await supabase.auth.signUp({
    email: validateResult.data.email,
    password: validateResult.data.password,
  });

  if (error) {
    return {
      isSuccess: false,
      apiError: error.message,
    };
  }

  return redirect("/sign-up/sent");
}
