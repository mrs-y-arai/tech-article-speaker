import { UserRepository } from "~/repositories/UserRepository.js";
import { Response } from "express";
import { GetUserRequest } from "~/types/Request/User.js";

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public getUser = async (req: GetUserRequest, res: Response) => {
    try {
      const { id } = req.params;

      const user = await this.userRepository.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
