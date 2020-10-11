import HeaderNav from '../components/sections/HeaderNav';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import React from 'react';

const withRouter = (child) => (
    <MemoryRouter initialEntries={['/']}>
        {child}
    </MemoryRouter>
);

it('renders without crashing', () => {

    mount(
        <MemoryRouter>
            <HeaderNav />
        </MemoryRouter>
    );
});

it('contains navigation menu', () => {
    expect(mount(withRouter(<HeaderNav />)).find('.header-nav').length).toBe(1);
});
