import { getAllBoxes } from "@/server/requests/boxRequests";
import { getProduct } from "@/server/requests/productRequests";
import { ProductView } from "./ProductView";

export default async function Product({
  params,
}: {
  params: { barcode: string };
}) {
  const product = await getProduct(params.barcode);
  const boxes = await getAllBoxes();
  return (
    <ProductView
      boxes={boxes.filter((box) => box.product.barcode === product.barcode)}
      product={product}
    />
  );
}
