import { Request } from "express";

export type GetUserRequest = Request<
  {
    id: string;
  },
  unknown,
  unknown,
  unknown
>;
