"use client";
import { Button } from "@/components/ui/button";

function NewProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mb-16 flex h-5/6 flex-col gap-4">
      <h2>Creating new product failed:</h2>
      <div>
        <p>{error.name}</p>
        <p className="max-h-96 overflow-hidden">{error.stack}</p>
      </div>
      <div>
        <Button onClick={reset}>Reload</Button>
      </div>
    </div>
  );
}

export default NewProductError;
