import { Suspense } from "react";
import { ResultsPage } from "@/components/ResultsPage.tsx";

export default function Page() {
  return (
    <Suspense fallback={<div className="page" />}>
      <ResultsPage />
    </Suspense>
  );
}
