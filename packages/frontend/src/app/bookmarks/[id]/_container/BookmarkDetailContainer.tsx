import { Bookmark } from "~/types/Bookmark";
import { BookmarkDetailPresentation } from "~/features/bookmark-detail/BookmarkDetailPresentation";
import { fetchHelperServer } from "~/utils/fetchHelperServer";

type Props = {
  id: string;
};

export async function BookmarkDetailContainer({ id }: Props) {
  const bookmark = await fetchHelperServer<Bookmark>(`/bookmarks/${id}`, {
    method: "GET",
  });

  if (!bookmark) {
    return <div className="text-xl">ブックマークが見つかりませんでした</div>;
  }

  return <BookmarkDetailPresentation bookmark={bookmark} />;
}
