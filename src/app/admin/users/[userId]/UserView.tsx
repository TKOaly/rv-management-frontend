"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { currencyFormatter } from "@/lib/moneyFormatter";
import { merge } from "@/lib/utils";
import { Deposit, Purchase } from "@/server/requests/historyRequests";
import { User } from "@/server/requests/userRequests";
import { Copy } from "lucide-react";
import { useMemo, useState } from "react";

const initials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
};

export const UserView = ({
  user,
  depositHistory,
  purchaseHistory,
}: {
  user: User;
  depositHistory: Omit<Deposit, "user">[];
  purchaseHistory: Omit<Purchase, "user">[];
}) => {
  const { toast } = useToast();
  const [view, setView] = useState<"combined" | "deposits" | "purchases">(
    "combined",
  );
  const transactions = useMemo(() => {
    if (view === "combined") {
      return [...depositHistory, ...purchaseHistory].toSorted(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
      );
    }

    return view === "deposits" ? depositHistory : purchaseHistory;
  }, [depositHistory, purchaseHistory, view]);

  return (
    <div className="flex h-full w-full flex-col gap-y-4">
      <div className="grid h-full w-full grid-cols-[max-content_auto] gap-4 divide-x">
        <div className="flex h-full flex-col gap-4">
          <div className="flex gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback>{initials(user.fullName)}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">{user.fullName}</h1>
              <p className="text-stone-500">{user.username}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-stone-500">
              Email
            </label>
            <div className="group flex gap-2">
              <p id="email">{user.email}</p>
              <Copy
                width={14}
                className="hidden cursor-pointer group-hover:inline-block"
                onClick={() => {
                  navigator.clipboard.writeText(user.email);
                  toast({ title: "Email copied to clipboard", duration: 2000 });
                }}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="text-sm text-stone-500">
              Role
            </label>
            <p id="role">{user.role}</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="balance" className="text-sm text-stone-500">
              Balance
            </label>
            <p
              id="balance"
              className={user.moneyBalance < 0 ? "text-red-500" : ""}
            >
              {(user.moneyBalance / 100).toFixed(2)} €
            </p>
          </div>
        </div>

        <div className="px-4">
          <div className="mb-2 flex gap-4 text-xl font-semibold">
            <h2
              className={merge(
                "select-none",
                view !== "combined" &&
                  "cursor-pointer text-stone-300 underline-offset-8 transition-all duration-100 hover:underline focus-visible:underline focus-visible:outline-none",
              )}
              onClick={() => setView("combined")}
            >
              Combined
            </h2>
            <h2
              className={merge(
                "select-none",
                view !== "deposits" &&
                  "cursor-pointer text-stone-300 underline-offset-8 transition-all duration-100 hover:underline focus-visible:underline focus-visible:outline-none",
              )}
              onClick={() => setView("deposits")}
            >
              Deposits
            </h2>
            <h2
              className={merge(
                "select-none",
                view !== "purchases" &&
                  "cursor-pointer text-stone-300 underline-offset-8 transition-all duration-100 hover:underline focus-visible:underline focus-visible:outline-none",
              )}
              onClick={() => setView("purchases")}
            >
              Purchases
            </h2>
          </div>

          {transactions.map((transaction) => (
            <div className="grid grid-cols-3 gap-y-2 text-right">
              <p className="text-left">
                {new Date(transaction.time).toLocaleDateString("fi-FI")}
              </p>
              <p>{currencyFormatter.format(transaction.balanceAfter)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
