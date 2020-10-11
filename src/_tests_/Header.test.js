import Header from '../components/sections/Header';
import HeaderNav from '../components/sections/HeaderNav';
import { mount, shallow } from 'enzyme';
import HeaderUser from '../components/sections/HeaderUser';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
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

describe('<Header />', () => {
    let store;
    let context;

    beforeEach(() => {
        store = createMockStore([thunk])(initialState);

        context = mount(
            <MemoryRouter>
                <Header store={store} />
            </MemoryRouter>
        );
    });

    it('renders without crashing', () => {
        const header = renderer.create(context).toJSON();
        expect(header).toMatchSnapshot();
    });

    it('does not render navigation and user info when not logged in', () => {
        expect(context.find(HeaderNav).length).toBe(0);
        expect(context.find(HeaderUser).length).toBe(0);
    });

    it('renders navigation and user info when logged in', () => {
        store = createMockStore([thunk])({
            authentication: {
                isAuthenticated: true,
            },
        });

        context = mount(
            <MemoryRouter>
                <Provider store={store}>
                    <Header />
                </Provider>
            </MemoryRouter>
        );

        console.log(context.debug());

        expect(context.find('.header-nav').length).toBe(1);
        expect(context.find('.header-user').length).toBe(1);
    });
});
