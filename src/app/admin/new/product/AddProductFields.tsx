"use client";

import Barcode from "@/components/Barcode";
import { Button } from "@/components/ui/button";
import { CategoryCombobox } from "@/components/CategoryCombobox";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { useToast } from "@/components/ui/use-toast";
import { nextFieldOnEnter } from "@/lib/utils";
import { addProductAction } from "@/server/actions/products";
import { Category } from "@/server/requests/categoryRequests";
import { Product } from "@/server/requests/productRequests";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

function AddProductFields({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams();
  const [barcode, setBarcode] = useState(searchParams.get("barcode") ?? "");

  const initialState = { success: false };
  const [state, addProduct] = useFormState<
    { success: boolean; newProduct?: Product; error?: unknown },
    FormData
  >(addProductAction, initialState);

  const router = useRouter();
  const { toast } = useToast();
  useEffect(() => {
    if (state.success && state.newProduct) {
      const { newProduct: product } = state;
      toast({
        title: "Product Created",
        description: `Product ${product.name} has been created`,
        duration: 6000,
      });
      searchParams.has("barcode")
        ? router.push(`/admin/buy_in/product/${product.barcode}`)
        : router.push(`/admin/products/${product.barcode}`);
    }
  }, [state.success, state.newProduct]);

  return (
    <>
      <div
        className="flex h-5/6 w-fit flex-shrink flex-col flex-wrap items-center gap-4"
        onKeyDown={nextFieldOnEnter}
      >
        <div className={`${searchParams.has("barcode") && "hidden"} w-full`}>
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
            containerClassName="mb-2"
          />
        </div>
        <Barcode barcode={barcode} width={3} height={50} displayInvalid />
        <div className="w-full">
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
        <div className="w-full">
          <label htmlFor="category" className="text-sm text-stone-500">
            Category
          </label>
          <CategoryCombobox
            categories={categories}
            id="categoryId"
            name="categoryId"
          />
        </div>
      </div>
      <div className="flex w-full flex-row-reverse justify-between gap-x-4">
        <SubmitButton
          id="productSubmit"
          className="w-full"
          formAction={addProduct}
        >
          Create Product
        </SubmitButton>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/admin/products`}>Back</Link>
        </Button>
      </div>
    </>
  );
}

export default AddProductFields;
