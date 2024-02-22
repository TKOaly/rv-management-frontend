import { X } from "lucide-react";
import Link from "next/link";

async function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-1/3 flex-col items-start justify-start gap-y-4 rounded-lg border p-8">
      <div className="flex w-full flex-col gap-y-4">
        <Link
          href={"/admin/products"}
          className="-ml-3 -mt-3 w-fit rounded-md p-2 hover:bg-stone-100"
        >
          <X />
        </Link>
        {children}
      </div>
    </div>
  );
}

export default ProductLayout;
