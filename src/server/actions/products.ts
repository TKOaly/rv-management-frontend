"use server";

import { getAllCategories } from "@/server/requests/categoryRequests";
import { addProduct, addStock } from "@/server/requests/productRequests";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { QueryKey } from "../requests/queryKeys";

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

export async function addProductAction(
  _prevState: unknown,
  formData: FormData,
) {
  "use server";

  const { barcode, name, categoryId, weight } = Object.fromEntries(
    formData.entries(),
  );

  const rawData = {
    barcode,
    name,
    categoryId: parseInt(categoryId as string),
    weight: parseInt(weight as string),
    buyPrice: 0,
    sellPrice: 0,
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
    return { success: false, error: validatedData.error.flatten().fieldErrors };
  }

  try {
    const newProduct = await addProduct(validatedData.data);
    revalidateTag(QueryKey.products);
    return {
      success: true,
      newProduct: newProduct,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to add product",
    };
  }
}

export async function buyInProductAction(
  _prevState: unknown,
  formData: FormData,
) {
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
    return { success: false, error: validatedData.error.flatten().fieldErrors };
  }

  try {
    const newStock = await addStock(validatedData.data);
    revalidateTag(QueryKey.products);
    return { success: true, newStock: newStock, error: null };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add stock" };
  }
}
