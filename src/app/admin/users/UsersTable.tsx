"use client";

import { QueryKey } from "@/server/requests/queryKeys";
import { UserRole } from "@/server/requests/types";
import { getAll } from "@/server/requests/userRequests";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { atomWithReset } from "jotai/utils";
import { usePathname } from "next/navigation";
import { User } from "./page";

// Make filters state accessable from the filters page
export const userFiltersAtom = atomWithReset({
  username: "",
  role: {
    admin: true,
    user1: true,
    user2: true,
  },
});

function UserTable({ users }: { users: User[] }) {
  // Make User data refetchable and cacheable
  const { data: userData } = useQuery({
    queryKey: [QueryKey.users],
    queryFn: () => getAll(),
    initialData: users,
  });

  const filters = useAtomValue(userFiltersAtom);

  // Filter users based on set filters
  const filteredUsers = userData
    .filter((user) =>
      filters.username && filters.username.length > 0
        ? user.username.toLowerCase().includes(filters.username.toLowerCase())
        : true,
    )
    .filter((user) => {
      if (!filters.role.admin && user.role === UserRole.ADMIN) return false;
      if (!filters.role.user1 && user.role === UserRole.USER1) return false;
      if (!filters.role.user2 && user.role === UserRole.USER2) return false;
      return true;
    });

  const path = usePathname();

  return (
    <div
      className={`${/\/users\/\d+/g.test(path) ? "hidden xl:flex" : "flex"} h-full w-full overflow-y-auto rounded-lg border shadow-lg`}
    >
      <div className="w-full">
        {
          // Show a message if no products are found
          filteredUsers.length === 0 && (
            <div className="flex h-64 items-center justify-center">
              <p className="text-stone-500">No users found</p>
            </div>
          )
        }
        {filteredUsers.map((user) => {
          return (
            <div
              key={user.userId}
              className="flex cursor-pointer items-center justify-between border-b border-gray-200 p-4 transition-all hover:bg-stone-100"
            >
              <div className="w-1/3 whitespace-nowrap">
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <p className="text-sm text-stone-500">{user.fullName}</p>
              </div>
              <p
                className={
                  user.role === UserRole.USER1
                    ? "text-stone-500"
                    : "text-sky-800"
                }
              >
                {user.role}
              </p>
              <div className="flex flex-col items-end">
                <p className="text-lg text-stone-500">
                  <span
                    className={`font-semibold ${user.moneyBalance < 0 ? "text-red-500" : "text-black"}`}
                  >
                    {(user.moneyBalance / 100).toFixed(2)}
                  </span>{" "}
                  €
                </p>
                <p className="text-lg text-stone-500">{user.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserTable;
