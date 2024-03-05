"use server";

import { getAllCategories } from "@/server/requests/categoryRequests";
import { addProduct, addStock } from "@/server/requests/productRequests";
import { z } from "zod";

const getCategoryIdLiterals = async () =>
  getAllCategories().then(
    (categories) =>
      categories.map((category) =>
        z.literal(category.categoryId),
      ) as unknown as readonly [
        z.ZodLiteral<number>,
        z.ZodLiteral<number>,
        ...z.ZodLiteral<number>[],
      ],
  );

export async function addProductAction(formData: FormData) {
  "use server";

  const { barcode, name, categoryId, weight, buyPrice, sellPrice } =
    Object.fromEntries(formData.entries());

  const rawData = {
    barcode,
    name,
    categoryId: parseInt(categoryId as string),
    weight: parseInt(weight as string),
    buyPrice: Math.round(parseFloat(buyPrice as string) * 100),
    sellPrice: Math.round(parseFloat(sellPrice as string) * 100),
    stock: 0,
  };

  const validatedData = z
    .object({
      barcode: z.string().min(1).max(14),
      name: z.string().min(1),
      categoryId: z.union(await getCategoryIdLiterals()),
      weight: z.number().min(0),
      buyPrice: z.number().int(),
      sellPrice: z.number().int(),
      stock: z.number().int(),
    })
    .required()
    .safeParse(rawData);

  if (!validatedData.success) {
    console.error(validatedData.error);
    throw new Error("Invalid form data");
  }

  return await addProduct(validatedData.data);
}

export async function buyInProductAction(formData: FormData) {
  "use server";

  const { barcode, count, buyPrice, sellPrice } = Object.fromEntries(
    formData.entries(),
  );

  const rawData = {
    barcode: barcode,
    count: parseInt(count as string),
    buyPrice: Math.round(parseFloat(buyPrice as string) * 100),
    sellPrice: Math.round(parseFloat(sellPrice as string) * 100),
  };

  const validatedData = z
    .object({
      barcode: z.string().min(1).max(14),
      count: z.number().int().min(1),
      buyPrice: z.number().int(),
      sellPrice: z.number().int(),
    })
    .required()
    .safeParse(rawData);

  if (!validatedData.success) {
    console.error(validatedData.error);
    return validatedData.error.flatten().fieldErrors;
  }

  return await addStock(validatedData.data);
}
