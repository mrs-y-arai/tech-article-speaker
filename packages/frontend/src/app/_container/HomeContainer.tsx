import { HomePresentation } from "~/features/home/HomePresentation";
import { Bookmark } from "~/types/Bookmark";

export async function HomeContainer() {
  const bookmarks: Bookmark[] = [
    {
      id: "1",
      title: "Bookmark Speaker",
      url: "https://example.com",
      summary: "This is a test summary",
      audioPath: "https://example.com/audio.mp3",
      createdAt: new Date(),
      updatedAt: new Date(),
      isLoading: false,
    },
    {
      id: "2",
      title: "Bookmark Speaker",
      url: "https://example.com/2",
      summary: "This is a test summary 2",
      audioPath: "https://example.com/audio2.mp3",
      createdAt: new Date(),
      updatedAt: new Date(),
      isLoading: false,
    },
  ];

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return <HomePresentation bookmarks={bookmarks} />;
}
