import { getMargin } from "@/server/requests/globalMarginRequests";
import AddProductForm from "./AddProductForm";

async function NewProduct() {
  const defaultMargin = await getMargin();

  return <AddProductForm defaultMargin={defaultMargin} />;
}

export default NewProduct;
