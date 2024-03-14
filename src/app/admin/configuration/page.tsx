"use server";
import ViewTitle from "@/components/ViewTitle";
import { getMargin } from "@/server/requests/globalMarginRequests";
import { CompactModeToggle } from "./CompactModeToggle";
import { MarginEditForm } from "./MarginEditForm";

export default async function Configuration() {
  const defaultMargin = await getMargin();

  return (
    <div className="flex h-full w-full flex-col gap-y-4 pb-10 pt-6">
      <ViewTitle>Configurations</ViewTitle>
      <div className="flex h-full min-h-0 w-full flex-wrap gap-4">
        <MarginEditForm defaultMargin={defaultMargin} />
        <CompactModeToggle />
      </div>
    </div>
  );
}
