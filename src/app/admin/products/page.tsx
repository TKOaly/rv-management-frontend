"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useCompactMode } from "@/lib/localSettings";
import { usePartialSetAtom } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import Link from "next/link";
import { productFiltersAtom } from "./ProductTable";

export default function ProductFilters() {
  const setFilters = usePartialSetAtom(productFiltersAtom);
  const resetFilters = useResetAtom(productFiltersAtom);
  const filters = useAtomValue(productFiltersAtom);
  const compactMode = useCompactMode();

  return (
    <div className={`flex w-1/4 flex-col gap-y-4 ${compactMode && "pt-10"}`}>
      <Button asChild variant="green" className="w-full">
        <Link href="/admin/new/product">New Product</Link>
      </Button>
      <Button
        onClick={() => {
          resetFilters();
        }}
        className="w-full"
        variant={"outline"}
      >
        Reset filters
      </Button>
      <label className="-mb-3 text-sm text-stone-500">Filters</label>
      <Input
        value={filters.search}
        placeholder="Search products / boxes"
        onChange={({ target }) => setFilters({ search: target.value })}
      />
      <div className="flex items-center gap-x-2 rounded-lg border p-4">
        <Checkbox
          id="in_stock_only"
          checked={filters.onlyInStock}
          onClick={() => setFilters({ onlyInStock: !filters.onlyInStock })}
        />
        <label
          htmlFor="in_stock_only"
          className="cursor-pointer select-none text-sm"
        >
          Show In Stock Only
        </label>
      </div>
    </div>
  );
}
