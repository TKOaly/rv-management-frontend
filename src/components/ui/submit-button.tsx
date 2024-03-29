"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { ComponentProps, ReactNode } from "react";
import { merge } from "@/lib/utils";

export const SubmitButton = (
  props: ComponentProps<typeof Button> & {
    icon?: ReactNode;
  },
) => {
  const { disabled, icon, children, className, ...native } = props;
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={disabled || pending}
      type="submit"
      className={merge(
        "flex items-center gap-x-2 transition-opacity duration-200",
        className,
      )}
      {...native}
    >
      {pending ? <Loader className="animate-spin" /> : icon}
      {children}
    </Button>
  );
};
