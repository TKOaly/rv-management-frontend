"use client";

import { getAll } from "@/server/productRequests";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { atomWithReset } from "jotai/utils";
import { Product } from "./page";

// Make filters state accessable from the filters page
export const productFiltersAtom = atomWithReset({ search: "" });

function ProductTable({ products }: { products: Product[] }) {
  // Make product data refetchable and cacheable
  const { data: productData } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAll(),
    initialData: products,
  });

  const filters = useAtomValue(productFiltersAtom);

  // Filter products based on set filters
  const filteredProducts = productData.filter((product) => {
    if (filters.search && filters.search.length > 0) {
      return (
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.barcode.includes(filters.search)
      );
    }
    return true;
  });

  return (
    <div className="flex h-full flex-grow overflow-y-auto rounded-lg border">
      <div className="w-full">
        {filteredProducts.map((product) => {
          return (
            <div
              key={product.barcode}
              className="flex cursor-pointer items-center justify-between border-b border-gray-200 p-4 transition-all hover:bg-stone-100"
            >
              <div className="w-1/3 whitespace-nowrap">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-stone-500">{product.barcode}</p>
              </div>
              <div className="hidden w-1/3 flex-col items-end truncate lg:flex">
                <p className="text-sm text-stone-500">{product.weight} g</p>
                <p className=" text-stone-500">
                  {product.category.description}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-lg text-stone-500">
                  <span
                    className={`font-semibold ${product.stock < 0 ? "text-red-500" : "text-black"}`}
                  >
                    {product.stock}
                  </span>{" "}
                  pcs
                </p>
                <p className="text-lg text-stone-500">
                  {(product.buyPrice / 100).toFixed(2)} € →{" "}
                  <span className="font-semibold text-black">
                    {(product.sellPrice / 100).toFixed(2)} €
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductTable;
