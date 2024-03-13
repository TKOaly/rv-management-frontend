import { X } from "lucide-react";
import Link from "next/link";

async function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-y-4 rounded-lg border p-8 pb-0 shadow-lg">
      <div className="relative flex h-full w-full flex-col gap-y-4">
        <Link
          href={"/admin/products"}
          className="absolute right-0 top-2 -ml-3 -mr-2 -mt-3 w-fit rounded-md p-2 hover:bg-stone-100"
        >
          <X />
        </Link>
        {children}
      </div>
    </div>
  );
}

export default ProductLayout;
