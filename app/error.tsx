'use client';

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      {error.message === "ECONNREFUSED" && (
        <p className="text-muted-foreground">
          Unable to connect to the server. Please check your connection or try again later.
        </p>
      )}
      {error.message !== "ECONNREFUSED" && (
        <p className="text-muted-foreground">
          {error.message || "An unexpected error occurred"}
        </p>
      )}
      <Button
        onClick={reset}
        variant="outline"
      >
        Try again
      </Button>
    </div>
  );
}
