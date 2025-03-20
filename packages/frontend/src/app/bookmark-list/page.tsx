"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { loadUrlContent } from "~/utils/loadUrlContent";

export default function BookmarkList() {
  const [url, setUrl] = useState<string>("");
  const [bookmarks, setBookmarks] = useState<
    Array<{
      url: string;
      summary?: string;
      audioPath?: string;
      isLoading?: boolean;
    }>
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    const newBookmark = { url, isLoading: true };
    setBookmarks([...bookmarks, newBookmark]);
    setUrl("");

    try {
      const { summarizedContent, ttsPath } = await loadUrlContent(
        newBookmark.url
      );
      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.url === url
            ? {
                ...bookmark,
                summary: summarizedContent ?? undefined,
                audioPath: ttsPath,
                isLoading: false,
              }
            : bookmark
        )
      );
    } catch (error) {
      console.error("要約の取得に失敗しました:", error);
      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark.url === url ? { ...bookmark, isLoading: false } : bookmark
        )
      );
    }
  };

  const handleLoadSummary = async (index: number) => {
    const bookmark = bookmarks[index];
    if (bookmark.isLoading || bookmark.summary) return;

    setBookmarks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, isLoading: true } : b))
    );

    try {
      const { summarizedContent, ttsPath } = await loadUrlContent(bookmark.url);
      setBookmarks((prev) =>
        prev.map((b, i) =>
          i === index
            ? {
                ...b,
                summary: summarizedContent ?? undefined,
                audioPath: ttsPath,
                isLoading: false,
              }
            : b
        )
      );
    } catch (error) {
      console.error("要約の取得に失敗しました:", error);
      setBookmarks((prev) =>
        prev.map((b, i) => (i === index ? { ...b, isLoading: false } : b))
      );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black p-4">
      <div className="max-w-xl mx-auto">
        <form
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl mb-8"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            読みたい記事登録
          </h1>

          <p className="text-white mb-4">後で読みたい記事を登録できます。</p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                URLを入力してください
              </label>
              <input
                id="url"
                type="url"
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full font-medium py-3 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
              disabled={!url}
            >
              登録する
            </button>
          </div>
        </form>

        {bookmarks.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">
              ブックマーク一覧
            </h2>
            <ul className="space-y-4">
              {bookmarks.map((bookmark, index) => (
                <li key={index} className="text-gray-200">
                  <div className="flex items-center gap-4">
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-400 transition line-clamp-1"
                    >
                      {bookmark.url}
                    </a>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="px-3 py-1 font-bold rounded bg-blue-500 hover:bg-blue-600 transition shrink-0 disabled:bg-gray-500"
                          onClick={() => handleLoadSummary(index)}
                          disabled={bookmark.isLoading}
                        >
                          {bookmark.isLoading ? "読み込み中..." : "詳細"}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[90vw] sm:max-w-xl h-[60svh] overflow-y-scroll">
                        <DialogHeader>
                          <DialogTitle className="sr-only">要約</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          {bookmark.audioPath && (
                            <div className="mb-4">
                              <h3 className="text-lg font-bold mb-2">
                                音声要約
                              </h3>
                              <audio controls className="w-full">
                                <source
                                  src={bookmark.audioPath}
                                  type="audio/mp3"
                                />
                                お使いのブラウザは音声再生に対応していません。
                              </audio>
                            </div>
                          )}
                          {bookmark.summary && (
                            <div>
                              <h3 className="text-lg font-bold mb-2">
                                テキスト要約
                              </h3>
                              <p className="whitespace-pre-wrap">
                                {bookmark.summary}
                              </p>
                            </div>
                          )}
                          {bookmark.isLoading && (
                            <div className="text-center py-4">
                              要約を生成中...
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
