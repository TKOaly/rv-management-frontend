async function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-1/3 flex-col items-start justify-start gap-y-4 rounded-lg border p-8">
      {children}
    </div>
  );
}

export default ProductLayout;
