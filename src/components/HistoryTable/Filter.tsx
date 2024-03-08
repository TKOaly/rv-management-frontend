"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePartialSetAtom } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { atomWithReset, useHydrateAtoms, useResetAtom } from "jotai/utils";

const filtersAtom = atomWithReset({});
export default function Filter({
  filtersAtom: filtersAtomFromServer,
}: {
  filtersAtom: ReturnType<
    typeof atomWithReset<{ username: string; fullName: string }>
  >;
}) {
  useHydrateAtoms([[filtersAtom, filtersAtomFromServer]]);

  const setFilters = usePartialSetAtom(filtersAtomFromServer);
  const resetFilters = useResetAtom(filtersAtomFromServer);
  const filters = useAtomValue(filtersAtomFromServer);

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
