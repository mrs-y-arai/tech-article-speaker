import { Loading } from "~/components/Loading";
import { cn } from "~/libs/utils";

type Props = {
  className?: string;
};

export function LoadingScreen({ className }: Props) {
  return (
    <div
      className={cn(
        "fixed w-screen h-screen inset-0 flex items-center justify-center bg-black/50",
        className
      )}
    >
      <Loading className="size-8" />
    </div>
  );
}
