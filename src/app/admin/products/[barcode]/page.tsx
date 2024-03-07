import { getProduct } from "@/server/requests/productRequests";
import { ProductView } from "./ProductView";

export default async function Product({
  params,
}: {
  params: { barcode: string };
}) {
  const product = await getProduct(params.barcode);
  return <ProductView product={product} />;
}
