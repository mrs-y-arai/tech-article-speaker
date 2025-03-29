import { BookmarkRepository } from "~/repositories/BookmarkRepository.js";
import { SummarizeBookmarkUseCase } from "~/services/useCase/summarizeArticle.js";
import { Response } from "express";
import {
  PostBookmarkRequest,
  GetBookmarksRequest,
  GetBookmarkRequest,
  SummarizeBookmarkRequest,
} from "~/types/Request/Bookmark.js";
import { snakeToCamel } from "~/utils/snakeToCamel.js";

export class BookmarkController {
  private bookmarkRepository: BookmarkRepository;
  private summarizeBookmarkUseCase: SummarizeBookmarkUseCase;

  constructor() {
    this.bookmarkRepository = new BookmarkRepository();
    this.summarizeBookmarkUseCase = new SummarizeBookmarkUseCase();
  }

  public createBookmark = async (req: PostBookmarkRequest, res: Response) => {
    const { title, content, url, userId, audioPath } = req.body;

    const bookmark = await this.bookmarkRepository.create({
      title,
      content,
      url,
      userId,
      audioPath,
    });

    res.status(201).json(bookmark);
  };

  public getBookmarks = async (req: GetBookmarksRequest, res: Response) => {
    const { page, limit, userId } = req.query;

    const bookmarks = await this.bookmarkRepository.findMany({
      userId,
      page: Number(page),
      limit: Number(limit),
    });

    const _bookmarks = snakeToCamel(bookmarks);

    res.status(200).json(_bookmarks);
  };

  public getBookmark = async (req: GetBookmarkRequest, res: Response) => {
    const { id } = req.params;
    const { userId } = req.query;

    const bookmark = await this.bookmarkRepository.findById({
      id,
      userId,
    });

    if (!bookmark) {
      return res.status(404).json({ error: "Bookmark not found" });
    }

    res.status(200).json(bookmark);
  };

  public summarizeBookmark = async (
    req: SummarizeBookmarkRequest,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      await this.summarizeBookmarkUseCase.summarizeBookmark({
        bookmarkId: id,
        userId,
      });

      res.status(200).json({ message: "Bookmark summarized" });
    } catch (error) {
      res.status(500).json({ error: "Failed to summarize bookmark" });
    }
  };
}
