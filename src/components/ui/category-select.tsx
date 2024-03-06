import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/server/requests/categoryRequests";
import { QueryKey } from "@/server/requests/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { ComponentProps } from "react";

interface CategorySelectProps extends ComponentProps<typeof SelectTrigger> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export function CategorySelect({
  value,
  onValueChange,
  name,
  ...props
}: CategorySelectProps) {
  const { data: categories } = useQuery({
    queryKey: [QueryKey.categories],
    queryFn: () => getAllCategories(),
  });

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
