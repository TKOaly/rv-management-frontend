import { ReactNode } from "react";

function NewProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col gap-y-4 py-12">
      <h1 className="text-3xl font-semibold">New Product</h1>
      {children}
    </div>
  );
}

export default NewProductLayout;
