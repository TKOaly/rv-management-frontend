async function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col gap-y-4 py-12">
      <h1 className="text-3xl font-semibold">Users</h1>
      {children}
    </div>
  );
}

export default UsersLayout;
