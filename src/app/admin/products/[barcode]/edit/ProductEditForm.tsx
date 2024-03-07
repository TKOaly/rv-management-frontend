"use client";

import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { CategorySelect } from "@/components/ui/category-select";
import { nextFieldOnEnter } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { editProductAction } from "@/server/actions/products";
import { SubmitButton } from "@/components/ui/submit-button";
import Link from "next/link";
import { Product } from "@/server/requests/productRequests";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@/server/requests/queryKeys";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type ProductEditFormProps = {
  product: Product;
  defaultMargin: number;
};

function useResettableState<T>(
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, () => void] {
  const [value, setValue] = useState(initialValue);
  const resetValue = () => setValue(initialValue);
  return [value, setValue, resetValue];
}

const toDecimalPlaces = (value: number) => (value / 100).toFixed(2);

export const ProductEditForm = ({
  product,
  defaultMargin,
}: ProductEditFormProps) => {
  const [state, updateProduct] = useFormState<
    { success: boolean; error?: unknown },
    FormData
  >(editProductAction, { success: false });

  const [name, setName, resetName] = useResettableState(product.name);
  const [category, setCategory, resetCategory] = useResettableState(
    product.category.categoryId.toString(),
  );
  const [stock, setStock, resetStock] = useResettableState(
    product.stock.toString(),
  );
  const [buyPrice, setBuyPrice, resetBuyPrice] = useResettableState(
    toDecimalPlaces(product.buyPrice).toString(),
  );
  const [sellPrice, setSellPrice, resetSellPrice] = useResettableState(
    toDecimalPlaces(product.sellPrice).toString(),
  );
  const [customMargin, setCustomMargin] = useState(() => {
    const calculatedMargin =
      (parseFloat(sellPrice) / parseFloat(buyPrice)) * 100;
    return calculatedMargin.toFixed(0) !== (defaultMargin * 100).toFixed(0);
  });

  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (state.success) {
      queryClient.invalidateQueries({ queryKey: [QueryKey.products] });
      toast({ title: "Product updated", duration: 5_000 });
      router.push(`/admin/products/${product.barcode}`);
    } else if (state.error) {
      toast({ title: "Error updating product", duration: 5_000 });
    }
  }, [state]);

  return (
    <form
      className="flex h-full w-full flex-col justify-between gap-y-4"
      autoComplete="off"
    >
      <div
        className="flex w-full flex-col gap-y-4"
        onKeyDown={nextFieldOnEnter}
      >
        <div className="mr-11 flex">
          <Input
            id="name"
            data-next="stock"
            name="name"
            type="text"
            className="w-[90%] text-2xl font-semibold"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <div
            onClick={resetName}
            className="ml-2 h-fit cursor-pointer rounded-md p-3 hover:bg-stone-100"
          >
            <RotateCcw className="h-4 w-4" />
          </div>
        </div>

        <input
          type="hidden"
          name="barcode"
          id="barcode"
          value={product.barcode}
        />

        <div className="flex flex-col gap-y-2">
          <label htmlFor="stock" className="text-sm text-stone-500">
            Stock
          </label>
          <div className="inline-flex items-center">
            <Input
              id="stock"
              name="stock"
              type="number"
              value={stock}
              onChange={({ target }) => setStock(target.value)}
              placeholder="Stock"
              data-next="categoryId"
              step={1}
              className="w-[10ch] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <div
              onClick={resetStock}
              className="ml-2 h-fit cursor-pointer rounded-md p-3 hover:bg-stone-100"
            >
              <RotateCcw className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="category" className="text-sm text-stone-500">
            Category
          </label>
          <div className="flex">
            <CategorySelect
              value={category}
              onValueChange={setCategory}
              id="categoryId"
              name="categoryId"
            />
            <div
              onClick={resetCategory}
              className="ml-2 h-fit cursor-pointer rounded-md p-3 hover:bg-stone-100"
            >
              <RotateCcw className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[max-content_max-content_max-content] grid-rows-2 gap-x-4 gap-y-2">
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
              className="w-[10ch] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
              Sell Price (€)
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
              className="w-[10ch] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <div>
            <label htmlFor="resetPrices" className="text-sm text-stone-500">
              Reset prices
            </label>
            <Button
              id="resetPrices"
              variant="ghost"
              className="flex w-full"
              onClick={() => {
                resetBuyPrice();
                resetSellPrice();
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <span className="col-span-2 justify-self-center text-sm text-stone-500">
            {customMargin
              ? "(Custom Margin: " +
                (
                  (parseFloat(sellPrice) / parseFloat(buyPrice)) * 100 -
                  100
                ).toFixed(0) +
                "%)"
              : "(Default Margin: " + (defaultMargin * 100).toFixed(0) + "%)"}
          </span>
        </div>

        <div className="flex w-full flex-row-reverse justify-between gap-x-4">
          <SubmitButton formAction={updateProduct}>Update Product</SubmitButton>
          <Link href={`/admin/products`}>
            <Button tabIndex={-1} variant="outline">
              Back
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
};