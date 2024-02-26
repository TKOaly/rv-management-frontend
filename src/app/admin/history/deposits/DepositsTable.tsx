"use client";

import { Deposit, getAllDeposits } from "@/server/requests/historyRequests";
import { QueryKey } from "@/server/requests/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { atomWithReset } from "jotai/utils";
import { usePathname } from "next/navigation";

// Make filters state accessable from the filters page
export const depositFiltersAtom = atomWithReset({
  username: "",
  fullName: "",
});

function DepositsTable({ deposits }: { deposits: Deposit[] }) {
  // Make Deposit data refetchable and cacheable
  const { data: depositData } = useQuery({
    queryKey: [QueryKey.deposits],
    queryFn: () => getAllDeposits(),
    initialData: deposits,
  });

  const filters = useAtomValue(depositFiltersAtom);

  // Filter deposits based on set filters
  const filteredDeposits = depositData
    .filter((deposit) =>
      filters.username && filters.username.length > 0
        ? deposit.user.username
            .toLowerCase()
            .includes(filters.username.toLowerCase())
        : true,
    )
    .filter((deposit) =>
      filters.fullName && filters.fullName.length > 0
        ? deposit.user.fullName
            .toLowerCase()
            .includes(filters.fullName.toLowerCase())
        : true,
    );

  const path = usePathname();

  return (
    <div
      className={`${/\/history\/deposits\/\d+/g.test(path) ? "hidden xl:flex" : "flex"} h-full w-full overflow-y-auto rounded-lg border shadow-lg`}
    >
      <div className="w-full">
        {
          // Show a message if no products are found
          filteredDeposits.length === 0 && (
            <div className="flex h-64 items-center justify-center">
              <p className="text-stone-500">No Deposits found</p>
            </div>
          )
        }
        {filteredDeposits.map((deposit) => {
          return (
            <div
              key={deposit.depositId}
              className="inline-grid w-full cursor-pointer grid-cols-3 border-b border-gray-200 p-4 transition-all hover:bg-stone-100"
            >
              <div className="whitespace-nowrap">
                <h3 className="text-lg font-semibold">
                  {deposit.user.username}
                </h3>
                <p className="text-sm text-stone-500">
                  {deposit.user.fullName}
                </p>
              </div>
              <div className="place-self-center self-center">
                <p>
                  {new Date(Date.parse(deposit.time)).toLocaleDateString()}
                  {" - "}
                  {new Date(Date.parse(deposit.time)).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-stone-300">
                  <span
                    className={`font-semibold ${deposit.balanceAfter - deposit.amount < 0 ? "text-red-500" : ""}`}
                  >
                    {((deposit.balanceAfter - deposit.amount) / 100).toFixed(2)}{" "}
                    €
                  </span>{" "}
                  <span className={`text-lg font-semibold text-black`}>
                    + {(deposit.amount / 100).toFixed(2)}€
                  </span>{" "}
                  ={" "}
                  <span
                    className={`font-semibold ${deposit.balanceAfter < 0 ? "text-red-500" : ""}`}
                  >
                    {(deposit.balanceAfter / 100).toFixed(2)}
                  </span>{" "}
                  €
                </p>
                <p className="text-sm text-stone-500">{deposit.user.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DepositsTable;
