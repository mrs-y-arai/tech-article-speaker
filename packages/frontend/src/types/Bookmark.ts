export type Bookmark = {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  content?: string;
  audioPath?: string;
};
