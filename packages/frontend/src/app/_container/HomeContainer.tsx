import { HomePresentation } from "~/features/home/HomePresentation";
import { fetchHelperServer } from "~/utils/fetchHelperServer";
import { Bookmark } from "~/types/Bookmark";

export async function HomeContainer() {
  const response = await fetchHelperServer<Bookmark[]>(
    // TODO: ページネーション対応
    `/bookmarks?page=1&limit=10`,
    {
      method: "GET",
    }
  );
  return <HomePresentation bookmarks={response} />;
}
