import { Router } from "express";
import { BookmarkController } from "~/controllers/BookmarkController";
import {
  GetBookmarkRequest,
  SummarizeBookmarkRequest,
  DeleteBookmarkRequest,
} from "~/types/Request/Bookmark";
import { authMiddleware } from "~/middleware/authMiddleware";

export const BookmarkRouter = Router();

const bookmarkController = new BookmarkController();

BookmarkRouter.post("/", authMiddleware, bookmarkController.createBookmark);
BookmarkRouter.get("/", authMiddleware, bookmarkController.getBookmarks);
BookmarkRouter.get(
  "/:id",
  authMiddleware,
  async (req: GetBookmarkRequest, res) => {
    await bookmarkController.getBookmark(req, res);
  }
);
BookmarkRouter.post(
  "/:id/summarize",
  authMiddleware,
  async (req: SummarizeBookmarkRequest, res) => {
    await bookmarkController.summarizeBookmark(req, res);
  }
);
BookmarkRouter.delete(
  "/:id",
  authMiddleware,
  async (req: DeleteBookmarkRequest, res) => {
    await bookmarkController.deleteBookmark(req, res);
  }
);
