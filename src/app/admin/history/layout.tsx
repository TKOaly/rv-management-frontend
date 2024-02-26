async function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col gap-y-4 py-12">{children}</div>
  );
}

export default UsersLayout;
