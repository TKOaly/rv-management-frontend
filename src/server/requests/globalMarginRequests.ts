"use server";

import { authenticated } from "../wrappers";

const targetUrl = "api/v1/admin/preferences/globalDefaultMargin";

type MarginResponse = {
  preference: {
    key: "globalDefaultMargin";
    value: number;
  };
};

export const getMargin = async () => {
  return await authenticated<MarginResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "GET",
    },
  ).then((data) => data.preference.value);
};

export const changeMargin = async (newMargin: number) => {
  return await authenticated<MarginResponse>(
    `${process.env.RV_BACKEND_URL}/${targetUrl}`,
    {
      method: "PUT",
    },
    {
      margin: newMargin,
    },
  ).then((data) => data.preference.value);
};
