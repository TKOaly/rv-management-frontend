import axios from "axios";

const targetUrl = "api/v1/admin/boxes";

const getAll = (token: string) => {
  return axios
    .get(`${process.env.RV_BACKEND_URL}/${targetUrl}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data.boxes);
};

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
  getAll,
  createBox,
  buyInBox,
};
