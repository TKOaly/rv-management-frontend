import ViewContainer from "@/components/ViewContainer";
import ViewTitle from "@/components/ViewTitle";
import { getAllProducts } from "@/server/requests/productRequests";
import ProductTable from "./ProductTable";

async function ProductsLayout({ children }: { children: React.ReactNode }) {
  const products = await getAllProducts();

  return (
    <ViewContainer>
      <ViewTitle>Products</ViewTitle>
      <div className="flex h-full min-h-0 w-full flex-row justify-between gap-x-8">
        <ProductTable products={products} />
        {children}
      </div>
    </ViewContainer>
  );
}

export default ProductsLayout;
