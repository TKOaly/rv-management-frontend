"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteProduct,
  getAll,
  getAllProductsResponse,
} from "@/server/requests/productRequests";
import { QueryKey } from "@/server/requests/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Barcode from "react-barcode";

export type Product = getAllProductsResponse["products"][0];

export default function Product({ params }: { params: { id: string } }) {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [QueryKey.products],
    queryFn: () => getAll(),
  });

  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    const product = products!.find((product) => product.barcode === params.id);

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <div className="flex h-full w-full flex-col justify-between gap-y-4">
        <div className="flex w-full flex-col gap-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="weight" className="text-sm text-stone-500">
              Weight
            </label>
            <p id="weight">{product.weight} g</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="stock" className="text-sm text-stone-500">
              Stock
            </label>
            <p id="stock" className={product.stock < 0 ? "text-red-500" : ""}>
              {product.stock}
            </p>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="category" className="text-sm text-stone-500">
              Category
            </label>
            <p id="category">{product.category.description}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="buyPrice" className="text-sm text-stone-500">
              Buy Price
            </label>
            <p id="buyPrice">{(product.buyPrice / 100).toFixed(2)} €</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="sellPrice" className="text-sm text-stone-500">
              Sell Price
            </label>
            <p id="sellPrice">{(product.sellPrice / 100).toFixed(2)} €</p>
          </div>
        </div>
        <div>
          <div
            className="mb-8 flex cursor-pointer flex-col items-center self-center transition-all hover:scale-110"
            onClick={() => {
              navigator.clipboard.writeText(product.barcode);
              toast({ title: "Barcode copied to clipboard", duration: 2000 });
            }}
          >
            <Barcode
              value={product.barcode}
              width={3}
              height={125}
              format={
                product.barcode.length === 13
                  ? "EAN13"
                  : product.barcode.length === 8
                    ? ("EAN8" as "EAN13")
                    : undefined
              }
            />
          </div>
          <div className="flex gap-x-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Product</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will delete the listing for this product. Product data
                    will remain attached to past purchase history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={async () => {
                        try {
                          router.replace("/admin/products");
                          const deletedProduct = await deleteProduct(
                            product.barcode,
                          );
                          if (!deletedProduct) {
                            throw new Error("Product not deleted");
                          }
                          queryClient.invalidateQueries({
                            queryKey: [QueryKey.products],
                          });
                          toast({ title: "Product deleted", duration: 2000 });
                        } catch (error) {
                          router.replace("/admin/products/" + product.barcode);
                          toast({
                            title: "Error deleting product",
                            duration: 2000,
                          });
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error Fetching Product</div>;
  }
}
