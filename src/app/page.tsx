import { HomeContainer } from "~/app/_container/HomeContainer";
import { LoadingScreen } from "~/components/LoadingScreen";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomeContainer />
    </Suspense>
  );
}
