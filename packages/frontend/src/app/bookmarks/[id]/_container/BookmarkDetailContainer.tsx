import { Bookmark } from "~/types/Bookmark";
import { BookmarkDetailPresentation } from "~/features/bookmark-detail/BookmarkDetailPresentation";
import { fetchHelper } from "~/utils/fetchHelper";

type Props = {
  id: string;
};

export async function BookmarkDetailContainer({ id }: Props) {
  const bookmark = await fetchHelper<Bookmark>(
    `/bookmarks/${id}?userId=c95926c2-9436-4441-99b5-8f9955b653ec`,
    {
      method: "GET",
    }
  );

  if (!bookmark) {
    return <div className="text-xl">ブックマークが見つかりませんでした</div>;
  }

  console.log("bookmarkだよ", bookmark);

  return <BookmarkDetailPresentation bookmark={bookmark} />;
}
