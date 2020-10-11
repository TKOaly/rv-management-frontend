import { errorMessage, successMessage } from './notificationReducer';
import marginService from '../services/globalMarginService';
import productService from '../services/productService';

export const productActions = {
    SET_PRODUCT_SELECTED: 'SET_PRODUCT_SELECTED',
    SELECT_PRODUCT_BY_BARCODE: 'SELECT_PRODUCT_BY_BARCODE',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_GLOBAL_MARGIN: 'SET_GLOBAL_MARGIN',
    ADD_NEW_PRODUCT: 'ADD_NEW_PRODUCT',
    SET_UPGRADESTOCK: 'SET_UPGRADESTOCK',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT'
};

export const initialState = {
    selectedProduct: 0,
    products: [],
    globalMargin: 0,
    upgradeStock: false
};

export const setGlobalMargin = (newMargin, token) => {
    return async (dispatch) => {
        const margin = await marginService.changeMargin(newMargin, token);
        dispatch({
            type: productActions.SET_GLOBAL_MARGIN,
            globalMargin: margin.margin
        });
    };
};

export const getGlobalMargin = (token) => {
    return async (dispatch) => {
        const margin = await marginService.getMargin(token);
        dispatch({
            type: productActions.SET_GLOBAL_MARGIN,
            globalMargin: margin.margin
        });
    };
};

export const setProductSelected = (id) => {
    return {
        type: productActions.SET_PRODUCT_SELECTED,
        selectedProduct: id
    };
};

export const addProduct = (product, token) => {
    return async (dispatch) => {
        try {
            const addedProduct = await productService.addProduct(
                {
                    name: product.name,
                    barcode: product.barcode,
                    categoryId: product.categoryId,
                    weight: product.weight,
                    buyPrice: product.buyPrice,
                    sellPrice: product.sellPrice,
                    stock: product.stock
                },
                token
            );
            dispatch({
                type: productActions.ADD_NEW_PRODUCT,
                product: addedProduct
            });

            dispatch(successMessage('New product added successfully'));
        } catch (ex) {
            console.log(ex);
            dispatch(errorMessage('Error adding new product'));
        }
    };
};

export const getProducts = (token) => {
    return async (dispatch) => {
        const products = await productService.getAll(token);

        dispatch({
            type: productActions.SET_PRODUCTS,
            products: products.products
        });
    };
};

//redirects from addStock page to product info tab when value is true
export const setUpgradeStock = (value) => {
    return {
        type: productActions.SET_UPGRADESTOCK,
        redirect: value
    };
};

export const updateProduct = (product, token) => {
    return async (dispatch) => {
        try {
            const updatedProduct = await productService.updateProduct(product, token);
            console.log(updatedProduct);
            dispatch(getProducts(token));
            dispatch(successMessage('Tuotteen päivitys onnistui'));
        } catch (err) {
            dispatch(errorMessage('Tuotteen päivitys epäonnistui'));
        }
    };
};

//fix this:now works with updating products by requesting whole productlist from backend
export const addStock = (product, token) => {
    return async (dispatch) => {
        try {
            await productService.addStock(token, product);
            dispatch(successMessage('Buy in completed'));
            dispatch(setUpgradeStock(true));
            dispatch(getProducts(token));
        } catch (error) {
            const errorCode = error.response ? error.response.data.error_code : null;
            switch (errorCode) {
                case 'bad_request':
                    error.response.data.errors.forEach((message) => {
                        dispatch(errorMessage(message));
                    });
                    break;
                case 'product_not_found':
                    dispatch(errorMessage('product_not_found from database'));
                    break;
                case 'internal_error':
                    dispatch(errorMessage('internal_error / Database is not running or connected'));
                    break;
                default:
                    dispatch(errorMessage('Unknown error has occuered'));
                    break;
            }
        }
    };
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productActions.SET_PRODUCTS:
            return Object.assign({}, state, { products: action.products });
        case productActions.SET_GLOBAL_MARGIN:
            return Object.assign({}, state, {
                globalMargin: action.globalMargin
            });
        case productActions.SET_PRODUCT_SELECTED:
            return Object.assign({}, state, {
                selectedProduct: action.selectedProduct
            });
        case productActions.ADD_NEW_PRODUCT:
            return Object.assign({}, state, {
                products: [...state.products, action.product]
            });
        case productActions.SET_UPGRADESTOCK:
            return Object.assign({}, state, {
                upgradeStock: action.redirect
            });
        default:
            return state;
    }
};

export default productReducer;
