export const getRandomBarcode = async () => {
  return Math.floor(Math.random() * 1000000000).toString();
};
