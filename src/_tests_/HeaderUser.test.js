import { HeaderUser } from '../components/sections/HeaderUser';
import { mount, shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    shallow(<HeaderUser />);
    const header = renderer.create(<HeaderUser />).toJSON();
    expect(header).toMatchSnapshot();
});

it('contains user information', () => {
    expect(shallow(<HeaderUser />).find('.header-user').length).toBe(1);
    const header = renderer.create(<HeaderUser />).toJSON();
    expect(header).toMatchSnapshot();
});
