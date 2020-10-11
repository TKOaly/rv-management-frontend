import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import HeaderUser from '../components/sections/HeaderUser';
import React from 'react';
import renderer from 'react-test-renderer';
import createMockStore from 'redux-mock-store';

const withRouter = (child) => <MemoryRouter>{child}</MemoryRouter>;
const mockStore = createMockStore()();

describe('<HeaderSuser />', () => {
    let context;

    beforeEach(() => {
        context = mount(
            <MemoryRouter>
                <HeaderUser store={mockStore} />
            </MemoryRouter>
        );
    });

    it('renders without crashing', () => {
        const header = renderer.create(context).toJSON();
        expect(header).toMatchSnapshot();
    });

    it('contains user information', () => {
        expect(context.find('.header-user').length).toBe(1);
    });
});
