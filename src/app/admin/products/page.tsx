"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePartialSetAtom } from "@/lib/utils";
import { getAllProductsRequest } from "@/server/productRequests";
import { useResetAtom } from "jotai/utils";
import { useState } from "react";
import { productFiltersAtom } from "./productTable";

export type Product = getAllProductsRequest["products"][0];

export default function Products() {
  const setFilters = usePartialSetAtom(productFiltersAtom);
  const resetFilters = useResetAtom(productFiltersAtom);

  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-y-4">
      <Button
        onClick={() => {
          setSearch("");
          resetFilters();
        }}
        className="w-full"
        variant={"outline"}
      >
        Reset filters
      </Button>
      <Input
        value={search}
        placeholder="Search products / boxes"
        onChange={({ target }) => {
          setSearch(target.value);
          setFilters({ search: target.value });
        }}
      />
    </div>
  );
}
