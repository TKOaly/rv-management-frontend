"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { ComponentProps } from "react";
import { merge } from "@/lib/utils";

export const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { children, className, ...native } = props;
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className={merge("flex items-center gap-x-2", className)}
      {...native}
    >
      {pending && <Loader className="animate-spin" />}
      {children}
    </Button>
  );
};
