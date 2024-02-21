import { getAll } from "@/requests/categoryRequests";

export default async function Categories() {
  const categories = await getAll();
  return (
    <div className="h-full w-full py-16">
      <div className="h-full overflow-y-auto rounded-lg border">
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
  );
}
