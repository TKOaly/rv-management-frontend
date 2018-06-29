import { errorMessage, successMessage } from './notificationReducer';
import { getProducts, setUpgradeStock } from './productReducer';
import boxService from '../services/boxService';

export const boxActions = {
    SET_BOXES: 'SET_BOXES'
};

export const initialState = {
    boxes: []
};

export const getBoxes = (token) => {
    return async (dispatch) => {
        const boxes = await boxService.getAll(token);
        console.log(boxes);
        dispatch({
            type: boxActions.SET_BOXES,
            boxes: boxes
        });
    };
};

export const addStock = (barcode, box, token) => {
    return async (dispatch) => {
        try {
            await boxService.addStock(barcode, box, token);
            dispatch(successMessage('Tuotteen lisäys varastoon onnistui'));
            dispatch(setUpgradeStock(true));
            dispatch(getProducts(token));
            dispatch(getBoxes(token));
        } catch (error) {
            dispatch(errorMessage('Virhe tuotteita lisätessä varastoon'));
        }
    };
};

const boxReducer = (state = initialState, action) => {
    switch (action.type) {
        case boxActions.SET_BOXES:
            return Object.assign({}, state, { boxes: action.boxes });
        default:
            return state;
    }
};

export default boxReducer;
