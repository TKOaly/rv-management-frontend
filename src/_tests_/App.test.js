import './__mocks__/storageMock';
import { App } from '../App';
import { Provider } from 'react-redux';
import { mount, render, shallow } from 'enzyme';
import Header from '../components/sections/Header';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([])({
    authentication: {
        isAuthenticated: false
    }
});

describe('<App/>', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={mockStore}>
                <App />
            </Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('contains a header', () => {
        expect(
            shallow(
                <Provider store={mockStore}>
                    <App />
                </Provider>
            ).contains(<Header />)
        );
    });
});
