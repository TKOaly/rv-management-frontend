export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <nav></nav>
      {children}
    </main>
  );
}
