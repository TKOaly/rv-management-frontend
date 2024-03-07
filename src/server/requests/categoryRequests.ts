"use server";

import { authenticated } from "../wrappers";

const targetUrl = "api/v1/categories";

type categoriesRequest = {
  categories: { categoryId: number; description: string }[];
};

export async function getAllCategories() {
  return await authenticated<categoriesRequest>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "GET",
    },
  ).then((data) => data.categories);
}
