"use client";

import { merge } from "@/lib/utils";

const stringToCamelcase = (str: string) =>
  str
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (substr, idx) {
      return idx === 0 ? substr.toLowerCase() : substr.toUpperCase();
    })
    .replace(/\s+/g, "");

type OwnProps = {
  label: string;
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Wrapper to add a label to a child component
 * @param label The label to display. Is converted to camelCase and used as htmlFor if not provided
 * @param htmlFor The id of the child component if not the same as label in camelCase
 * @param children Any component
 */
const Label = ({ label, htmlFor, className, children }: OwnProps) => {
  return (
    <div className={merge("flex flex-col gap-y-2", className)}>
      <label
        htmlFor={htmlFor ?? stringToCamelcase(label)}
        className="text-sm text-stone-500"
      >
        {label}
      </label>
      {children}
    </div>
  );
};

export default Label;
