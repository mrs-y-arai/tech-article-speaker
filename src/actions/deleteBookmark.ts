"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { BookmarkRepository } from "~/server/repositories/BookmarkRepository";

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
  try {
    const { deleteBookmark } = await BookmarkRepository();
    await deleteBookmark(id);

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
