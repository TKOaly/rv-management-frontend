"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nextFieldOnEnter } from "@/lib/utils";
import { getMargin } from "@/server/requests/globalMarginRequests";
import { getAll } from "@/server/requests/productRequests";
import { QueryKey } from "@/server/requests/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Barcode from "react-barcode";

export default function BuyInProduct({
  params,
}: {
  params: { barcode: string };
}) {
  const initialDefaultMargin = 0.1;

  const { data: defaultMargin } = useQuery({
    queryKey: [QueryKey.defaultMargin],
    queryFn: () => getMargin(),
    initialData: initialDefaultMargin,
  });

  const { data: products } = useQuery({
    queryKey: [QueryKey.products],
    queryFn: () => getAll(),
    initialData: [],
  });

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //const _formData = new FormData(e.currentTarget);
    router.push(`/admin/buy_in`);
  };

  const [customMargin, setCustomMargin] = useState(false);
  const [buyPrice, setBuyPrice] = useState<string>("1");
  const [sellPrice, setSellPrice] = useState<string>(
    (1 * (1 + defaultMargin)).toFixed(2),
  );

  const { barcode } = params;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-fit flex-col items-start gap-y-4">
        <h1 className="text-3xl font-semibold">Buy In Product</h1>
        <div className="flex flex-col items-center  rounded-lg border border-stone-300 bg-white p-8 shadow-lg">
          <form className="flex flex-col gap-y-4" onSubmit={onSubmit}>
            <div
              className="flex flex-col items-center gap-y-4"
              onKeyDown={nextFieldOnEnter}
            >
              <div>
                <p className="text-lg font-semibold">
                  {
                    products?.find((product) => product.barcode === barcode)
                      ?.name
                  }
                </p>
              </div>
              {(barcode.length === 13 || barcode.length === 8) && (
                <Barcode
                  value={barcode}
                  width={3}
                  height={60}
                  format={
                    barcode.length === 13
                      ? "EAN13"
                      : barcode.length === 8
                        ? ("EAN8" as "EAN13")
                        : undefined
                  }
                />
              )}
              <div>
                <label htmlFor="amount" className="text-sm text-stone-700">
                  Amount
                </label>
                <Input
                  id="amount"
                  name="amount"
                  placeholder="Enter amount"
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
                    : "(Default Margin: " +
                      (defaultMargin * 100).toFixed(0) +
                      "%)"}
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
            <Button id="buyInSubmit" type="submit" className="mt-3">
              Buy In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
