import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { MemoryRouter } from 'react-router';
import { mount, render, shallow } from 'enzyme';
import LoginPage from '../components/pages/LoginPage';
import authenticationReducer, { authenticationSuccess } from '../reducers/authenticationReducer';
import React from 'react';
import ReactDOM from 'react-dom';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const initialState = {
    authentication: {
        isAuthenticating: false,
        isAuthenticated: false,
        accessToken: null,
        authenticationError: null
    }
};

describe('Login page', () => {
    let context;
    let store;

    beforeEach(() => {
        store = createMockStore([thunk])(initialState);
        store.replaceReducer(authenticationReducer);
        context = mount(<LoginPage store={store} />);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoginPage store={store} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('contains a login form', () => {
        expect(context.find('form').length).toBe(1);
    });

    it('contains inputs for username and password', () => {
        expect(context.find('input[name="username"]').length).toBe(1);
        expect(context.find('input[name="password"]').length).toBe(1);
    });

    it('authentication function is called after submitting form', () => {
        const page = mount(<LoginPage store={store} />);
        page.find('form').simulate('submit');

        expect(store.getActions()[0])
            .toMatchObject({
                type: 'SET_AUTHENTICATING',
            });
    });

    it('redirects after successful login', () => {
        store = createMockStore([thunk])({
            authentication: {
                isAuthenticated: true,
            },
        });

        context = mount(
            <MemoryRouter>
                <LoginPage
                    store={store}
                    location={{}} />
            </MemoryRouter>
        );

        expect(context.find(Redirect).length).toBe(1);
    });
});
