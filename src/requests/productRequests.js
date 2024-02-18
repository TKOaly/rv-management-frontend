import axios from "axios";

const targetUrl = "api/v1/admin/products";

const getAll = (token) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data);
};

const addProduct = (product, token) => {
  return axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`,

      product,
      { headers: { Authorization: "Bearer " + token } },
    )
    .then((res) => res.data.product);
};

const updateProduct = (product, token) => {
  return axios
    .patch(
      `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/${product.barcode}`,

      product,
      { headers: { Authorization: "Bearer " + token } },
    )
    .then((res) => res.data.product);
};

const addStock = (token, product) => {
  return axios
    .post(
      `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/${product.barcode}/buyIn`,
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
