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
import { CreateBookmarkUseCase } from "~/services/useCase/createBookmark";

export class BookmarkController {
  private bookmarkRepository: BookmarkRepository;
  private createBookmarkUseCase: CreateBookmarkUseCase;
  private summarizeBookmarkUseCase: SummarizeBookmarkUseCase;

  constructor() {
    this.bookmarkRepository = new BookmarkRepository();
    this.createBookmarkUseCase = new CreateBookmarkUseCase(
      this.bookmarkRepository
    );
    this.summarizeBookmarkUseCase = new SummarizeBookmarkUseCase();
  }

  public createBookmark = async (req: PostBookmarkRequest, res: Response) => {
    const { url } = req.body;

    await this.createBookmarkUseCase.execute({
      url,
      userId: "c95926c2-9436-4441-99b5-8f9955b653ec",
    });

    res.status(201).json({
      isSuccess: true,
    });
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
      return res
        .status(404)
        .json({ isSuccess: false, apiError: "Bookmark not found" });
    }

    const _bookmark = snakeToCamel(bookmark);
    console.log("_bookmark", _bookmark);

    res.status(200).json(_bookmark);
  };

  public summarizeBookmark = async (
    req: SummarizeBookmarkRequest,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      await this.summarizeBookmarkUseCase.execute({
        bookmarkId: id,
        userId,
      });

      res.status(200).json({ isSuccess: true });
    } catch (error) {
      res
        .status(500)
        .json({ isSuccess: false, apiError: "Failed to summarize bookmark" });
    }
  };

  public deleteBookmark = async (
    req: SummarizeBookmarkRequest,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      await this.bookmarkRepository.delete({
        id,
        userId,
      });

      res.status(200).json({ isSuccess: true });
    } catch (error) {
      res
        .status(500)
        .json({ isSuccess: false, apiError: "Failed to delete bookmark" });
    }
  };
}
