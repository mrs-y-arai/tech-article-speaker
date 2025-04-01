import { Request, Response, NextFunction } from "express";
import { jwtDecode } from "jwt-decode";
import { UserRepository } from "~/repositories/UserRepository.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const token = authorization?.split(" ")[1];
  if (!token) {
    res.status(403).json({
      message: "トークンがありません",
    });
    return;
  }

  const decodedToken = jwtDecode(token);

  const id = decodedToken.sub;
  if (!id) {
    res.status(403).json({
      message: "トークンが不正です",
    });
    return;
  }

  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);
  if (!user) {
    res.status(403).json({
      message: "ユーザーが見つかりません",
    });
    return;
  }

  req.query.userId = user.id;

  next();
}
