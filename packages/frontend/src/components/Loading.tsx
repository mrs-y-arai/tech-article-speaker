import { Loader2 } from "lucide-react";
import { cn } from "~/libs/utils";

type Props = {
  className?: string;
};

export function Loading({ className }: Props) {
  return (
    <Loader2 className={cn("size-4 animate-spin text-primary", className)} />
  );
}
