import { getMargin } from "@/server/requests/globalMarginRequests";
import AddProductFields from "./AddProductFields";
import { addProductAction } from "./action";

async function NewProduct() {
  const defaultMargin = await getMargin();

  return (
    <form
      className="flex h-full flex-col justify-between"
      action={addProductAction}
    >
      <AddProductFields defaultMargin={defaultMargin} />
    </form>
  );
}

export default NewProduct;
