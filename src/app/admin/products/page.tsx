import { getAll } from "@/requests/productRequests";

export default async function Products() {
  const products = await getAll();
  return (
    <div className="h-full w-full py-16">
      {products.map((product) => {
        return (
          <div
            key={product.barcode}
            className="flex items-center justify-between border-b border-gray-200 p-4"
          >
            <div className="w-1/3 whitespace-nowrap">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.barcode}</p>
            </div>
            <div className="w-1/3 truncate">
              <br />
              <p className=" text-stone-500">{product.category.description}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-lg text-stone-500">
                Stock{" "}
                <span className="font-semibold text-black">
                  {product.stock}
                </span>
              </p>
              <p className="text-sm text-stone-500">
                {(product.buyPrice / 100).toFixed(2)} € →{" "}
                {(product.sellPrice / 100).toFixed(2)} € │ {product.weight} g
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
