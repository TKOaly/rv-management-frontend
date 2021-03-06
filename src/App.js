import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { authenticationSuccess } from './reducers/authenticationReducer';
import { connect } from 'react-redux';
import Header from './components/sections/Header';
import LoginPage from './components/pages/LoginPage';
import NotificationDrawer from './components/sections/NotificationDrawer';
import ProductListPage from './components/pages/ProductListPage';
import React from 'react';
import store from './store';

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

class App extends React.Component {
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
