import { HeaderNav } from '../components/sections/HeaderNav';
import { mount, shallow } from 'enzyme';
import React from 'react';

it('renders without crashing', () => {
    shallow(<HeaderNav />);
});

it('contains navigation menu', () => {
    expect(shallow(<HeaderNav />).find('.header-nav').length).toBe(1);
});
