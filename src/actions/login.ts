"use server";

import { createAuthClient } from "~/libs/supabase/supabaseAuthInit";
import { z, ZodFormattedError } from "zod";
import { customErrorMap, passwordRule } from "~/libs/validation";
import { redirect } from "next/navigation";

z.setErrorMap(customErrorMap);

export type LoginFormState = {
  isSuccess?: boolean;
  apiError?: string;
  errors?: ZodFormattedError<{
    email: string;
    password: string;
  }>;
};

export async function login(state: LoginFormState, formData: FormData) {
  const supabaseAuth = await createAuthClient();

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

  const { error } = await supabaseAuth.auth.signInWithPassword({
    email: validateResult.data.email,
    password: validateResult.data.password,
  });

  if (error) {
    // CustomLogger.error({
    //   error,
    //   fileName: "src/actions/login.ts",
    //   functionName: "login",
    // });

    // if (
    //   SUPABASE_AUTH_ERROR_CODE_MESSAGE.INVALID_CREDENTIALS.code === error.code
    // ) {
    //   return {
    //     isSuccess: false,
    //     apiError:
    //       "メールアドレスとパスワード、またはログイン方法が正しいか確認してください。",
    //   };
    // }

    return {
      isSuccess: false,
      apiError: "エラーが発生しました",
    };
  }

  redirect("/");
}
