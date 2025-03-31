"use client";

import { useState } from "react";
import { cn } from "~/libs/utils";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "~/components/ui/input";
import { createBookmark } from "~/actions/createBookmark";

type Props = {
  className?: string;
};

export function BookmarkAddForm({ className }: Props) {
  const [url, setUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    const formData = new FormData(e.currentTarget);
    const result = await createBookmark(formData);

    if (!result.isSuccess) {
      console.error("result.errors", result.errors);
      console.error("result.apiError", result.apiError);
    }

    alert("追加しました");
    setUrl("");
    setIsProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex items-center", className)}
    >
      <Input
        id="url"
        type="url"
        placeholder="https://example.com"
        className="w-full p-2 bg-black/60 border border-gray-600 rounded-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-foreground placeholder-gray-400"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        name="url"
      />
      <Button className="h-full shrink-0" isProcessing={isProcessing}>
        <Plus className="size-4" />
        追加
      </Button>
    </form>
  );
}
