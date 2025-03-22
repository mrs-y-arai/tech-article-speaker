import { Bookmark } from "~/types/Bookmark";
import { BookmarkDetailPresentation } from "~/features/bookmark-detail/BookmarkDetailPresentation";

export async function BookmarkDetailContainer() {
  const bookmark: Bookmark | null = {
    id: "1",
    url: "https://example.com",
    title: "サンプル記事のタイトル",
    summary: "これはサンプル記事の要約です。",
    audioPath: "https://example.com/audio.mp3",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (!bookmark) {
    return <div className="text-xl">ブックマークが見つかりませんでした</div>;
  }

  return <BookmarkDetailPresentation bookmark={bookmark} />;
}
