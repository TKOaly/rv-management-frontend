"use client";

import Barcode from "@/components/Barcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { nextFieldOnEnter } from "@/lib/utils";
import { buyInProductAction } from "@/server/actions/products";
import { Product, addStockResponse } from "@/server/requests/productRequests";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

type OwnProps = { product: Product; defaultMargin: number };

export default function BuyInProductForm({ product, defaultMargin }: OwnProps) {
  const [count, setCount] = useState<number | undefined>(undefined);
  const [customMargin, setCustomMargin] = useState(false);
  const [buyPrice, setBuyPrice] = useState<string>(
    (product.buyPrice / 100).toFixed(2),
  );
  const [sellPrice, setSellPrice] = useState<string>(
    (product.sellPrice / 100).toFixed(2),
  );

  const { barcode } = product;

  const initialState = { success: false };
  const [state, buyInProduct] = useFormState<
    { success: boolean; newStock?: addStockResponse; error?: unknown },
    FormData
  >(buyInProductAction, initialState);

  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    if (state.success && state.newStock) {
      toast({
        title: "Buy In Successful",
        description: `Bought in ${count} pcs of ${product.name}`,
        duration: 6000,
      });
      router.push(`/admin/buy_in`);
    }
  }, [state.success, state.newStock]);

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
            value={count}
            onChange={({ target }) => setCount(Number(target.value))}
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
      <div className="mt-3 flex flex-row-reverse justify-between gap-x-4">
        <Button
          id="buyInSubmit"
          formAction={buyInProduct}
          type="submit"
          className="flex w-full items-center gap-x-2"
        >
          {pending && <Loader className="animate-spin" />}
          Buy In
        </Button>
        <Button asChild variant={"outline"} className="w-full">
          <Link href={`/admin/buy_in`}>Cancel</Link>
        </Button>
      </div>
    </>
  );
}
