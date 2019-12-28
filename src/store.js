import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import authenticationReducer from './reducers/authenticationReducer';
import barcodeListenerReducer from './reducers/barcodeListenerReducer';
import boxReducer from './reducers/boxReducer';
import categoryReducer from './reducers/categoryReducer';
import notificationReducer from './reducers/notificationReducer';
import productFilterReducer from './reducers/productFilterReducer';
import productMarginReducer from './reducers/productMarginReducer';
import productReducer from './reducers/productReducer';
import thunk from 'redux-thunk';

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
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
