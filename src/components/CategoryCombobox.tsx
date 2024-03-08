"use client";

import { ComponentProps, useEffect, useMemo, useState } from "react";
import { Category } from "@/server/requests/categoryRequests";
import { ChevronsUpDown } from "lucide-react";
import { merge } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CategoryComboboxProps extends ComponentProps<typeof Button> {
  categories: Category[];
  value?: number;
  onValueChange?: (value: number) => void;
}

export function CategoryCombobox({
  categories,
  value,
  onValueChange,
  className,
  name,
  ...props
}: CategoryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value?.toString() ?? "");
  const enhancedCategories = useMemo(() => {
    return categories.map((category) => {
      const [title, description] = category.description.split(" (");

      return {
        ...category,
        title,
        description: description?.replace(")", ""),
      };
    });
  }, [categories]);

  useEffect(() => {
    setInternalValue(value?.toString() ?? "");
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={merge("flex", className)}
          {...props}
          role="combobox"
          aria-expanded={open}
        >
          {internalValue
            ? enhancedCategories.find(
                (category) => category.categoryId.toString() === internalValue,
              )?.title
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <input type="hidden" name={name} value={Number(internalValue)} />
      <PopoverContent align="start" className="p-0">
        <Command
          filter={(value, search) => {
            if (value === search) {
              return 3;
            }

            if (value.includes(search)) {
              return 2;
            }

            // Use original categories to search entire description
            const description = categories.find(
              (category) => category.categoryId.toString() === value,
            )?.description;

            // TODO: This could be replaced with a more heuristic approach
            return description?.toLowerCase().includes(search.toLowerCase())
              ? 1
              : 0;
          }}
        >
          <CommandInput placeholder="Search categories..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-y-scroll">
            {enhancedCategories.map(({ categoryId, title, description }) => (
              <CommandItem
                key={categoryId.toString()}
                value={categoryId.toString()}
                aria-label={title}
                onSelect={(currentValue) => {
                  if (currentValue === internalValue) {
                    return;
                  }

                  setInternalValue(currentValue);
                  onValueChange?.(Number(currentValue));
                  setOpen(false);
                }}
                className={merge(
                  "flex-col items-start",
                  categoryId.toString() === internalValue && "bg-stone-100",
                )}
              >
                <span>{title}</span>
                {description && (
                  <span className="mr-2 opacity-50">{description}</span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
