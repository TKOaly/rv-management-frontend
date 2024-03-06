"use client";

import Barcode from "@/components/Barcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { nextFieldOnEnter } from "@/lib/utils";
import { addProductAction } from "@/server/actions/products";
import { QueryKey } from "@/server/requests/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

function AddProductFields() {
  const searchParams = useSearchParams();
  const [barcode, setBarcode] = useState(searchParams.get("barcode") ?? "");

  const initialState = { success: false };
  const [state, addProduct] = useFormState<
    { success: boolean; barcode?: string; error?: unknown },
    FormData
  >(addProductAction, initialState);

  const queryClient = useQueryClient();
  const router = useRouter();
  useEffect(() => {
    if (state.success && state.barcode) {
      queryClient.invalidateQueries({ queryKey: [QueryKey.products] });
      searchParams.has("barcode")
        ? router.push(`/admin/buy_in/product/${state.barcode}`)
        : router.push(`/admin/products/${state.barcode}`);
    }
  }, [state.success, state.barcode]);

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
      </div>
      <div className="flex w-full flex-row-reverse justify-between gap-x-4">
        <Button
          type="submit"
          id="productSubmit"
          className="flex items-center gap-x-2"
          formAction={addProduct}
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
