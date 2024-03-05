import { getMargin } from "@/server/requests/globalMarginRequests";
import { getProduct } from "@/server/requests/productRequests";
import BuyInProductForm from "./BuyInProductForm";

export default async function BuyInProduct({
  params: { barcode },
}: {
  params: { barcode: string };
}) {
  const defaultMargin = await getMargin();
  const product = await getProduct(barcode);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-fit flex-col items-start gap-y-4">
        <h1 className="text-3xl font-semibold">Buy In Product</h1>
        <div className="flex flex-col items-center  rounded-lg border border-stone-300 bg-white p-8 shadow-lg">
          <BuyInProductForm product={product} defaultMargin={defaultMargin} />
        </div>
      </div>
    </div>
  );
}
