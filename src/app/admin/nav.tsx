import {
  BookUser,
  FileClock,
  LogOut,
  PackageCheck,
  PackagePlus,
  PackageSearch,
  Settings2,
  Tags,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminNavigation() {
  return (
    <nav className="flex w-72 flex-col justify-between p-8">
      <div className="flex flex-col items-start space-y-2">
        <Link href={"/admin"}>
          <div className="mb-4 flex-col space-y-2">
            <Image
              src={"/rv-logo.png"}
              alt="Ruokavälitys"
              height={48}
              width={160}
            />
            <h1 className="text-2xl font-semibold">Ruokavälitys</h1>
          </div>
        </Link>
        <NavButton href={"/admin/stock/add"} title="Buy In">
          <PackagePlus />
        </NavButton>
        <NavButton href={"/admin/stock"} title="Stock">
          <PackageCheck />
        </NavButton>
        <NavButton href={"/admin/products"} title="Products">
          <PackageSearch />
        </NavButton>
        <NavButton href={"/admin/users"} title="Users">
          <BookUser />
        </NavButton>
        <NavButton href={"/admin/history"} title="History">
          <FileClock />
        </NavButton>
        <NavButton href={"/admin/categories"} title="Categories">
          <Tags />
        </NavButton>
        <NavButton href={"/admin/configuration"} title="Config">
          <Settings2 />
        </NavButton>
      </div>
      <div className="flex w-full space-x-2 rounded-lg border-2 border-transparent p-3  hover:border-black">
        <LogOut />
        <Link href={"/"}>Logout</Link>
      </div>
    </nav>
  );
}

function NavButton({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex w-full space-x-2 rounded-lg border-2 border-transparent p-3  hover:border-black"
    >
      {children}
      <p>{title}</p>
    </Link>
  );
}
