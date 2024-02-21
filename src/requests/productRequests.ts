"use server";

import axios from "axios";
import { authenticated } from "./wrappers";

const targetUrl = "api/v1/admin/products";

export type getAllProductsRequest = {
  products: {
    barcode: string;
    name: string;
    category: {
      categoryId: number;
      description: string;
    };
    weight: number;
    sellPrice: number;
    stock: number;
    buyPrice: number;
  }[];
};

export async function getAll() {
  return await authenticated<getAllProductsRequest>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "GET",
    },
  ).then((data) => data.products);
}

type addProductRequest = (
  product: {
    barcode: string;
    name: string;
    categoryId: number;
    weight: number;
    sellPrice: number;
    stock: number;
  },
  token: string,
) => Promise<{
  barcode: string;
  name: string;
  category: {
    categoryId: number;
    description: string;
  };
  weight: number;
  sellPrice: number;
  stock: number;
  buyPrice: number;
}>;

export const addProduct: addProductRequest = (product, token) => {
  return axios
    .post(
      `${process.env.RV_BACKEND_URL}/${targetUrl}`,

      product,
      { headers: { Authorization: "Bearer " + token } },
    )
    .then((res) => res.data.product);
};

type updateProductRequest = (
  product: {
    barcode: string;
    name: string;
    categoryId: number;
    weight: number;
    sellPrice: number;
    stock: number;
  },
  token: string,
) => Promise<{
  barcode: string;
  name: string;
  category: {
    categoryId: number;
    description: string;
  };
  weight: number;
  sellPrice: number;
  stock: number;
  buyPrice: number;
}>;

export const updateProduct: updateProductRequest = (product, token) => {
  return axios
    .patch(
      `${process.env.RV_BACKEND_URL}/${targetUrl}/${product.barcode}`,

      product,
      { headers: { Authorization: "Bearer " + token } },
    )
    .then((res) => res.data.product);
};

type addStockRequest = (
  token: string,
  product: {
    barcode: string;
    buyPrice: number;
    sellPrice: number;
    count: number;
  },
) => Promise<{
  barcode: string;
  name: string;
  category: {
    categoryId: number;
    description: string;
  };
  stock: number;
  buyPrice: number;
  sellPrice: number;
}>;

export const addStock: addStockRequest = (token, product) => {
  return axios
    .post(
      `${process.env.RV_BACKEND_URL}/${targetUrl}/${product.barcode}/buyIn`,
      {
        buyPrice: product.buyPrice,
        sellPrice: product.sellPrice,
        count: product.count,
      },
      {
        headers: { Authorization: "Bearer " + token },
      },
    )
    .then((res) => res.data);
};
