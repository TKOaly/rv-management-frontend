import { HeaderTab } from "@/components/ui/header-tab";
import { historyTabs } from "../layout";
import { getAllPurchases } from "@/server/requests/historyRequests";
import { TableAndFilter } from "@/components/HistoryTable/TableAndFilter";

export default async function PurchasesPage() {
  const purchases = await getAllPurchases();

  return (
    <>
      <HeaderTab tabs={historyTabs} selectedTab="Purchases" />
      <div className="flex h-full w-full flex-row justify-between gap-x-8 pb-4">
        <TableAndFilter initialData={purchases} />
      </div>
    </>
  );
}
