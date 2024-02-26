import { getAllDeposits } from "@/server/requests/historyRequests";
import DepositFilters from "./DepositFilters";
import DepositsTable from "./DepositsTable";

export default async function UsersList() {
  const deposits = await getAllDeposits();

  return (
    <>
      <h1 className="text-3xl font-semibold">Deposits</h1>
      <div className="flex h-full w-full flex-row justify-between gap-x-8 pb-4">
        <DepositsTable deposits={deposits} />
        <DepositFilters />
      </div>
    </>
  );
}
