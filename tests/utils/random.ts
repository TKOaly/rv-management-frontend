export const getRandomBarcode = async () => {
  return Math.floor(Math.random() * 1000000000).toString();
};

export const getRandomName = async () => {
  return Math.random().toString(36).substring(12);
};
