import { Router } from "express";
import { UserController } from "~/controllers/UserController.js";

export const UserRouter = Router();

const userController = new UserController();
// TODO: userController.getUserだけで良いはずなので後で確認
UserRouter.get("/:id", async (req, res) => {
  await userController.getUser(req, res);
});
