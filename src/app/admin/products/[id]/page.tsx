"use client";

import { getAll, getAllProductsRequest } from "@/server/productRequests";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import Link from "next/link";

export type Product = getAllProductsRequest["products"][0];

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    const product = products!.find((product) => product.barcode === params.id);

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <div className="flex w-full flex-col gap-y-4">
        <Link
          href={"/admin/products"}
          className="w-fit rounded-md p-2 hover:bg-stone-100"
        >
          <X />
        </Link>
        <h1 className="text-xl font-bold">{product.name}</h1>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="barcode" className="text-sm text-stone-500">
            Barcode
          </label>
          <p id="barcode">{product.barcode}</p>
        </div>
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
    );
  }

  if (isError) {
    return <div>Error Fetching Product</div>;
  }
}
