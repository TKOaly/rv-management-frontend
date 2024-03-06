import AddProductFields from "./AddProductFields";

async function NewProduct() {
  return (
    <div className="flex max-h-screen flex-col items-start gap-y-4 pb-8 pt-4">
      <h1 className="text-3xl font-semibold">New Product</h1>
      <div className="flex flex-col items-center overflow-y-auto rounded-lg border border-stone-300 bg-white p-8 shadow-lg">
        <form className="flex flex-col gap-y-6" autoComplete="off">
          <AddProductFields />
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
