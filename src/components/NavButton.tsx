"use client";

import { merge } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavButton({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  "use client";
  const path = usePathname();
  const isActive = path.startsWith(href);

  return (
    <Link
      href={href}
      className={merge(
        "flex w-full justify-start space-x-2 rounded-lg border-2 border-transparent p-3  hover:bg-stone-200 focus-visible:bg-stone-200 focus-visible:outline-none",
        isActive && "border-black",
      )}
    >
      {children}
      <p>{title}</p>
    </Link>
  );
}
