"use server";

import { z } from "zod";

const addProductSchema = z.object({
  barcode: z.string(),
  name: z.string(),
  categoryId: z.number(),
  weight: z.number(),
  sellPrice: z.number(),
  stock: z.number(),
});

export type AddProduct = z.infer<typeof addProductSchema>;
