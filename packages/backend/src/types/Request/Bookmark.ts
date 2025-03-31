import { Request } from "express";

export type PostBookmarkRequest = Request<
  unknown,
  unknown,
  {
    url: string;
  },
  unknown
>;

export type GetBookmarksRequest = Request<
  unknown,
  unknown,
  unknown,
  {
    page: string;
    limit: string;
    userId: string;
  }
>;

export type GetBookmarkRequest = Request<
  {
    id: string;
  },
  unknown,
  unknown,
  {
    userId: string;
  }
>;

export type SummarizeBookmarkRequest = Request<
  {
    id: string;
  },
  unknown,
  {
    userId: string;
  },
  unknown
>;

export type DeleteBookmarkRequest = Request<
  {
    id: string;
  },
  unknown,
  {
    userId: string;
  },
  unknown
>;
