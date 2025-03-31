import { BookmarkRepository } from "~/repositories/BookmarkRepository";
import { loadUrlContent } from "~/utils/loadUrlContent";
import { summarizeText } from "~/utils/summarizeText";
import { generateTTS } from "~/utils/tts";
import { StorageRepository } from "~/repositories/StorageRepository";

export class SummarizeBookmarkUseCase {
  private bookmarkRepository: BookmarkRepository;
  private storageRepository: StorageRepository;

  constructor() {
    this.bookmarkRepository = new BookmarkRepository();
    this.storageRepository = new StorageRepository();
  }

  public async execute(params: { bookmarkId: string; userId: string }) {
    const bookmark = await this.bookmarkRepository.findById({
      id: params.bookmarkId,
      userId: params.userId,
    });

    if (!bookmark) {
      throw new Error("Bookmark not found");
    }

    const content = await loadUrlContent(bookmark.url);
    const summarizedContent = await summarizeText(content[0].pageContent);

    if (!summarizedContent) return null;

    const [_, ttsFile] = await Promise.all([
      this.bookmarkRepository.update({
        id: params.bookmarkId,
        userId: params.userId,
        title: summarizedContent.title,
        content: summarizedContent.content,
      }),
      generateTTS({ input: summarizedContent.content }),
    ]);

    const { fullPath } = await this.storageRepository.uploadFile({
      file: ttsFile,
      userId: params.userId,
    });

    await this.bookmarkRepository.update({
      id: params.bookmarkId,
      userId: params.userId,
      audioPath: fullPath,
    });
  }
}
