import ViewContainer from "@/components/ViewContainer";
import { X } from "lucide-react";
import Link from "next/link";

async function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewContainer className="items-start justify-start border p-8 pb-0 shadow-lg">
      <div className="relative flex h-full w-full flex-col gap-y-4">
        <Link
          href={"/admin/products"}
          className="absolute right-0 top-2 -ml-3 -mr-2 -mt-3 w-fit rounded-md p-2 hover:bg-stone-100"
        >
          <X />
        </Link>
        {children}
      </div>
    </ViewContainer>
  );
}

export default ProductLayout;
