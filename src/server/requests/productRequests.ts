"use server";

import { authenticated } from "../wrappers";
import { QueryKeys } from "./queryKeys";

const targetUrl = "api/v1/admin/products";

export type Product = {
  barcode: string;
  name: string;
  category: {
    categoryId: number;
    description: string;
  };
  sellPrice: number;
  stock: number;
  buyPrice: number;
};

export type getAllProductsResponse = {
  products: Product[];
};

export async function getAllProducts() {
  return await authenticated<getAllProductsResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "GET",
    },
  ).then((data) => data.products);
}

export async function getProduct(barcode: string) {
  return await authenticated<{ product: Product }>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}/${barcode}`,
    {
      method: "GET",
      next: {
        tags: [QueryKeys.products],
      },
    },
  ).then((data) => data.product);
}

export type addProductRequest = {
  barcode: string;
  name: string;
  categoryId: number;
  buyPrice: number;
  sellPrice: number;
  stock: number;
};

type addProductResponse = {
  product: Product;
};

export const addProduct = (product: addProductRequest) => {
  return authenticated<addProductResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "POST",
    },
    product,
  ).then((data) => data.product);
};

type updateProductRequest = {
  barcode: string;
  name?: string;
  categoryId?: number;
  buyPrice?: number;
  sellPrice?: number;
  stock?: number;
};

type updateProductResponse = {
  product: Product;
};

export const updateProduct = (product: updateProductRequest) => {
  return authenticated<updateProductResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}/${product.barcode}`,
    {
      method: "PATCH",
    },
    { ...product, barcode: undefined },
  ).then((data) => data.product);
};

type addStockRequest = {
  barcode: string;
  buyPrice: number;
  sellPrice: number;
  count: number;
};

export type addStockResponse = Omit<Product, "category" | "name">;

export const addStock = (product: addStockRequest) => {
  return authenticated<addStockResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}/${product.barcode}/buyIn`,
    {
      method: "POST",
    },
    {
      count: product.count,
      buyPrice: product.buyPrice,
      sellPrice: product.sellPrice,
    },
  ).then((data) => data);
};

type deleteProductResponse = {
  deletedProduct: Product;
};

export const deleteProduct = (barcode: string) => {
  return authenticated<deleteProductResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}/${barcode}`,
    {
      method: "DELETE",
    },
  ).then((data) => data.deletedProduct);
};
