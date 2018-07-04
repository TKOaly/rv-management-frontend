import { ProductList } from '../components/sections/ProductList';
import { ProductListPage } from '../components/pages/ProductListPage';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import store from '../store';
const mockStore = store;

describe('Product list page', () => {
    it('renders without crashing', () => {
        /* mount(
            <Provider store={mockStore}>
                <ProductListPage />
            </Provider>
        );

        const productList = renderer
            .create(
                <Provider store={mockStore}>
                    <ProductListPage />
                </Provider>
            )
            .toJSON();
        expect(productList).toMatchSnapshot();*/
    });

    it('renders product list', () => {
        /* const page = mount(
            <Provider store={mockStore}>
                <ProductListPage />
            </Provider>
        );
        expect(page.find(ProductList).length).toBe(1);*/
    });
});
