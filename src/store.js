import authenticationReducer from './reducers/authenticationReducer';
import productReducer from './reducers/productReducer';
import productMarginReducer from './reducers/productMarginReducer';
import productFilterReducer from './reducers/productFilterReducer';
import notificationReducer from './reducers/notificationReducer';
import boxReducer from './reducers/boxReducer';
import { reducer as formReducer } from 'redux-form';
import barcodeListenerReducer from './reducers/barcodeListenerReducer';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoryReducer from './reducers/categoryReducer';

// Combine reducers
const reducer = combineReducers({
    authentication: authenticationReducer,
    product: productReducer,
    productMargin: productMarginReducer,
    productFilter: productFilterReducer,
    notification: notificationReducer,
    box: boxReducer,
    form: formReducer,
    category: categoryReducer,
    barcodeListener: barcodeListenerReducer
});

// Create store
const middleware = [thunk];
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(...middleware)
);

export default store;
