"use client";

import { merge } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function NavButton({
  href,
  icon,
  children,
}: {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  "use client";
  const path = usePathname();
  const isActive = path.startsWith(href);

  return (
    <Link
      href={href}
      className={merge(
        "flex w-full justify-start gap-x-2 rounded-lg border-2 border-transparent p-3  hover:bg-stone-200 focus-visible:bg-stone-200 focus-visible:outline-none",
        isActive && "border-black",
      )}
    >
      {icon}
      {children}
    </Link>
  );
}
