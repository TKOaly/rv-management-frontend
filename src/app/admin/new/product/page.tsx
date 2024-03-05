import { getMargin } from "@/server/requests/globalMarginRequests";
import { addProductAction } from "../../../../server/actions/products";
import AddProductFields from "./AddProductFields";

async function NewProduct() {
  const defaultMargin = await getMargin();

  return (
    <div className="flex flex-col items-center overflow-y-auto rounded-lg border border-stone-300 bg-white p-8 shadow-lg">
      <form className="flex flex-col gap-y-6" action={addProductAction}>
        <AddProductFields defaultMargin={defaultMargin} />
      </form>
    </div>
  );
}

export default NewProduct;
