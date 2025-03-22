import { type PrismaClient } from "@prisma/client";
import prisma from "~/infrastructure/database/prisma";

export class BookmarkRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  public findById = async (params: { id: string; userId: string }) => {
    return this.prisma.bookmarks.findUnique({
      where: { id: params.id, user_id: params.userId },
    });
  };

  public findMany = async (params: {
    userId: string;
    page: number;
    limit: number;
  }) => {
    return this.prisma.bookmarks.findMany({
      where: { user_id: params.userId },
      orderBy: { created_at: "desc" },
      skip: (params.page - 1) * params.limit,
      take: params.limit,
    });
  };

  public create = async (params: {
    title: string;
    content?: string;
    url: string;
    userId: string;
    audioPath?: string;
  }) => {
    return this.prisma.bookmarks.create({
      data: {
        title: params.title,
        content: params.content,
        url: params.url,
        user_id: params.userId,
        audio_path: params.audioPath,
      },
    });
  };

  public delete = async (params: { id: string; userId: string }) => {
    return this.prisma.bookmarks.delete({
      where: {
        id: params.id,
        user_id: params.userId,
      },
    });
  };

  public update = async (params: {
    id: string;
    userId: string;
    title?: string;
    content?: string;
    url?: string;
    audioPath?: string;
  }) => {
    return this.prisma.bookmarks.update({
      where: {
        id: params.id,
        user_id: params.userId,
      },
      data: {
        title: params.title,
        content: params.content,
        url: params.url,
        audio_path: params.audioPath,
        updated_at: new Date(),
      },
    });
  };
}
