import { getAll } from "@/server/productRequests";
import ProductTable from "./productTable";

async function ProductsLayout({ children }: { children: React.ReactNode }) {
  const products = await getAll();

  return (
    <div className="flex h-full w-full flex-row gap-x-4 py-16">
      <ProductTable products={products} />
      {children}
    </div>
  );
}

export default ProductsLayout;
