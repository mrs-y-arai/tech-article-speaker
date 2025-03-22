export type Bookmark = {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  summary?: string;
  audioPath?: string;
  isLoading?: boolean;
};
