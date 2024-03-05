import { ReactNode } from "react";

function NewProductLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
}

export default NewProductLayout;
