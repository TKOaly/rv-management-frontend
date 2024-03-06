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
import { DeleteProductAction } from "@/server/actions/products";
import { Product } from "@/server/requests/productRequests";
import { useRouter } from "next/navigation";

const ProductDeleteForm = ({ product }: { product: Product }) => {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Product</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product?</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete the listing for this product. Product data will
            remain attached to past purchase history.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={async () => {
                try {
                  await DeleteProductAction(product.barcode);
                  router.push("/admin/products");
                  toast({ title: "Product deleted", duration: 3000 });
                } catch {
                  toast({
                    title: "Error deleting product",
                    duration: 3000,
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
  );
};

export default ProductDeleteForm;
