"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "~/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="py-10">
      <h1 className="mb-5 text-center text-xl font-bold">
        エラーが発生しました。
      </h1>
      <p className="mb-4 text-center">error message: {error.message}</p>
      <Button
        className="mx-auto flex"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
