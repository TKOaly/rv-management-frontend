import { getAllCategories } from "@/server/requests/categoryRequests";

export default async function Categories() {
  const categories = await getAllCategories();
  return (
    <div className="flex h-full w-full flex-col gap-y-4 py-12">
      <h1 className="text-3xl font-semibold">Categories</h1>
      <div className="h-full w-full pb-16">
        <div className="h-full overflow-y-auto rounded-lg border shadow-lg">
          <div>
            {categories.map((category) => {
              return (
                <div
                  key={category.categoryId}
                  className="flex items-center justify-start border-b border-gray-200 p-4"
                >
                  <h3 className="w-24 text-lg font-semibold">
                    {category.categoryId}
                  </h3>
                  <h3 className="text-lg">{category.description}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
