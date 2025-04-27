"use server";

import { createAuthClient } from "~/libs/supabase/supabaseAuthInit";
import { z, ZodFormattedError } from "zod";
import { customErrorMap } from "~/libs/validation";
import { redirect } from "next/navigation";

z.setErrorMap(customErrorMap);

export type VerifyCodeFormState = {
  isSuccess?: boolean;
  apiError?: string;
  errors?: ZodFormattedError<{
    code: string;
  }>;
};

export async function verifyCode(
  state: VerifyCodeFormState,
  formData: FormData
) {
  const supabaseAuth = await createAuthClient();

  const email = formData.get("email");
  const code = formData.get("code");

  const schema = z.object({
    email: z.string().email("メールアドレスの形式で入力してください"),
    code: z
      .string()
      .length(6, { message: "確認コードは6桁で入力してください" }),
  });

  const validateResult = schema.safeParse({
    email,
    code,
  });

  if (!validateResult.success) {
    console.log(validateResult.error);
    const formattedErrors = validateResult.error.format();
    return {
      isSuccess: false,
      errors: formattedErrors,
    };
  }

  const { error } = await supabaseAuth.auth.verifyOtp({
    email: validateResult.data.email,
    token: validateResult.data.code,
    type: "signup",
  });

  console.log("error", error);

  if (error) {
    return {
      isSuccess: false,
      apiError: "認証コードが無効です。もう一度お試しください。",
    };
  }

  return redirect("/sign-up/completed");
}
