import { getProduct } from "@/server/requests/productRequests";
import { ProductEditForm } from "./ProductEditForm";
import { getMargin } from "@/server/requests/globalMarginRequests";

export default async function ProductEditPage({
  params,
}: {
  params: { barcode: string };
}) {
  const defaultMargin = await getMargin();
  const product = await getProduct(params.barcode);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductEditForm product={product} defaultMargin={defaultMargin} />;
}
