"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getMargin } from "@/server/requests/globalMarginRequests";
import { QueryKey } from "@/server/requests/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Barcode from "react-barcode";
import { useFormStatus } from "react-dom";

function AddProductFields({
  defaultMargin: initialDefaultMargin,
}: {
  defaultMargin: number;
}) {
  const { data: defaultMargin } = useQuery({
    queryKey: [QueryKey.defaultMargin],
    queryFn: () => getMargin(),
    initialData: initialDefaultMargin,
  });

  const [barcode, setBarcode] = useState("");
  const [customMargin, setCustomMargin] = useState(false);
  const [buyPrice, setBuyPrice] = useState<string>("1");
  const [sellPrice, setSellPrice] = useState<string>(
    (1 * (1 + defaultMargin)).toFixed(2),
  );

  const { pending } = useFormStatus();

  return (
    <>
      <div
        className="flex h-5/6 w-fit flex-shrink flex-col flex-wrap gap-4"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const next = document.activeElement?.getAttribute("data-next");
            if (next) {
              e.preventDefault();
              document.getElementById(next)?.focus();
            }
          }
        }}
      >
        <div>
          <label htmlFor="barcode" className="text-sm text-stone-500">
            Barcode
          </label>
          <Input
            id="barcode"
            name="barcode"
            placeholder="Barcode"
            onChange={({ target }) => setBarcode(target.value)}
            data-next="name"
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
          <Input
            id="name"
            name="name"
            placeholder="Name"
            data-next="categoryId"
          />
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
            data-next="weight"
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
            data-next="buyPrice"
            min={0}
            step={1}
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
            data-next="sellPrice"
            step={0.01}
            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            value={buyPrice}
            onChange={({ target }) => {
              setBuyPrice(target.value);
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
            {customMargin
              ? "(Custom Margin: " +
                (
                  (parseFloat(sellPrice) / parseFloat(buyPrice)) * 100 -
                  100
                ).toFixed(0) +
                "%)"
              : "(Default Margin: " + (defaultMargin * 100).toFixed(0) + "%)"}
          </label>
          <Input
            id="sellPrice"
            name="sellPrice"
            type="number"
            placeholder="Sell Price"
            data-next="productSubmit"
            step={0.01}
            value={sellPrice}
            onChange={({ target }) => {
              setCustomMargin(true);
              setSellPrice(target.value);
            }}
            className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button
          type="submit"
          id="productSubmit"
          className="flex items-center gap-x-2"
        >
          {pending && <Loader className="animate-spin" />}
          Create Product
        </Button>
        <Link href={`/admin/products`}>
          <Button tabIndex={-1} variant="outline">
            Back
          </Button>
        </Link>
      </div>
    </>
  );
}

export default AddProductFields;
