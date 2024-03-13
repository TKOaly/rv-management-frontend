"use server";

import { getAllCategories } from "@/server/requests/categoryRequests";
import { CategoryRow } from "./CategoryRow";
import { CreateCategoryRow } from "./CreateCategoryRow";

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <div className="flex h-full w-full flex-col gap-y-4 pb-10 pt-6">
      <h1 className="text-3xl font-semibold">Categories</h1>
      <div className="h-full min-h-0 w-full overflow-y-auto overscroll-none rounded-lg border shadow-lg">
        <div>
          {categories.map((category) => (
            <CategoryRow key={category.categoryId} category={category} />
          ))}
        </div>
        <CreateCategoryRow />
      </div>
    </div>
  );
}
