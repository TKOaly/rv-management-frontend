"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./page";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category.description",
    header: "Category",
  },
  {
    accessorKey: "barcode",
    header: () => <div className="text-right">Barcode</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.original.barcode}</div>;
    },
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => {
      return <div>{row.original.weight} g</div>;
    },
  },
  {
    accessorKey: "buyPrice",
    header: () => <div className="text-right">Buy Price</div>,
    cell: ({ row }) => {
      const price = row.original.buyPrice;
      const formattedPrice = new Intl.NumberFormat("fi-FI", {
        style: "currency",
        currency: "EUR",
      }).format(price / 100);
      return <div className="text-right font-medium">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "sellPrice",
    header: () => <div className="text-right">Sell Price</div>,
    cell: ({ row }) => {
      const price = row.original.sellPrice;
      const formattedPrice = new Intl.NumberFormat("fi-FI", {
        style: "currency",
        currency: "EUR",
      }).format(price / 100);
      return <div className="text-right font-medium">{formattedPrice}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-right">Stock</div>,
    cell: ({ row }) => {
      return (
        <div
          className={`text-right font-semibold ${
            row.original.stock < 0 ? "text-red-500" : ""
          }`}
        >
          {row.original.stock} pcs
        </div>
      );
    },
  },
];
