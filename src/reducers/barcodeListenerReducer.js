export const barcodeListenerActions = {
    SET_BARCODE: 'SET_BARCODE',
    CLEAR_BARCODE: 'CLEAR_BARCODE',
    TOGGLE_BARCODE_VISIBILITY: 'TOGGLE_BARCODE_VISIBILITY'
};

export const initialState = {
    barcode: '',
    visible: true
};

export const toggleBarcodeVisibility = (value) => {
    return {
        type: barcodeListenerActions.TOGGLE_BARCODE_VISIBILITY,
        value: value
    };
};

export const setBarcode = (barcode) => {
    return {
        type: barcodeListenerActions.SET_BARCODE,
        barcode: barcode
    };
};

export const clearBarcode = () => {
    return {
        type: barcodeListenerActions.CLEAR_BARCODE
    };
};

const barcodeListenerReducer = (state = initialState, action) => {
    switch (action.type) {
        case barcodeListenerActions.SET_BARCODE:
            return Object.assign({}, state, { barcode: action.barcode });
        case barcodeListenerActions.CLEAR_BARCODE:
            return Object.assign({}, state, { barcode: '' });
        case barcodeListenerActions.TOGGLE_BARCODE_VISIBILITY:
            return Object.assign({}, state, { visible: action.value });
        default:
            return state;
    }
};

export default barcodeListenerReducer;
