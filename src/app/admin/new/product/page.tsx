"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Barcode from "react-barcode";

function NewProduct() {
  const [barcode, setBarcode] = useState("");

  const router = useRouter();

  return (
    <form className="flex h-full flex-col justify-between">
      <div className="flex w-fit flex-col gap-y-4">
        <div>
          <label htmlFor="barcode" className="text-sm text-stone-500">
            Barcode
          </label>
          <Input
            id="barcode"
            placeholder="Barcode"
            onChange={({ target }) => setBarcode(target.value)}
            autoFocus
            className="mb-2"
          />
          {(barcode.length === 13 || barcode.length === 8) && (
            <Barcode
              value={barcode}
              width={3}
              height={30}
              format={
                barcode.length === 13
                  ? "EAN13"
                  : barcode.length === 8
                    ? ("EAN8" as "EAN13")
                    : undefined
              }
            />
          )}
        </div>
        <div>
          <label htmlFor="name" className="text-sm text-stone-500">
            Name
          </label>
          <Input id="name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="categoryId" className="text-sm text-stone-500">
            CategoryId
          </label>
          <Input id="categoryId" type="number" placeholder="CategoryId" />
        </div>
        <div>
          <label htmlFor="weight" className="text-sm text-stone-500">
            Weight (g)
          </label>
          <Input id="weight" type="number" placeholder="Weight" />
        </div>
        <div>
          <label htmlFor="buy_price" className="text-sm text-stone-500">
            Buy Price (€)
          </label>
          <Input id="buy_price" type="number" placeholder="Buy Price (€)" />
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button type="submit">Create Product</Button>
        <Link href={`/admin/products`}>
          <Button tabIndex={-1} variant="outline">
            Back
          </Button>
        </Link>
      </div>
    </form>
  );
}

export default NewProduct;
