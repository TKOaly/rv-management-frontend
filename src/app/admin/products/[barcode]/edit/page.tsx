"use server";

import { getProduct } from "@/server/requests/productRequests";
import { ProductEditForm } from "./ProductEditForm";
import { getMargin } from "@/server/requests/globalMarginRequests";
import { getAllCategories } from "@/server/requests/categoryRequests";

export default async function ProductEditPage({
  params,
}: {
  params: { barcode: string };
}) {
  const defaultMargin = await getMargin();
  const product = await getProduct(params.barcode);
  const categories = await getAllCategories();

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ProductEditForm
      categories={categories}
      product={product}
      defaultMargin={defaultMargin}
    />
  );
}
