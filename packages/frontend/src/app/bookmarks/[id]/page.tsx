import { BookmarkDetailContainer } from "./_container/BookmarkDetailContainer";

export default function BookmarkDetail({ params }: { params: { id: string } }) {
  return <BookmarkDetailContainer id={params.id} />;
}
