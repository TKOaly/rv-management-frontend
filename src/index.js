import './index.css';
import './reset.css';
import { Provider } from 'react-redux';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';

// redux store
import store from './store';

// Load config
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
