import {
  getUser,
  getUserDepositHistory,
  getUserPurchaseHistory,
} from "@/server/requests/userRequests";
import { UserView } from "./UserView";

export default async function Product({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUser(params.userId);
  const depositHistory = await getUserDepositHistory(user.userId);
  const purchaseHistory = await getUserPurchaseHistory(user.userId);

  return (
    <UserView
      user={user}
      depositHistory={depositHistory}
      purchaseHistory={purchaseHistory}
    />
  );
}
