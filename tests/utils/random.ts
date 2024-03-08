import { randomBytes } from "crypto";

export const getRandomBarcode = async () => {
  return Math.floor(Math.random() * 1000000000).toString();
};

export const getRandomName = async () => {
  return randomBytes(8).toString("hex");
};
