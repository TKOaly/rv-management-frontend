import { getAll } from "@/server/requests/userRequests";
import UsersTable from "./UsersTable";

async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getAll();

  return (
    <div className="flex h-full w-full flex-col gap-y-4 py-12">
      <h1 className="text-3xl font-semibold">Users</h1>
      <div className="flex h-full w-full flex-row justify-between gap-x-8 pb-4">
        <UsersTable users={users} />
        {children}
      </div>
    </div>
  );
}

export default UsersLayout;
