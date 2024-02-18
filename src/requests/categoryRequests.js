import axios from "axios";

const targetUrl = "api/v1/categories";

const getAll = (token) => {
  return axios
    .get(`${process.env.RV_BACKEND_URL}/${targetUrl}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data.categories);
};

export default {
  getAll,
};
