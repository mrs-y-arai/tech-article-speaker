import { Bookmark } from "~/types/Bookmark";
import Link from "next/link";
import { BookmarkAddForm } from "~/components/BookmarkAddForm";
import { Edit2, Trash2 } from "lucide-react";

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
                    className="transition line-clamp-1 font-bold underline hover:text-blue-400"
                  >
                    {bookmark.url}
                  </Link>
                  <span className="text-gray-500">2025.01.05</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100/10 rounded-full">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100/10 rounded-full">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
