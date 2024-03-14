"use client";
import { useCompactMode } from "@/lib/localSettings";
import { ReactNode } from "react";

const ViewTitle = ({ children }: { children: ReactNode }) => {
  const compactMode = useCompactMode();

  if (compactMode) {
    return null;
  }
  return <h1 className="text-3xl font-semibold">{children}</h1>;
};

export default ViewTitle;
