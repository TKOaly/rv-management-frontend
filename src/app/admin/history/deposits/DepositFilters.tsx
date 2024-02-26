"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePartialSetAtom } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { depositFiltersAtom } from "./DepositsTable";

export default function DepositFilters() {
  const setFilters = usePartialSetAtom(depositFiltersAtom);
  const resetFilters = useResetAtom(depositFiltersAtom);
  const filters = useAtomValue(depositFiltersAtom);

  return (
    <div className="flex w-1/4 flex-col gap-y-4">
      <label className="-mb-2 text-sm text-stone-500">Filters</label>
      <Button
        onClick={() => {
          resetFilters();
        }}
        className="w-full"
        variant={"outline"}
      >
        Reset filters
      </Button>
      <Input
        value={filters.username}
        placeholder="Search by username"
        onChange={({ target }) => setFilters({ username: target.value })}
      />
      <Input
        value={filters.fullName}
        placeholder="Search by full name"
        onChange={({ target }) => setFilters({ fullName: target.value })}
      />
    </div>
  );
}
