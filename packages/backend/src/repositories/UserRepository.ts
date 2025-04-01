import { type PrismaClient } from "@prisma/client";
import prisma from "~/infrastructure/database/prisma.js";

export class UserRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findById(id: string) {
    return this.prisma.users.findUnique({ where: { id } });
  }
}
