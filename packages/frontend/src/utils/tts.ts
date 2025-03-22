import { createOpenAI } from "~/libs/openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const openAi = createOpenAI();

export async function generateTTS(params: { input: string }) {
  const response = await openAi.audio.speech.create({
    model: "tts-1",
    voice: "echo",
    input: params.input,
  });

  const fileName = `${Date.now()}.mp3`;
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(`${__dirname}/../../public`, fileName);

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return fileName;
}
