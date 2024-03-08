import { ChooseType } from "./ChooseType";

async function NewProductPage({
  params: { barcode },
}: {
  params: { barcode: string };
}) {
  return (
    <div className="flex max-h-screen flex-col items-start gap-y-4 pb-8 pt-4">
      <ChooseType barcode={barcode} />
    </div>
  );
}

export default NewProductPage;
