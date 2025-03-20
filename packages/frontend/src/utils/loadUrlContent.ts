"use server";

import { summarize } from "~/utils/summarize";
import { generateTTS } from "~/utils/tts";
import { PlaywrightWebBaseLoader } from "@langchain/community/document_loaders/web/playwright";
import sanitizeHtml from "sanitize-html";

export async function loadUrlContent(url: string) {
  const htmlWebBaseLoader = new PlaywrightWebBaseLoader(url, {
    launchOptions: {
      headless: true,
    },
    gotoOptions: {
      waitUntil: "domcontentloaded",
    },
    evaluate: async (page, browser) => {
      const result = await page.evaluate(async () => {
        // 不要な要素を削除
        const elementsToRemove = [
          "script",
          "style",
          "noscript",
          "iframe",
          "footer",
          "nav",
          ".ad",
          ".advertisement",
          "#comments",
        ];

        elementsToRemove.forEach((selector) => {
          document.querySelectorAll(selector).forEach((element) => {
            element.remove();
          });
        });

        // 本文のテキストを取得
        const mainContent = document.body.innerHTML;

        // 余分な空白や改行を整理
        return mainContent
          .replace(/\s+/g, " ")
          .replace(/\n\s*\n\s*\n/g, "\n\n")
          .trim();
      });
      await browser.close();

      const sanitizeContent = sanitizeHtml(result, {
        allowedTags: ["h1", "h2", "h3", "h4", "h5", "ul", "li", "ol"],
        allowedAttributes: {},
      });

      return sanitizeContent;
    },
  });
  const result = await htmlWebBaseLoader.load();

  const summarizedContent = await summarize(result[0].pageContent);

  const ttsPath = "";
  // ? await generateTTS({ input: summarizedContent })
  // : "";

  return {
    summarizedContent,
    ttsPath,
  };
}
