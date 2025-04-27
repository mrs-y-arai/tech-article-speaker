import { Bookmark } from "~/types/Bookmark";
import { BookmarkDetailPresentation } from "~/features/bookmark-detail/BookmarkDetailPresentation";
import { BookmarkRepository } from "~/server/repositories/BookmarkRepository";
import { createSuperUserClient } from "~/libs/supabase/supabaseSuperUserInit";

type Props = {
  id: string;
};

export async function BookmarkDetailContainer({ id }: Props) {
  const { getBookmarkById } = await BookmarkRepository();
  const bookmark = await getBookmarkById(id);

  if (!bookmark) {
    return <div className="text-xl">ブックマークが見つかりませんでした</div>;
  }

  const supabase = createSuperUserClient();

  const _bookmark: Bookmark = {
    id: bookmark.id,
    title: bookmark.title,
    url: bookmark.url,
    createdAt: new Date(bookmark.created_at),
    updatedAt: new Date(bookmark.updated_at),
    content: bookmark.content ?? "",
    audioPath: bookmark.audio_path ?? "",
  };

  const { data, error } = _bookmark.audioPath
    ? await supabase.storage
        .from("bookmark-summary")
        .createSignedUrl(_bookmark.audioPath, 60 * 60)
    : {
        data: {
          signedUrl: "",
        },
        error: null,
      };

  if (error) {
    throw new Error(error.message);
  }

  return (
    <BookmarkDetailPresentation
      bookmark={{
        ..._bookmark,
        audioPath: data.signedUrl,
      }}
    />
  );
}
