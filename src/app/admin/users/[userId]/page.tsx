import { getUser } from "@/server/requests/userRequests";
import { UserView } from "./UserView";

export default async function Product({
  params,
}: {
  params: { userId: string };
}) {
  const user = await getUser(params.userId);
  return <UserView user={user} />;
}
