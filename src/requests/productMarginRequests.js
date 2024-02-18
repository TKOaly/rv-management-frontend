const productMargin = {
  productMargin: 1.08,
};

const getProductMargin = async () => {
  return new Promise((resolve) => resolve(productMargin));
};

export default {
  getProductMargin,
};
