'use client';
import { Button } from '~/components/ui/button';
import Link from 'next/link';

export default function Error() {
  return (
    <>
      <div className="p-10">
        <h1 className="mb-5 text-center text-xl font-bold">
          お探しのページは見つかりません
        </h1>
        <p className="mb-4 text-center">
          お探しのページが見つかりませんでした。URLが間違っているか、ページが削除された可能性があります。
        </p>
        <Link prefetch className="mx-auto block w-fit" href="/">
          <Button>ホームに戻る</Button>
        </Link>
      </div>
    </>
  );
}
