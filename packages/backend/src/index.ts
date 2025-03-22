import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 想定エンドポイント
// ブックマーク一覧取得
// ブックマーク詳細取得
// 音声生成
// ブックマーク作成
// ユーザー詳細取得
// RLSを気をつける

const getUser = async () => {
  const users = await prisma.users.findMany();
  console.log("users", users);
};

getUser();
