import { BookmarkRepository } from "~/repositories/BookmarkRepository.js";
import { loadUrlContent } from "~/utils/loadUrlContent.js";
import { load } from "cheerio";

export class CreateBookmarkUseCase {
  private readonly bookmarkRepository: BookmarkRepository;

  constructor(bookmarkRepository: BookmarkRepository) {
    this.bookmarkRepository = new BookmarkRepository();
  }

  public async execute(params: { url: string; userId: string }) {
    const content = await loadUrlContent(params.url);
    const $ = load(content[0].pageContent);

    return this.bookmarkRepository.create({
      title: $("h1").first().text() ?? params.url,
      url: params.url,
      userId: params.userId,
    });
  }
}
