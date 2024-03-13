import { getMargin } from "@/server/requests/globalMarginRequests";
import { MarginEditForm } from "./MarginEditForm";

export default async function Configuration() {
  const defaultMargin = await getMargin();

  return (
    <div className="flex h-full w-full flex-col gap-y-4 pb-10 pt-6">
      <h1 className="text-3xl font-semibold">Configuration</h1>
      <MarginEditForm defaultMargin={defaultMargin} />
    </div>
  );
}
