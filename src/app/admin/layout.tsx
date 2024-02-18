import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col items-center justify-start">
      <nav className="flex w-full justify-between border-b border-stone-300 bg-white p-6 drop-shadow-md">
        <div className="flex flex-row items-center space-x-8">
          <Image
            src={"/rv-logo.png"}
            alt="Ruokavälitys"
            height={48}
            width={80}
          />
          <Link href={"/admin/stock/add"}>Buy In</Link>
          <Link href={"/admin/stock"}>Stock</Link>
          <Link href={"/admin/products"}>Products</Link>
          <Link href={"/admin/users"}>Users</Link>
          <Link href={"/admin/history"}>History</Link>
          <Link href={"/admin/categories"}>Categories</Link>
          <Link href={"/admin/configuration"}>Config</Link>
        </div>
        <div className="flex flex-row items-center">
          <Link href={"/"}>Logout</Link>
        </div>
      </nav>
      {children}
    </main>
  );
}
