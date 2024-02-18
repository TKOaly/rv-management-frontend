import axios from "axios";

const targetUrl = "api/v1/admin/products";

type getAllProductsRequest = (token: string) => Promise<
  {
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
  }[]
>;

const getAll: getAllProductsRequest = (token) => {
  return axios
    .get(`${process.env.RV_BACKEND_URL}/${targetUrl}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data.products);
};

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

const addProduct: addProductRequest = (product, token) => {
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

const updateProduct: updateProductRequest = (product, token) => {
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

const addStock: addStockRequest = (token, product) => {
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

export default {
  getAll,
  addProduct,
  updateProduct,
  addStock,
};
