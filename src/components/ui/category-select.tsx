import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/server/requests/categoryRequests";
import { ComponentProps } from "react";

interface CategorySelectProps extends ComponentProps<typeof SelectTrigger> {
  categories: Category[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export function CategorySelect({
  categories,
  value,
  onValueChange,
  name,
  ...props
}: CategorySelectProps) {
  return (
    <Select name={name} value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full" {...props}>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories?.map((category) => (
            <SelectItem
              value={category.categoryId.toString()}
              key={category.categoryId}
            >
              {category.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
