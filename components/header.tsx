"use client";

import { RefreshCw, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Component() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4">
        <TrendingUp className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">MLB 선수 기록 대시보드</h1>
      </div>
      <Button
        onClick={handleRefresh}
        className="flex items-center gap-2 cursor-pointer"
      >
        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
        {isLoading ? "업데이트 중..." : "최신 기록 조회"}
      </Button>
    </div>
  );
}
