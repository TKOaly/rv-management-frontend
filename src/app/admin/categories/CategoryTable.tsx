"use client";
import { useCompactMode } from "@/lib/localSettings";
import { Category } from "@/server/requests/categoryRequests";
import { CategoryRow } from "./CategoryRow";
import { CreateCategoryRow } from "./CreateCategoryRow";

const CategoryTable = ({ categories }: { categories: Category[] }) => {
  const compactMode = useCompactMode();
  return (
    <div
      className={`h-full min-h-0 w-full overflow-y-auto overscroll-none ${!compactMode && "rounded-lg border-y"} border-x shadow-lg`}
    >
      <div>
        {categories.map((category) => (
          <CategoryRow key={category.categoryId} category={category} />
        ))}
      </div>
      <CreateCategoryRow />
    </div>
  );
};

export default CategoryTable;
