import { Router, Response } from "express";
import { UserController } from "~/controllers/UserController.js";
import { authMiddleware } from "~/middleware/authMiddleware.js";
import { GetUserRequest } from "~/types/Request/User.js";

export const UserRouter = Router();

const userController = new UserController();
UserRouter.get(
  "/:id",
  authMiddleware,
  async (req: GetUserRequest, res: Response) => {
    await userController.getUser(req, res);
  }
);
