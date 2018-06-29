export const productFilterActions = {
    SORT_BY_VALUE: 'SORT_BY_VALUE'
};

export const productFilterType = {
    NONE: 'NONE',
    NAME_ASC: 'SORT_NAME_ASC',
    NAME_DESC: 'SORT_NAME_DESC',
    STOCK_LOW: 'SORT_STOCK_LOW',
    STOCK_HIGH: 'SORT_STOCK_HIGH'
};

export const initialState = {
    sortedBy: productFilterType.NAME_ASC
};

export const sortByValue = (value) => {
    return {
        type: productFilterActions.SORT_BY_VALUE,
        value
    };
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case productFilterActions.SORT_BY_VALUE:
            return Object.assign({}, state, {
                sortedBy: action.value
            });
        default:
            return state;
    }
};

export default filterReducer;
