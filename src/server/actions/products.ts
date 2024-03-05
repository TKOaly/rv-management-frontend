"use server";

import { getAllCategories } from "@/server/requests/categoryRequests";
import {
  addProduct,
  addProductRequest,
} from "@/server/requests/productRequests";
import { z } from "zod";

export async function addProductAction(formData: FormData) {
  "use server";

  const categories = await getAllCategories();

  const categoryIdLiterals = categories.map((category) =>
    z.literal(category.categoryId),
  ) as unknown as readonly [
    z.ZodLiteral<number>,
    z.ZodLiteral<number>,
    ...z.ZodLiteral<number>[],
  ];

  const rawProductData: addProductRequest = {
    barcode: formData.get("barcode") as string,
    name: formData.get("name") as string,
    categoryId: parseInt(formData.get("categoryId") as string),
    weight: parseInt(formData.get("weight") as string),
    buyPrice: Math.round(parseFloat(formData.get("buyPrice") as string) * 100),
    sellPrice: Math.round(
      parseFloat(formData.get("sellPrice") as string) * 100,
    ),
    stock: 0,
  };

  const parsedData = z
    .object({
      barcode: z.string().min(1).max(14),
      name: z.string().min(1),
      categoryId: z.union(categoryIdLiterals),
      weight: z.number().min(0),
      sellPrice: z.number().int(),
      buyPrice: z.number().int(),
      stock: z.number().int(),
    })
    .required()
    .safeParse(rawProductData);

  if (!parsedData.success) {
    console.error(parsedData.error);
    throw new Error("Invalid form data");
  }

  return await addProduct(parsedData.data);
}
