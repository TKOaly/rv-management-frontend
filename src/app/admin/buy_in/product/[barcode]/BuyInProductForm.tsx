"use client";

import Barcode from "@/components/Barcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nextFieldOnEnter } from "@/lib/utils";
import { Product } from "@/server/requests/productRequests";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

type OwnProps = { product: Product; defaultMargin: number };

export default function BuyInProductForm({ product, defaultMargin }: OwnProps) {
  const [customMargin, setCustomMargin] = useState(false);
  const [buyPrice, setBuyPrice] = useState<string>(
    (product.buyPrice / 100).toFixed(2),
  );
  const [sellPrice, setSellPrice] = useState<string>(
    (product.sellPrice / 100).toFixed(2),
  );

  const { barcode } = product;

  const { pending } = useFormStatus();

  return (
    <>
      <div
        className="flex flex-col items-center gap-y-4"
        onKeyDown={nextFieldOnEnter}
      >
        <div>
          <p className="text-lg font-semibold">{product.name}</p>
        </div>
        <Barcode barcode={barcode} width={3} height={60} />
        <Input
          id="barcode"
          name="barcode"
          type="hidden"
          value={barcode}
          readOnly
        />
        <div>
          <label htmlFor="count" className="text-sm text-stone-700">
            Count
          </label>
          <Input
            id="count"
            name="count"
            placeholder="Enter Count"
            required
            autoFocus
            data-next="buyPrice"
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
            data-next="buyInSubmit"
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
      <Button
        id="buyInSubmit"
        type="submit"
        className="mt-3 flex items-center gap-x-2"
      >
        {pending && <Loader className="animate-spin" />}
        Buy In
      </Button>
    </>
  );
}
