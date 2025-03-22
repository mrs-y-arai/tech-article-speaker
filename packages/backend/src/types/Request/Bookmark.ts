import { Request } from "express";

export type PostBookmarkRequest = Request<
  unknown,
  unknown,
  {
    title: string;
    content?: string;
    url: string;
    userId: string;
    audioPath?: string;
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
