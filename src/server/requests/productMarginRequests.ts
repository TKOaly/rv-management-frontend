const productMargin = {
  productMargin: 1.08,
};

type getProductMarginPromise = () => Promise<{
  productMargin: number;
}>;

const getProductMargin: getProductMarginPromise = async () => {
  return new Promise((resolve) => resolve(productMargin));
};

export default {
  getProductMargin,
};
