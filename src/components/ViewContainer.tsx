"use client";
import { useCompactMode } from "@/lib/localSettings";
import { merge } from "@/lib/utils";
import { ReactNode } from "react";

const ViewContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const compactMode = useCompactMode();

  return (
    <div
      className={merge(
        `flex h-full w-full flex-col gap-y-4 ${compactMode ? "rounded-none border-y-0" : "rounded-lg pb-10 pt-6"}`,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ViewContainer;
