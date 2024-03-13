"use client";

import { useCompactMode } from "@/lib/localSettings";
import { UserRole } from "@/server/requests/types";
import { User } from "@/server/requests/userRequests";
import { useAtomValue } from "jotai";
import { atomWithReset } from "jotai/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Make filters state accessable from the filters page
export const userFiltersAtom = atomWithReset({
  username: "",
  fullName: "",
  role: {
    admin: true,
    user1: true,
    user2: true,
    inactive: false,
  },
  negativeBalanceOnly: false,
});

function UserTable({ users }: { users: User[] }) {
  const filters = useAtomValue(userFiltersAtom);

  // Filter users based on set filters
  const filteredUsers = users
    .filter((user) =>
      filters.username && filters.username.length > 0
        ? user.username.toLowerCase().includes(filters.username.toLowerCase())
        : true,
    )
    .filter((user) =>
      filters.fullName && filters.fullName.length > 0
        ? user.fullName.toLowerCase().includes(filters.fullName.toLowerCase())
        : true,
    )
    .filter((user) => {
      if (!filters.role.admin && user.role === UserRole.ADMIN) return false;
      if (!filters.role.user1 && user.role === UserRole.USER1) return false;
      if (!filters.role.user2 && user.role === UserRole.USER2) return false;
      if (!filters.role.inactive && user.role === UserRole.INACTIVE)
        return false;
      return true;
    })
    .filter((user) =>
      filters.negativeBalanceOnly ? user.moneyBalance < 0 : true,
    );

  const path = usePathname();
  const compactMode = useCompactMode();

  return (
    <div
      className={`${/\/users\/\d+/g.test(path) ? "hidden xl:flex" : "flex"} h-full w-full overflow-y-auto ${!compactMode && "rounded-lg border-y"} border-x shadow-lg`}
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
        {filteredUsers.map((user) =>
          compactMode ? (
            <CompactUser user={user} key={user.userId} />
          ) : (
            <NormalUser user={user} key={user.userId} />
          ),
        )}
      </div>
    </div>
  );
}

export default UserTable;

const NormalUser = ({ user }: { user: User }) => (
  <Link
    href={`/admin/users/${user.userId}`}
    key={user.userId}
    className="inline-grid w-full cursor-pointer grid-cols-3 border-b border-gray-200 px-4 py-3 transition-all hover:bg-stone-100"
  >
    <div className="whitespace-nowrap">
      <h3 className="text-lg font-semibold">{user.username}</h3>
      <p className="text-lg text-stone-500">{user.fullName}</p>
    </div>
    <div className="place-self-center self-center">
      <p
        className={`${
          user.role === UserRole.ADMIN ? "text-purple-600" : "text-stone-500"
        } text-lg`}
      >
        {user.role}
      </p>
    </div>
    <div className="flex flex-col items-end">
      <p
        className={`font-semibold ${user.moneyBalance < 0 ? "text-red-500" : "text-black"} text-lg`}
      >
        {(user.moneyBalance / 100).toFixed(2)} €
      </p>
      <p className="text-lg text-stone-500">{user.email}</p>
    </div>
  </Link>
);

const CompactUser = ({ user }: { user: User }) => (
  <Link
    href={`/admin/users/${user.userId}`}
    key={user.userId}
    className="grid w-full cursor-pointer grid-cols-5 items-center border-b border-gray-200 px-2 py-1 transition-all hover:bg-stone-100"
  >
    <h3 className="text-lg font-semibold">{user.username}</h3>
    <p className="text-lg text-stone-500">{user.fullName}</p>
    <p className="justify-self-end text-lg text-stone-500">{user.email}</p>
    <p
      className={`${user.role === UserRole.ADMIN ? "text-purple-600" : "text-stone-500"} justify-self-end text-lg`}
    >
      {user.role}
    </p>
    <p
      className={`font-semibold ${user.moneyBalance < 0 ? "text-red-500" : "text-black"} justify-self-end text-lg`}
    >
      {(user.moneyBalance / 100).toFixed(2)} €
    </p>
  </Link>
);
