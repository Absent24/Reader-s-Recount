"use client";

import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="min-h-screen flex items-start justify-center p-2">
      <Skeleton className="h-[400px] max-w-4xl w-full rounded-lg shadow-lg p-6 flex flex-col items-start gap-4">
        <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6">
          <Skeleton className="w-[200px] h-[300px] relative flex-shrink-0r" />
        </div>
      </Skeleton>
    </div>
  );
}

export default loading;
