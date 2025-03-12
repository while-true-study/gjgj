"use client";

import React, { Suspense, useEffect, useState } from "react";
import Complete from "../components/Complete/Complete";
import { useSearchParams } from "next/navigation";

const CompleteContent = () => {
  const searchParams = useSearchParams();
  const [complete, setComplete] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    const completer = searchParams.get("complete");
    const type = searchParams.get("type");
    setComplete(completer); // 상태에 값 저장
    setType(type);
  }, [searchParams]);

  return (
    <div className="h-full">
      <Complete title={complete} type={Number(type)}></Complete>
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
