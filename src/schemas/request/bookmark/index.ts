import { z } from "zod";

export const createBookmarkRequestSchema = z.object({
  url: z.string().url(),
});

export const deleteBookmarkRequestSchema = z.object({
  id: z.string().min(1).uuid(),
});

export const summarizeBookmarkRequestSchema = z.object({
  bookmarkId: z.string().min(1).uuid(),
  userId: z.string().min(1).uuid(),
});
