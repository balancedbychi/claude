import { Suspense } from "react";
import { EpisodeBuilder } from "@/components/EpisodeBuilder.tsx";

export default function Page() {
  return (
    <Suspense fallback={<div className="page" />}>
      <EpisodeBuilder tool="transition" />
    </Suspense>
  );
}
