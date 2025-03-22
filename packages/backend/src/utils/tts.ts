import { createOpenAI } from "~/infrastructure/openai";

const openAi = createOpenAI();

export async function generateTTS(params: { input: string }) {
  const response = await openAi.audio.speech.create({
    model: "tts-1",
    voice: "echo",
    input: params.input,
  });

  const fileName = `${Date.now()}.mp3`;
  const buffer = Buffer.from(await response.arrayBuffer());

  return new File([buffer], fileName);
}
