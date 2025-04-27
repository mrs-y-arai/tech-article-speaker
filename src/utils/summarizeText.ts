import { createOpenAI } from "~/libs/openai";
import { CHAT_DEFAULT_MODEL } from "~/constants/GptModel";

const openAi = createOpenAI();

export async function summarizeText(content: string) {
  const response = await openAi.chat.completions.create({
    model: CHAT_DEFAULT_MODEL,
    // TODO: h2とh3タグを読んでもらうような命令をすると、良い感じの粒度で要約してくれるぽい
    messages: [
      {
        role: "system",
        content: `あなたはWebエンジニアのプロフェッショナルです。Webプログラミングの技術記事の説明を行う専門家です。
HTMLタグの内容を元に、以下のルールに従って記事の説明を行ってください。

## 記事の説明
- はじめに、200字程度で記事の概要を簡潔に説明してください
- 次に、以下の指示に従って、記事の要約をしてください。
  - 記事本文の内容を読み取り、適宜セクションを分けて要約すること
  - 記事本文の内容全てをピックアップするのではなく、要点をピックアップすること
  - 文量が1200文字以内で収めるように、要約すること
  - 各セクションは、明確に区切って説明してください
  - 「はじめに」などというセクションは、記事の概要を説明するものであるため、要約しないでください。
- 技術的な用語や概念が出てきた場合は、必ず補足説明を加えてください
- 関連記事や広告など、本質的でない内容は除外してください

## 注意事項
- 必ず合計1500文字以内で生成してください。

返却値は以下のJSON形式で返してください:
{
  "content": "記事の説明（概要と詳細な解説を含む）",
}`,
      },
      {
        role: "user",
        content: content,
      },
    ],
    temperature: 0.4,
    response_format: { type: "json_object" },
  });

  const json = JSON.parse(response.choices[0].message.content || "");

  // TODO: zodで検証
  return {
    content: json.content,
  };
}
