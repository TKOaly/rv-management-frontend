"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { ComponentProps } from "react";

export const SubmitButton = (props: ComponentProps<typeof Button>) => {
  const { children, ...native } = props;
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      type="submit"
      className="flex items-center gap-x-2"
      {...native}
    >
      {pending && <Loader className="animate-spin" />}
      {children}
    </Button>
  );
};
