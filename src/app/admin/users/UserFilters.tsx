"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { usePartialSetAtom } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { userFiltersAtom } from "./UsersTable";

export default function UserFilters() {
  const setFilters = usePartialSetAtom(userFiltersAtom);
  const resetFilters = useResetAtom(userFiltersAtom);
  const filters = useAtomValue(userFiltersAtom);

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
      <div className="flex flex-col gap-y-2 rounded-lg border p-4 pt-3">
        <p className="text-stone-500">Filter by role</p>
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="filter_admin"
            checked={filters.role.admin}
            onClick={() =>
              setFilters({
                role: { ...filters.role, admin: !filters.role.admin },
              })
            }
          />
          <label
            htmlFor="filter_admin"
            className="cursor-pointer select-none text-sm"
          >
            ADMIN
          </label>
        </div>
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="filter_user1"
            checked={filters.role.user1}
            onClick={() =>
              setFilters({
                role: { ...filters.role, user1: !filters.role.user1 },
              })
            }
          />
          <label
            htmlFor="filter_user1"
            className="cursor-pointer select-none text-sm"
          >
            USER1
          </label>
        </div>
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="filter_user2"
            checked={filters.role.user2}
            onClick={() =>
              setFilters({
                role: { ...filters.role, user2: !filters.role.user2 },
              })
            }
          />
          <label
            htmlFor="filter_user2"
            className="cursor-pointer select-none text-sm"
          >
            USER2
          </label>
        </div>
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="filter_inactive"
            checked={filters.role.inactive}
            onClick={() =>
              setFilters({
                role: { ...filters.role, inactive: !filters.role.inactive },
              })
            }
          />
          <label
            htmlFor="filter_inactive"
            className="cursor-pointer select-none text-sm"
          >
            INACTIVE
          </label>
        </div>
      </div>
      <div className="flex items-center gap-x-2 rounded-lg border p-4">
        <Checkbox
          id="negative_balance_only"
          checked={filters.negativeBalanceOnly}
          onClick={() =>
            setFilters({ negativeBalanceOnly: !filters.negativeBalanceOnly })
          }
        />
        <label
          htmlFor="negative_balance_only"
          className="cursor-pointer select-none text-sm"
        >
          Negative balance only
        </label>
      </div>
    </div>
  );
}
