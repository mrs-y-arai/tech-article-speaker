import { HomePresentation } from "~/features/home/HomePresentation";
import { Bookmark } from "~/types/Bookmark";
import { BookmarkRepository } from "~/server/repositories/BookmarkRepository";

export async function HomeContainer() {
  const { getBookmarks } = await BookmarkRepository();

  const bookmarks = await getBookmarks();
  const _bookmarks: Bookmark[] =
    bookmarks?.map((bookmark) => ({
      id: bookmark.id,
      title: bookmark.title,
      url: bookmark.url,
      createdAt: new Date(bookmark.created_at),
      updatedAt: new Date(bookmark.updated_at),
      content: bookmark.content ?? "",
      audioPath: bookmark.audio_path ?? "",
    })) ?? [];

  return <HomePresentation bookmarks={_bookmarks} />;
}
