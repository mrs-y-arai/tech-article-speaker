import "server-only";
import { BookmarkRepository } from "~/server/repositories/BookmarkRepository";
import { summarizeText } from "~/utils/summarizeText";
import { generateTTS } from "~/utils/tts";
import { createAuthClient } from "~/libs/supabase/supabaseAuthInit";

export async function SummarizeBookmarkUseCase() {
  const [bookmarkRepository, supabase] = await Promise.all([
    BookmarkRepository(),
    createAuthClient(),
  ]);

  async function execute(params: { bookmarkId: string; userId: string }) {
    const bookmark = await bookmarkRepository.getBookmarkById(
      params.bookmarkId
    );

    if (!bookmark) {
      throw new Error("Bookmark not found");
    }

    const content = await fetch(bookmark.url);
    const html = await content.text();
    const summarizedContent = await summarizeText(html);

    if (!summarizedContent) return null;

    const { title, url } = bookmark;

    const [_, ttsFile] = await Promise.all([
      bookmarkRepository.updateBookmark(params.bookmarkId, {
        id: params.bookmarkId,
        title,
        url,
        content: summarizedContent.content,
      }),
      generateTTS({ input: summarizedContent.content }),
    ]);

    const audioPath = `${params.userId}/${params.bookmarkId}-${Date.now()}.mp3`;

    const result = await supabase.storage
      .from("bookmark-summary")
      .upload(audioPath, ttsFile);

    if (result.error) throw result.error;

    await bookmarkRepository.updateBookmark(params.bookmarkId, {
      id: params.bookmarkId,
      user_id: params.userId,
      audio_path: audioPath,
    });
  }

  return {
    execute,
  };
}
