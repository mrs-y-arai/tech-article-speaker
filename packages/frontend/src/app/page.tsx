"use client";

import { loadUrlContent } from "~/utils/loadUrlContent";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [summarize, setSummarize] = useState<string>("");
  const [audioPath, setAudioPath] = useState<string>("");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
      <div className="w-full max-w-xl">
        <form
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
          onSubmit={async (e) => {
            e.preventDefault();
            setIsProcessing(true);
            try {
              const { summarizedContent, ttsPath } = await loadUrlContent(url);
              if (!summarizedContent) {
                setSummarize("");
                setAudioPath("");
              } else {
                setSummarize(summarizedContent);
                setAudioPath(ttsPath);
              }
            } finally {
              setIsProcessing(false);
            }
          }}
        >
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            URL送信
          </h1>

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
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white placeholder-gray-400 transition duration-200"
                required
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full font-medium py-3 px-4 rounded-lg transition duration-200 transform bg-blue-500 hover:bg-blue-600 text-white hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-300"
              disabled={!url || isProcessing}
            >
              {isProcessing ? "送信中" : "送信する"}
            </button>
          </div>

          <div className="my-10">
            <h3 className="text-lg font-bold text-white mb-2">音声再生</h3>
            <audio controls className="w-full" src="/1742455140541.mp3">
              <source src="/1742455140541.mp3" type="audio/mp3" />
              お使いのブラウザは音声再生に対応していません。
            </audio>
          </div>

          {summarize && (
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4">要約結果</h2>
              {audioPath && (
                <div className="my-10">
                  <h3 className="text-lg font-bold text-white mb-2">
                    音声再生
                  </h3>
                  <audio controls className="w-full">
                    <source
                      src="/src/utils/temp/1742455140541.mp3"
                      type="audio/mp3"
                    />
                    お使いのブラウザは音声再生に対応していません。
                  </audio>
                </div>
              )}
              <p className="text-gray-200 whitespace-pre-wrap">{summarize}</p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
