import { getAllDeposits } from "@/server/requests/historyRequests";
import { HeaderTab } from "@/components/ui/header-tab";
import { historyTabs } from "../layout";
import { TableAndFilter } from "@/components/HistoryTable/TableAndFilter";

export default async function DepositsPage() {
  const deposits = await getAllDeposits();

  return (
    <>
      <HeaderTab tabs={historyTabs} selectedTab="Deposits" />
      <div className="flex h-full w-full flex-row justify-between gap-x-8 pb-4">
        <TableAndFilter initialData={deposits} />
      </div>
    </>
  );
}
