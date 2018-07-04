import productMarginService from '../services/productMarginService';

export const productMarginActions = {
    SET_PRODUCT_MARGIN: 'SET_PRODUCT_MARGIN',
    FETCH_PRODUCT_MARGIN: 'FETCH_PRODUCT_MARGIN'
};

export const initialState = {
    productMargin: null
};

export const fetchProductMargin = (productMargin) => {
    return async (dispatch) => {
        const res = await productMarginService.getProductMargin();
        dispatch(setProductMargin(res.productMargin));
    };
};

export const setProductMargin = (productMargin) => {
    return {
        type: productMarginActions.SET_PRODUCT_MARGIN,
        productMargin: productMargin
    };
};

const productMarginReducer = (state = initialState, action) => {
    switch (action.type) {
        case productMarginActions.SET_PRODUCT_MARGIN:
            return Object.assign({}, state, {
                productMargin: action.productMargin
            });
        default:
            return state;
    }
};

export default productMarginReducer;
