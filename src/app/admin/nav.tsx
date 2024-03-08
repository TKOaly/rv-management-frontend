import { signOut } from "@/auth";
import { NavButton } from "@/components/NavButton";
import { SubmitButton } from "@/components/ui/submit-button";
import {
  BookUser,
  FileClock,
  LogOut,
  PackagePlus,
  PackageSearch,
  Settings2,
  Tags,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    href: "/admin/buy_in",
    title: "Buy In",
    icon: <PackagePlus />,
  },
  {
    href: "/admin/products",
    title: "Products",
    icon: <PackageSearch />,
  },
  {
    href: "/admin/users",
    title: "Users",
    icon: <BookUser />,
  },
  {
    href: "/admin/history",
    title: "History",
    icon: <FileClock />,
  },
  {
    href: "/admin/categories",
    title: "Categories",
    icon: <Tags />,
  },
  {
    href: "/admin/configuration",
    title: "Config",
    icon: <Settings2 />,
  },
];

export default function AdminNavigation() {
  return (
    <nav className="flex max-h-screen w-64 flex-col justify-between overflow-y-auto p-8">
      <div className="flex flex-col items-start gap-y-2">
        <Link href={"/admin"}>
          <div className="mb-4 flex flex-col gap-y-2">
            <Image
              src={"/rv-logo.png"}
              alt="Ruokavälitys"
              height={48}
              width={150}
              className="w-auto"
              priority
            />
            <h1 className="text-2xl font-semibold">Ruokavälitys</h1>
          </div>
        </Link>
        {routes.map((route) => (
          <NavButton key={route.title} icon={route.icon} href={route.href}>
            {route.title}
          </NavButton>
        ))}
      </div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <SubmitButton
          icon={<LogOut />}
          variant="ghost"
          className="flex h-auto w-full justify-start gap-x-2 rounded-lg border-2 border-transparent p-3  hover:bg-stone-200 focus-visible:bg-stone-200 focus-visible:outline-none"
        >
          Log out
        </SubmitButton>
      </form>
    </nav>
  );
}
