import { getAll, getAllProductsRequest } from "@/requests/productRequests";
import ProductTable from "./productTable";

export type Product = getAllProductsRequest["products"][0];

export default async function Products() {
  const products = await getAll();
  return (
    <div className="h-full  overflow-y-auto rounded-lg border">
      <ProductTable products={products} />
    </div>
  );
}
