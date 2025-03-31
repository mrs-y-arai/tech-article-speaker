import { HomePresentation } from "~/features/home/HomePresentation";
import { fetchHelper } from "~/utils/fetchHelper";
import { Bookmark } from "~/types/Bookmark";

export async function HomeContainer() {
  const response = await fetchHelper<Bookmark[]>(
    `/bookmarks?userId=c95926c2-9436-4441-99b5-8f9955b653ec&page=1&limit=10`,
    {
      method: "GET",
    }
  );
  return <HomePresentation bookmarks={response} />;
}
