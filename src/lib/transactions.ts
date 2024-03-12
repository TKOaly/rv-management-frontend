import {
  Transaction,
  Purchase,
  Deposit,
} from "@/server/requests/historyRequests";

export const isPurchase = (
  transaction: Transaction,
): transaction is Purchase => {
  return (transaction as Purchase).purchaseId !== undefined;
};
export const isDeposit = (transaction: Transaction): transaction is Deposit => {
  return (transaction as Deposit).depositId !== undefined;
};
