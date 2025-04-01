import "server-only";
import { createAuthClient } from "~/libs/supabase/supabaseAuthInit";
import { redirect } from "next/navigation";

/**
 * サーバーサイドでのAPIリクエストを行う。
 * 認証が必要なAPIには使用する。
 */
export async function fetchHelperServer<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not set");
  }

  const supabaseAuth = await createAuthClient();
  const { data } = await supabaseAuth.auth.getSession();

  if (!data.session) {
    redirect("/login");
  }

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${data.session.access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const responseJson = await response.json();

  return responseJson;
}
