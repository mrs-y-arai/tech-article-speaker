import { createOpenAI } from "~/infrastructure/openai";
import { CHAT_DEFAULT_MODEL } from "~/constants/GptModel";

const openAi = createOpenAI();

export async function summarizeText(content: string) {
  const response = await openAi.chat.completions.create({
    model: CHAT_DEFAULT_MODEL,
    messages: [
      {
        role: "system",
        content: `あなたは技術記事の説明を行う専門家です。
以下のルールに従って記事の説明を行ってください。

## タイトルの抽出
- 記事の内容を元に、記事のタイトルを抽出してください

## 記事の要約
- HTMLタグの内容を元に、記事の内容を分かりやすく説明してください
- まず最初に、200字程度で記事の概要を簡潔に説明してください
- 次に、記事の重要なポイントを詳しく解説してください。
- 技術的な用語や概念については、初心者にも分かるように補足説明を加えてください
- 関連記事や広告など、本質的でない内容は除外してください
- 実践的なアドバイスや注意点があれば、それらも含めてください

返却値は以下のJSON形式で返してください:
{
  "title": "記事のタイトル",
  "content": "記事の要約",
}`,
      },
      {
        role: "user",
        content: content,
      },
    ],
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const json = JSON.parse(response.choices[0].message.content || "");

  // TODO: zodで検証
  return {
    title: json.title,
    content: json.content,
  };
}
