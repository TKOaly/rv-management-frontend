"use client";

import Barcode from "@/components/Barcode";
import Label from "@/components/WithLabel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Box } from "@/server/requests/boxRequests";
import { Product } from "@/server/requests/productRequests";
import Link from "next/link";
import AttachedBoxesList from "./AttachedBoxesList";
import ProductDeleteButton from "./ProductDeleteForm";

type OwnProps = { product: Product; boxes: Box[] };

export const ProductView = ({ product, boxes }: OwnProps) => {
  const { toast } = useToast();

  return (
    <div className="flex h-full w-full flex-col justify-between gap-y-4">
      <div className="flex w-full flex-col gap-y-4">
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <div className="flex justify-between">
          <div className="flex w-full flex-col gap-y-4">
            <div className="flex gap-x-8">
              <Label label="Stock">
                <p
                  id="stock"
                  className={product.stock < 0 ? "text-red-500" : ""}
                >
                  {product.stock}
                </p>
              </Label>
              <Label label="Buy Price">
                <p id="buyPrice">{(product.buyPrice / 100).toFixed(2)} €</p>
              </Label>
              <Label label="Sell Price">
                <p id="sellPrice">{(product.sellPrice / 100).toFixed(2)} €</p>
              </Label>
            </div>
            <Label label="Category">
              <p id="category">{product.category.description}</p>
            </Label>
          </div>

          <div
            className="flex cursor-pointer flex-col items-center self-center transition-all hover:scale-110"
            onClick={() => {
              navigator.clipboard.writeText(product.barcode);
              toast({ title: "Barcode copied to clipboard", duration: 2000 });
            }}
          >
            <Barcode
              barcode={product.barcode}
              width={3}
              height={80}
              displayInvalid
              background="transparent"
            />
          </div>
        </div>
        <hr />
        <h3 className="text-lg font-semibold">Attached boxes</h3>
        <AttachedBoxesList boxes={boxes} />
      </div>
      <div className="flex gap-x-4">
        <Button asChild>
          <Link href={`/admin/products/${product.barcode}/edit`}>Edit</Link>
        </Button>
        <ProductDeleteButton product={product} />
      </div>
    </div>
  );
};
