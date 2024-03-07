import * as React from "react";

import { merge } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    containerClassName,
    disabled,
    type,
    startSlot,
    endSlot,
    ...props
  },
  ref,
) {
  return (
    <div
      className={merge(
        "flex h-10 w-full items-center gap-x-2 rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-stone-950 has-[:focus-visible]:ring-offset-2 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950  dark:has-[:focus-visible]:ring-stone-300",
        disabled && "cursor-not-allowed bg-gray-100 text-gray-400",
        containerClassName,
      )}
    >
      {startSlot}
      <input
        type={type}
        className={merge(
          "min-w-0 flex-grow file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none disabled:cursor-[inherit] disabled:bg-inherit dark:placeholder:text-stone-400",
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      {endSlot}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
