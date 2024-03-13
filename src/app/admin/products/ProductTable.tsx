"use client";

import { Product } from "@/server/requests/productRequests";
import { useAtomValue } from "jotai";
import { atomWithReset } from "jotai/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Make filters state accessable from the filters page
export const productFiltersAtom = atomWithReset({
  search: "",
  onlyInStock: false,
});

function ProductTable({ products }: { products: Product[] }) {
  const filters = useAtomValue(productFiltersAtom);

  // Filter products based on set filters
  const filteredProducts = products
    .filter((product) => {
      if (filters.search && filters.search.length > 0) {
        return (
          product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          product.barcode.includes(filters.search)
        );
      }
      return true;
    })
    .filter((product) => {
      if (filters.onlyInStock) {
        return product.stock > 0;
      }
      return true;
    });

  const sortedProducts = filteredProducts.sort((a, b) => {
    const [nameA, nameB] = [a.name.toLowerCase(), b.name.toLowerCase()];
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  });

  const path = usePathname();

  return (
    <div
      className={`${/\/products\/\d+/g.test(path) ? "hidden xl:flex" : "flex"} h-full w-full overflow-y-auto rounded-lg border shadow-lg`}
    >
      <div className="w-full">
        {
          // Show a message if no products are found
          sortedProducts.length === 0 && (
            <div className="flex h-64 items-center justify-center">
              <p className="text-stone-500">No products found</p>
            </div>
          )
        }
        {sortedProducts.map((product) => {
          return (
            <Link
              tabIndex={-1}
              href={`/admin/products/${product.barcode}`}
              key={product.barcode}
            >
              <div className="flex cursor-pointer items-center justify-between border-b border-gray-200 px-4 py-3 transition-all hover:bg-stone-100">
                <div className="w-1/3 whitespace-nowrap">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-stone-500">{product.barcode}</p>
                </div>
                {/*<div className="hidden w-1/3 flex-col items-end truncate xl:flex">
                  <p className=" text-stone-500">
                    {product.category.description}
                  </p>
                </div>*/}
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
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProductTable;
