import { getAll } from "@/server/requests/productRequests";
import ProductTable from "./ProductTable";

async function ProductsLayout({ children }: { children: React.ReactNode }) {
  const products = await getAll();

  return (
    <div className="flex h-full w-full flex-col gap-y-4 py-12">
      <h1 className="text-3xl font-semibold">Products</h1>
      <div className="flex h-full w-full flex-row justify-between gap-x-8 pb-16">
        <ProductTable products={products} />
        {children}
      </div>
    </div>
  );
}

export default ProductsLayout;
