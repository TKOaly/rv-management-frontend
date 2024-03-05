import { getAllUsers } from "@/server/requests/userRequests";
import UserFilters from "./UserFilters";
import UsersTable from "./UsersTable";

export default async function UsersList() {
  const users = await getAllUsers();

  return (
    <div className="flex h-full w-full flex-row justify-between gap-x-8 pb-4">
      <UsersTable users={users} />
      <UserFilters />
    </div>
  );
}
