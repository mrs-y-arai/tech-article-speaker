"use server";

import { fetchHelperServer } from "~/utils/fetchHelperServer";
import { deleteBookmarkRequestSchema } from "~/schemas/request/bookmark";
import { deleteBookmarkResponseSchema } from "~/schemas/response/bookmark";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export type DeleteBookmarkState =
  | {
      isSuccess: true;
    }
  | {
      isSuccess: false;
      apiError?: string;
      errors?: z.ZodFormattedError<{
        id: string;
      }>;
    };

export async function deleteBookmark(id: string): Promise<DeleteBookmarkState> {
  const parsedParams = deleteBookmarkRequestSchema.safeParse({
    id,
  });

  if (!parsedParams.success) {
    const error = parsedParams.error.format();
    return {
      isSuccess: false,
      errors: error,
    };
  }

  const response = await fetchHelperServer(`/bookmarks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", // Content-Typeヘッダーを追加
    },
  });

  const parsedResponse = deleteBookmarkResponseSchema.safeParse(response);

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
