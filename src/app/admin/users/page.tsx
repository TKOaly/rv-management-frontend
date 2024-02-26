"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { usePartialSetAtom } from "@/lib/utils";
import { getAllUsersResponse } from "@/server/requests/userRequests";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import Link from "next/link";
import { userFiltersAtom } from "./UsersTable";

export type User = getAllUsersResponse["users"][0];

export default function ProductFilters() {
  const setFilters = usePartialSetAtom(userFiltersAtom);
  const resetFilters = useResetAtom(userFiltersAtom);
  const filters = useAtomValue(userFiltersAtom);

  return (
    <div className="flex w-1/4 flex-col gap-y-4">
      <Link tabIndex={-1} href="/admin/new/product">
        <Button className="w-full bg-green-700">New Product</Button>
      </Link>
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
        value={filters.username}
        placeholder="Search products / boxes"
        onChange={({ target }) => setFilters({ username: target.value })}
      />
      <div className="flex flex-col gap-y-2 rounded-lg border p-4">
        <p>Filter by role</p>
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
      </div>
    </div>
  );
}
