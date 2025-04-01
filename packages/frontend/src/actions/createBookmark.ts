"use server";

import { fetchHelperServer } from "~/utils/fetchHelperServer";
import { createBookmarkRequestSchema } from "~/schemas/request/bookmark";
import { createBookmarkResponseSchema } from "~/schemas/response/bookmark";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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

  const response = await fetchHelperServer("/bookmarks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Content-Typeヘッダーを追加
    },
    body: JSON.stringify(parsedUrl.data),
  });

  const parsedResponse = createBookmarkResponseSchema.safeParse(response);

  if (!parsedResponse.success) {
    return {
      isSuccess: false,
      apiError: "レスポンスの形式が不正です。",
    };
  }

  if (parsedResponse.data.isSuccess) {
    revalidatePath("/");
  }

  return parsedResponse.data;
}
