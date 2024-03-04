"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function BuyInLandingPage() {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const barcode = formData.get("barcode") as string;
    router.push(`/admin/buy_in/product/${barcode}`);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-fit flex-col items-start gap-y-4">
        <h1 className="text-3xl font-semibold">Buy In</h1>
        <div className="flex flex-col items-center  rounded-lg border border-stone-300 bg-white p-8 shadow-lg">
          <form className="flex flex-col" onSubmit={onSubmit}>
            <label htmlFor="username" className="text-sm text-stone-700">
              Barcode
            </label>
            <Input
              id="barcode"
              name="barcode"
              placeholder="Enter / read barcode..."
              required
              autoFocus
            />
            <Button type="submit" className="mt-3">
              Buy In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
