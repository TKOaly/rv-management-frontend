"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMargin } from "@/server/requests/globalMarginRequests";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import Barcode from "react-barcode";
import { addProductAction } from "./action";

function AddProductForm({
  defaultMargin: initialDefaultMargin,
}: {
  defaultMargin: number;
}) {
  const { data: defaultMargin } = useQuery({
    queryKey: ["defaultMargin"],
    queryFn: () => getMargin(),
    initialData: initialDefaultMargin,
  });

  const [barcode, setBarcode] = useState("");
  const [customMargin, setCustomMargin] = useState(false);
  const [sellPrice, setSellPrice] = useState<string>(
    (1 * (1 + defaultMargin)).toFixed(2),
  );

  return (
    <form
      className="flex h-full flex-col justify-between"
      action={addProductAction}
    >
      <div className="flex h-5/6 w-fit flex-shrink flex-col flex-wrap gap-4">
        <div>
          <label htmlFor="barcode" className="text-sm text-stone-500">
            Barcode
          </label>
          <Input
            id="barcode"
            name="barcode"
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
          <Input id="name" name="name" placeholder="Name" />
        </div>
        <div>
          <label htmlFor="categoryId" className="text-sm text-stone-500">
            CategoryId
          </label>
          <Input
            id="categoryId"
            name="categoryId"
            type="number"
            min={0}
            placeholder="CategoryId"
            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div>
          <label htmlFor="weight" className="text-sm text-stone-500">
            Weight (g)
          </label>
          <Input
            id="weight"
            name="weight"
            type="number"
            placeholder="Weight"
            min={0}
            step={1}
            defaultValue={0}
            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div>
          <label htmlFor="buyPrice" className="text-sm text-stone-500">
            Buy Price (€)
          </label>
          <Input
            id="buyPrice"
            name="buyPrice"
            type="number"
            placeholder="Buy Price"
            step={0.01}
            defaultValue={1}
            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            onChange={({ target }) => {
              if (sellPrice === "") {
                setCustomMargin(false);
              }
              if (!customMargin) {
                setSellPrice(
                  (Number(target.value) * (1 + defaultMargin)).toFixed(2),
                );
              }
            }}
          />
        </div>
        <div>
          <label htmlFor="sellPrice" className="text-sm text-stone-500">
            Sell Price (€){" "}
            {!customMargin &&
              "(Default Margin: " + (defaultMargin * 100).toFixed(0) + "%)"}
          </label>
          <Input
            id="sellPrice"
            name="sellPrice"
            type="number"
            placeholder="Sell Price"
            step={0.01}
            onChange={({ target }) => {
              setCustomMargin(true);
              setSellPrice(target.value);
            }}
            value={sellPrice}
            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
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

export default AddProductForm;
