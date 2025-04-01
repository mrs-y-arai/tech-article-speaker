import { BookmarkDetailContainer } from "./_container/BookmarkDetailContainer";

export default async function BookmarkDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <BookmarkDetailContainer id={id} />;
}
