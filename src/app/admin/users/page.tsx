import { getAllUsers } from "@/server/requests/userRequests";
import UserFilters from "./UserFilters";
import UserTable from "./UsersTable";

export default async function UsersList() {
  const users = await getAllUsers();
  return (
    <>
      <UserTable users={users} />
      <UserFilters />
    </>
  );
}
