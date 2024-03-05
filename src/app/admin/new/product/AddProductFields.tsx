"use client";

import Barcode from "@/components/Barcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nextFieldOnEnter } from "@/lib/utils";
import { getMargin } from "@/server/requests/globalMarginRequests";
import { QueryKey } from "@/server/requests/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
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

  const searchParams = useSearchParams();

  const [barcode, setBarcode] = useState(searchParams.get("barcode") ?? "");
  const [customMargin, setCustomMargin] = useState(false);
  const [buyPrice, setBuyPrice] = useState<string>("1");
  const [sellPrice, setSellPrice] = useState<string>(
    (1 * (1 + defaultMargin)).toFixed(2),
  );

  const { pending } = useFormStatus();

  return (
    <>
      <div
        className="flex h-5/6 w-fit flex-shrink flex-col flex-wrap items-center gap-4"
        onKeyDown={nextFieldOnEnter}
      >
        <div className={`${searchParams.has("barcode") && "hidden"}`}>
          <label htmlFor="barcode" className="text-sm text-stone-500">
            Barcode
          </label>
          <Input
            id="barcode"
            name="barcode"
            placeholder="Barcode"
            onChange={({ target }) => setBarcode(target.value)}
            data-next="name"
            defaultValue={barcode}
            autoFocus={!searchParams.has("barcode")}
            className="mb-2"
          />
        </div>
        <Barcode barcode={barcode} width={3} height={50} displayInvalid />
        <div>
          <label htmlFor="name" className="text-sm text-stone-500">
            Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            data-next="categoryId"
            autoFocus={searchParams.has("barcode")}
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
      <div className="flex w-full flex-row-reverse justify-between gap-x-4">
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
