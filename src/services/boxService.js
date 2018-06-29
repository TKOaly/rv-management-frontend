import axios from 'axios';

const targetUrl = 'api/v1/admin/boxes';

const getAll = (token) => {
    return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}`, {
            headers: { Authorization: 'Bearer ' + token }
        })
        .then((res) => res.data);
};

const addStock = (barcode, box, token) => {
    return axios
        .post(
            `${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/${barcode}`,
            {
                buyprice: box.buyprice,
                product_id: box.product_id,
                sellprice: box.sellprice,
                boxes: box.boxes
            },
            {
                headers: { Authorization: 'Bearer ' + token }
            }
        )
        .then((res) => res.data);
};

const createBox = (token, barcode, productCount, product) => {
    return axios(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/${barcode}`, {
        method: 'PUT',
        headers: { Authorization: 'Bearer ' + token },
        data: {
            items_per_box: productCount,
            product
        }
    }).then((res) => res.data);
};

const buyInBox = (token, barcode, boxes, buyprice, sellprice) => {
    return axios(`${process.env.REACT_APP_BACKEND_URL}/${targetUrl}/${barcode}`, {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + token },
        data: {
            boxes,
            buyprice,
            sellprice
        }
    }).then((res) => res.data);
};

export default {
    getAll,
    addStock,
    createBox,
    buyInBox
};
