import { Header } from '../components/sections/Header';
import { HeaderNav } from '../components/sections/HeaderNav';
import { mount, shallow } from 'enzyme';
import HeaderUser from '../components/sections/HeaderUser';
import React from 'react';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    mount(<Header />);
    const header = renderer.create(<Header />).toJSON();
    expect(header).toMatchSnapshot();
});

it('does not render navigation and user info when not logged in', () => {
    const header = mount(<Header />);
    expect(header.find(HeaderNav).length).toBe(0);
    expect(header.find(HeaderUser).length).toBe(0);

    const header2 = renderer.create(<Header />).toJSON();
    expect(header2).toMatchSnapshot();
});

it('renders navigation and user info when logged in', () => {
    const header = shallow(<Header isAuthenticated={true} />);
    expect(header.find(HeaderNav).length).toBe(1);
    expect(header.find(HeaderUser).length).toBe(1);
});
