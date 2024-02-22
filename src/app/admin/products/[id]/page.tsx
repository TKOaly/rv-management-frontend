"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  getAll,
  getAllProductsResponse,
} from "@/server/requests/productRequests";
import { useQuery } from "@tanstack/react-query";
import Barcode from "react-barcode";

export type Product = getAllProductsResponse["products"][0];

export default function Product({ params }: { params: { id: string } }) {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAll(),
  });

  const { toast } = useToast();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    const product = products!.find((product) => product.barcode === params.id);

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <div className="flex h-full w-full flex-col justify-between gap-y-4">
        <div className="flex w-full flex-col gap-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="weight" className="text-sm text-stone-500">
              Weight
            </label>
            <p id="weight">{product.weight} g</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="stock" className="text-sm text-stone-500">
              Stock
            </label>
            <p id="stock" className={product.stock < 0 ? "text-red-500" : ""}>
              {product.stock}
            </p>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="category" className="text-sm text-stone-500">
              Category
            </label>
            <p id="category">{product.category.description}</p>
          </div>
        </div>
        <div
          className="mb-8 flex cursor-pointer flex-col items-center self-center transition-all hover:scale-110"
          onClick={() => {
            navigator.clipboard.writeText(product.barcode);
            toast({ title: "Barcode copied to clipboard", duration: 2000 });
          }}
        >
          <Barcode
            value={product.barcode}
            width={3}
            height={125}
            format={
              product.barcode.length === 13
                ? "EAN13"
                : product.barcode.length === 8
                  ? ("EAN8" as "EAN13")
                  : undefined
            }
          />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error Fetching Product</div>;
  }
}
