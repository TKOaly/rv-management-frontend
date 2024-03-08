"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/server/requests/userRequests";
import { Copy } from "lucide-react";

const initials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
};

export const UserView = ({ user }: { user: User }) => {
  const { toast } = useToast();

  return (
    <div className="flex h-full w-full flex-col gap-y-4">
      <div className="flex w-full items-center gap-4">
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
        <p id="balance" className={user.moneyBalance < 0 ? "text-red-500" : ""}>
          {(user.moneyBalance / 100).toFixed(2)} €
        </p>
      </div>
    </div>
  );
};
