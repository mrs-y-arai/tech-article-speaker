import { Bookmark } from "~/types/Bookmark";
import Link from "next/link";
import { BookmarkAddForm } from "~/components/BookmarkAddForm";
import { Trash2 } from "lucide-react";
import { formatDate } from "~/libs/date";
import { DeleteDialog } from "./components/DeleteDialog";

type Props = {
  bookmarks: Bookmark[];
  onDelete?: (id: string) => void;
};

export function HomePresentation({ bookmarks }: Props) {
  return (
    <div>
      <BookmarkAddForm className="mb-10" />
      {bookmarks.length > 0 && (
        <ul>
          {bookmarks.map((bookmark, index) => (
            <li key={index} className="text-gray-200 border-b border-gray-600">
              <div className="flex items-center gap-4 p-2 md:p-4 w-full justify-between ">
                <div className="flex flex-col flex-1">
                  <Link
                    href={`/bookmarks/${bookmark.id}`}
                    prefetch
                    className="transition line-clamp-2 lg:line-clamp-1 font-bold underline hover:text-blue-400 break-all"
                  >
                    {bookmark.title}
                  </Link>
                  <span className="text-gray-500">
                    {formatDate(bookmark.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <DeleteDialog id={bookmark.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
