"use client";

import { deleteBookmark } from "~/actions/deleteBookmark";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  id: string;
};

export function DeleteDialog({ id }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteBookmark(id);
      alert("削除しました");
      setIsOpen(false);
    } catch (error) {
      alert("削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-2 hover:bg-gray-100/10 rounded-full">
          <Trash2 className="h-5 w-5" />
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">
            ブックマークを削除しますか？
          </DialogTitle>
          <DialogDescription className="text-white">
            この操作は取り消すことができません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" disabled={isDeleting}>
            キャンセル
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            isProcessing={isDeleting}
          >
            削除する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
