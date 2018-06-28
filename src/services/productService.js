import axios from 'axios';

const targetUrl = 'api/v1/admin/products';

const getAll = token => {
    return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`, {
            headers: { Authorization: 'Bearer ' + token }
        })
        .then(res => res.data);
};

const addProduct = (product, token) => {
    return axios
        .post(
            `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`,

            product,
            { headers: { Authorization: 'Bearer ' + token } }
        )
        .then(res => res.data);
};

const updateProduct = (product, token) => {
    return axios
        .put(
            `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/product/${
                product.itemid
            }`,

            product,
            { headers: { Authorization: 'Bearer ' + token } }
        )
        .then(res => res.data);
};

const addStock = (token, product) => {
    return axios
        .post(
            `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/product/${
                product.id
            }`,
            {
                buyprice: product.buyprice,
                margin: product.margin,
                sellprice: product.sellprice,
                quantity: product.quantity
            },
            {
                headers: { Authorization: 'Bearer ' + token }
            }
        )
        .then(
            res =>
                (product = {
                    ...res.data,
                    buyprice: res.data.buyprice,
                    sellprice: res.data.sellprice
                })
        );
};

export default {
    getAll,
    addProduct,
    updateProduct,
    addStock
};
