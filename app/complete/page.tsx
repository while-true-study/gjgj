"use client";

import React, { Suspense } from "react";
import Complete from "../components/Complete/Complete";
import { useSearchParams } from "next/navigation";

const CompleteContent = () => {
  const searchParams = useSearchParams();
  const complete = searchParams.get("complete");

  return (
    <div className="h-full">
      <Complete title={complete}></Complete>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <CompleteContent />
    </Suspense>
  );
};

export default Page;
