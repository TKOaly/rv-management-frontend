"use server";

import ViewContainer from "@/components/ViewContainer";
import ViewTitle from "@/components/ViewTitle";
import { getAllCategories } from "@/server/requests/categoryRequests";
import { CategoryRow } from "./CategoryRow";
import { CreateCategoryRow } from "./CreateCategoryRow";

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <ViewContainer>
      <ViewTitle>Categories</ViewTitle>
      <div className="h-full min-h-0 w-full overflow-y-auto overscroll-none rounded-lg border shadow-lg">
        <div>
          {categories.map((category) => (
            <CategoryRow key={category.categoryId} category={category} />
          ))}
        </div>
        <CreateCategoryRow />
      </div>
    </ViewContainer>
  );
}
