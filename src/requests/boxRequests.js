import axios from "axios";

const targetUrl = "api/v1/admin/boxes";

const getAll = (token) => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data.boxes);
};

const createBox = (token, barcode, productCount, product) => {
  return axios(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`, {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
    data: {
      itemsPerBox: productCount,
      boxBarcode: barcode,
      productBarcode: product,
    },
  }).then((res) => res.data.box);
};

const buyInBox = (
  token,
  barcode,
  boxCount,
  productBuyPrice,
  productSellPrice,
) => {
  return axios(
    `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/${barcode}/buyIn`,
    {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      data: {
        boxCount,
        productBuyPrice,
        productSellPrice,
      },
    },
  ).then((res) => res.data);
};

export default {
  getAll,
  createBox,
  buyInBox,
};
