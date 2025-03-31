import { z } from "zod";

export const createBookmarkResponseSchema = z.discriminatedUnion("isSuccess", [
  z.object({
    isSuccess: z.literal(true),
  }),
  z.object({
    isSuccess: z.literal(false),
    apiError: z.string().min(1),
  }),
]);

export const deleteBookmarkResponseSchema = z.discriminatedUnion("isSuccess", [
  z.object({
    isSuccess: z.literal(true),
  }),
  z.object({
    isSuccess: z.literal(false),
    apiError: z.string().min(1),
  }),
]);
