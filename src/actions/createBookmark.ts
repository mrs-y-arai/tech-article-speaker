"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { BookmarkRepository } from "~/server/repositories/BookmarkRepository";
import { createBookmarkRequestSchema } from "~/schemas/request/bookmark";
import { load } from "cheerio";
import { createAuthClient } from "~/libs/supabase/supabaseAuthInit";

export type CreateBookmarkState =
  | {
      isSuccess: true;
    }
  | {
      isSuccess: false;
      apiError?: string;
      errors?: z.ZodFormattedError<{
        url: string;
      }>;
    };

export async function createBookmark(
  formData: FormData
): Promise<CreateBookmarkState> {
  try {
    const url = formData.get("url");

    const parsedUrl = createBookmarkRequestSchema.safeParse({
      url,
    });

    if (!parsedUrl.success) {
      const error = parsedUrl.error.format();
      return {
        isSuccess: false,
        errors: error,
      };
    }

    // URLからコンテンツを取得
    const response = await fetch(parsedUrl.data.url);
    const html = await response.text();
    const $ = load(html);

    // h1タグを取得
    const title = $("h1").first().text();

    const supabase = await createAuthClient();
    const user = await supabase.auth.getUser();

    if (!user.data.user) {
      return {
        isSuccess: false,
        apiError: "ユーザーが見つかりません",
      };
    }

    const { createBookmark } = await BookmarkRepository();
    const bookmark = await createBookmark({
      title,
      url: parsedUrl.data.url,
      user_id: user.data.user.id,
    });

    revalidatePath("/");

    return {
      isSuccess: true,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      apiError: "エラーが発生しました",
    };
  }
}
