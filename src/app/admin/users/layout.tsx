import { getAllUsers } from "@/server/requests/userRequests";
import UserTable from "./UsersTable";

async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getAllUsers();

  return (
    <div className="flex h-full w-full flex-col gap-y-4 py-12">
      <h1 className="text-3xl font-semibold">Users</h1>
      <div className="flex h-full w-full flex-row justify-between gap-x-8 pb-16">
        <UserTable users={users} />
        {children}
      </div>
    </div>
  );
}

export default UsersLayout;
