import React from 'react';
import ReactDOM from 'react-dom';
import { LoginPage } from '../components/pages/LoginPage';
import { shallow, mount, render } from 'enzyme';
import { Redirect } from 'react-router';

describe('Login page', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LoginPage />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('contains a login form', () => {
        expect(mount(<LoginPage />).find('form').length).toBe(1);
    });

    it('contains inputs for username and password', () => {
        expect(mount(<LoginPage />).find('input[name="username"]').length).toBe(1);
        expect(mount(<LoginPage />).find('input[name="password"]').length).toBe(1);
    });

    it('authentication function is called after submitting form', () => {
        const mockAuth = jest.fn();
        const page = mount(<LoginPage authenticate={mockAuth} />);
        page.find('form').simulate('submit');
        expect(mockAuth.mock.calls.length).toBe(1);
    });

    it('redirects after successful login', () => {
        expect(shallow(<LoginPage isAuthenticated={true} location={{}} />).find(Redirect).length).toBe(1);
    });
});
