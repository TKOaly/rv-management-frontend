import axios from "axios";

const targetUrl = "api/v1/admin/preferences/globalDefaultMargin";

type getMarginRequest = (token: string) => Promise<number>;

const getMargin: getMarginRequest = (token) => {
  return axios
    .get(`${process.env.RV_BACKEND_URL}/${targetUrl}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data.preference.value);
};

type changeMarginRequest = (
  newMargin: number,
  token: string,
) => Promise<number>;

const changeMargin: changeMarginRequest = (newMargin, token) => {
  return axios(`${process.env.RV_BACKEND_URL}/${targetUrl}`, {
    method: "PUT",
    headers: { Authorization: "Bearer " + token },
    data: {
      margin: newMargin,
    },
  }).then((res) => res.data.preference.value);
};

export default { getMargin, changeMargin };
