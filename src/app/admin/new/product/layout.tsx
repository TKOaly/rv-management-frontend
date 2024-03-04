import { ReactNode } from "react";

function NewProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex max-h-screen flex-col items-start gap-y-4 pb-8 pt-4">
        <h1 className="text-3xl font-semibold">New Product</h1>
        {children}
      </div>
    </div>
  );
}

export default NewProductLayout;
