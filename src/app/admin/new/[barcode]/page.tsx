import Barcode from "@/components/Barcode";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function ChooseType({
  params: { barcode },
}: {
  params: { barcode: string };
}) {
  return (
    <div className="flex max-h-screen flex-col items-start gap-y-4 pb-8 pt-4">
      <h1 className="text-3xl font-semibold">Choose type</h1>
      <div className=" flex flex-col items-center gap-y-4 overflow-y-auto rounded-lg border border-stone-300 bg-white p-8 text-lg shadow-lg">
        <p>The barcode was not found in the database.</p>
        <Barcode barcode={barcode} displayInvalid />
        <p>Do you want to create a new product or a new box?</p>
        <div className="flex w-full justify-between gap-x-4">
          <Button asChild>
            <Link href={`/admin/new/product?barcode=${barcode}`} autoFocus>
              Create Product
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/new/box?barcode=${barcode}`}>Create Box</Link>
          </Button>
          <Button asChild variant={"outline"}>
            <Link href={`/admin/buy_in`}>Cancel</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChooseType;
