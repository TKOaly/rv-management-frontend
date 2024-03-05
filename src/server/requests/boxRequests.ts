import axios from "axios";
import { authenticated } from "../wrappers";
import { Product } from "./productRequests";

const targetUrl = "api/v1/admin/boxes";

export type Box = {
  boxBarcode: string;
  itemsPerBox: number;
  product: Omit<Product, "buyPrice">;
};

export type getAllBoxesResponse = {
  boxes: Box[];
};

export async function getAllBoxes() {
  return await authenticated<getAllBoxesResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "GET",
    },
  ).then((data) => data.boxes);
}

type createBoxRequest = (
  token: string,
  boxBarcode: string,
  itemsPerBox: number,
  productBarcode: string,
) => Promise<{
  boxBarcode: string;
  itemsPerBox: number;
  product: {
    barcode: string;
    name: string;
    category: {
      categoryId: number;
      description: string;
    };
    weight: number;
    sellPrice: number;
    stock: number;
  };
}>;

const createBox: createBoxRequest = (
  token,
  boxBarcode,
  itemsPerBox,
  productBarcode,
) => {
  return axios(`${process.env.RV_BACKEND_URL}/${targetUrl}`, {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
    data: {
      itemsPerBox,
      boxBarcode,
      productBarcode,
    },
  }).then((res) => res.data.box);
};

type buyInBoxRequest = (
  token: string,
  barcode: string,
  boxCount: number,
  productBuyPrice: number,
  productSellPrice: number,
) => Promise<{
  boxBarcode: string;
  itemsPerBox: number;
  product: {
    barcode: string;
    name: string;
    category: {
      categoryId: number;
      description: string;
    };
    weight: number;
    sellPrice: number;
    stock: number;
  };
}>;

const buyInBox: buyInBoxRequest = (
  token,
  barcode,
  boxCount,
  productBuyPrice,
  productSellPrice,
) => {
  return axios(`${process.env.RV_BACKEND_URL}/${targetUrl}/${barcode}/buyIn`, {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
    data: {
      boxCount,
      productBuyPrice,
      productSellPrice,
    },
  }).then((res) => res.data);
};

export default {
  getAll: getAllBoxes,
  createBox,
  buyInBox,
};
