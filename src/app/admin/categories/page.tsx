import { getAllCategories } from "@/server/requests/categoryRequests";
import { CategoryRow } from "./CategoryRow";

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <div className="flex h-full w-full flex-col gap-y-4 py-12">
      <h1 className="text-3xl font-semibold">Categories</h1>
      <div className="h-full w-full pb-16">
        <div className="h-full overflow-y-auto rounded-lg border shadow-lg">
          <div>
            {categories.map((category) => (
              <CategoryRow key={category.categoryId} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
