import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProductListPage from './components/pages/ProductListPage';
import LoginPage from './components/pages/LoginPage';
import Header from './components/sections/Header';
import store from './store';
import { authenticationSuccess } from './reducers/authenticationReducer';
import NotificationDrawer from './components/sections/NotificationDrawer';

const isAuthenticated = () => {
    const loggedIn = store.getState().authentication.isAuthenticated;

    // try to load token from storage and log in
    if (!loggedIn) {
        const token = window.sessionStorage.getItem('rvadmintoken');

        // log in if token is found in session storage
        if (token) {
            store.dispatch(authenticationSuccess(token));
            return true;
        }
    } else {
        return true;
    }

    return false;
};

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            return isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            );
        }}
    />
);

export class App extends Component {
    render = () => {
        return (
            <Router>
                <div className="app">
                    <NotificationDrawer notifications={this.props.notifications} products={[]} />
                    <Header />
                    <AuthenticatedRoute exact path="/" component={(props) => <Redirect to="/products" />} />
                    <AuthenticatedRoute path="/products" component={ProductListPage} />
                    <Route path="/login" component={LoginPage} />
                </div>
            </Router>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        notifications: state.notification.notifications
    };
};

export default connect(mapStateToProps)(App);
