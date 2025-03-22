import { Router } from "express";
import { BookmarkController } from "~/controllers/BookmarkController";
import {
  GetBookmarkRequest,
  SummarizeBookmarkRequest,
} from "~/types/Request/Bookmark";

export const BookmarkRouter = Router();

const bookmarkController = new BookmarkController();

BookmarkRouter.post("/", bookmarkController.createBookmark);
BookmarkRouter.get("/", bookmarkController.getBookmarks);
// TODO: 型アサーションやめたい
BookmarkRouter.get("/:id", async (req, res) => {
  await bookmarkController.getBookmark(req as GetBookmarkRequest, res);
});
BookmarkRouter.post("/:id/summarize", async (req, res) => {
  await bookmarkController.summarizeBookmark(req, res);
});
