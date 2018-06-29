import categoryService from './../services/categoryService';

const initialState = {
    categories: []
};

export const categoryActions = {
    SET_CATEGORIES: 'SET_CATEGORIES'
};

export const getCategories = (token) => {
    return async (dispatch) => {
        const categories = await categoryService.getAll(token);
        dispatch({
            type: categoryActions.SET_CATEGORIES,
            categories
        });
    };
};

export default (state = initialState, action) => {
    switch (action.type) {
        case categoryActions.SET_CATEGORIES:
            return Object.assign({}, state, { categories: action.categories });
        default:
            return state;
    }
};
