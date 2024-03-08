"use client";

import { Transaction } from "@/server/requests/historyRequests";
import { atomWithReset } from "jotai/utils";
import HistoryTable from "./HistoryTable";
import Filter from "./Filter";

export const TableAndFilter = ({
  initialData,
}: {
  initialData: Transaction[];
}) => {
  const purchaseFiltersAtom = atomWithReset({
    username: "",
    fullName: "",
  });

  return (
    <>
      <HistoryTable
        filtersAtom={purchaseFiltersAtom}
        initialData={initialData}
      />
      <Filter filtersAtom={purchaseFiltersAtom} />
    </>
  );
};
