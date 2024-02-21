import { getAll, getAllProductsRequest } from "@/requests/productRequests";
import { columns } from "./columns";
import { ProductTable } from "./table";

export type Product = getAllProductsRequest["products"][number];

export default async function Products() {
  const products = await getAll();

  return (
    <div className="flex w-full flex-col gap-y-4 py-16">
      <ProductTable columns={columns} data={products} />
    </div>
  );
}
