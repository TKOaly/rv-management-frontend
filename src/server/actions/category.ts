"use server";

import {
  Category,
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/server/requests/categoryRequests";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { QueryKeys } from "../requests/queryKeys";

export const getCategoryIdLiterals = async () =>
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

export async function updateCategoryAction(
  _prevState: unknown,
  formData: FormData,
): Promise<{
  success: boolean;
  updatedCategory?: Category;
  error?: null | string | { [key: string]: string[] };
}> {
  const { categoryId, description } = Object.fromEntries(formData.entries());

  const rawData = {
    categoryId: parseInt(categoryId as string),
    description,
  };

  const validatedData = z
    .object({
      categoryId: z.union(await getCategoryIdLiterals()),
      description: z.string().min(1),
    })
    .required()
    .safeParse(rawData);

  if (!validatedData.success) {
    console.error(validatedData.error);
    return { success: false, error: validatedData.error.flatten().fieldErrors };
  }

  try {
    const updatedCategory = await updateCategory(validatedData.data);
    revalidateTag(QueryKeys.categories);
    return {
      success: true,
      updatedCategory: updatedCategory,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to update category",
    };
  }
}

export async function deleteCategoryAction(categoryId: number) {
  try {
    const response = await deleteCategory(categoryId);
    revalidateTag(QueryKeys.categories);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete category");
  }
}

export async function createCategoryAction(
  _prevState: unknown,
  formData: FormData,
): Promise<{
  success: boolean;
  createdCategory?: Category;
  error?: null | string | { [key: string]: string[] };
}> {
  const { description } = Object.fromEntries(formData.entries());

  const rawData = {
    description,
  };

  const validatedData = z
    .object({
      description: z.string().min(1),
    })
    .required()
    .safeParse(rawData);

  if (!validatedData.success) {
    console.error(validatedData.error);
    return { success: false, error: validatedData.error.flatten().fieldErrors };
  }

  try {
    const createdCategory = await createCategory(validatedData.data);
    revalidateTag(QueryKeys.categories);
    return {
      success: true,
      createdCategory: createdCategory,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to create category",
    };
  }
}
