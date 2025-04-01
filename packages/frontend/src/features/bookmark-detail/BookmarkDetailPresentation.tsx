import { Bookmark } from "~/types/Bookmark";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, Home } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { formatDate } from "~/libs/date";

type Props = {
  bookmark: Bookmark;
};

export function BookmarkDetailPresentation({ bookmark }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 max-w-3xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/bookmark-list`}
            className="flex items-center gap-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>

        <Link
          href={`/bookmark-list/`}
          className="flex items-center gap-2 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
      <div className="mb-6">
        <div className="flex items-cente gap-x-2 justify-between mb-2">
          <h1 className="text-2xl font-bold">{bookmark.title}</h1>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1 hover:text-primary underline transition-colors"
          >
            元記事 <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <p className="text-muted-foreground">
          {formatDate(bookmark.createdAt)}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">音声要約</h2>
        {bookmark.audioPath ? (
          <audio controls className="w-full">
            <source src={bookmark.audioPath} type="audio/mp3" />
            お使いのブラウザは音声再生に対応していません。
          </audio>
        ) : (
          <div className="text-white">音声要約生成中</div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">音声要約</h2>
        {bookmark.content ? (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="summary">
              <AccordionTrigger>テキスト要約</AccordionTrigger>
              <AccordionContent>
                <div className="p-4">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {bookmark.content}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <div className="text-white">テキスト要約生成中</div>
        )}
      </div>

      <Link
        href="/"
        className="text-white underline transition-colors hover:text-primary w-fit mx-auto flex items-center gap-2 rounded-lg p-2"
        prefetch
      >
        TOPへ戻る
      </Link>
    </div>
  );
}
