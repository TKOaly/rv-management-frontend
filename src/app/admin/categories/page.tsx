"use server";

import ViewContainer from "@/components/ViewContainer";
import ViewTitle from "@/components/ViewTitle";
import { getAllCategories } from "@/server/requests/categoryRequests";
import CategoryTable from "./CategoryTable";

export default async function Categories() {
  const categories = await getAllCategories();

  return (
    <ViewContainer>
      <ViewTitle>Categories</ViewTitle>
      <CategoryTable categories={categories} />
    </ViewContainer>
  );
}
