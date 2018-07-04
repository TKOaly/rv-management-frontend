import { BasicBtn, DangerBtn, SuccessBtn } from '../components/buttons/Buttons';
import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

it('renders buttons without crashing', () => {
    mount(<BasicBtn />);
    mount(<SuccessBtn />);
    mount(<DangerBtn />);

    // Snapshot tests
    const basicBtnTree = renderer.create(<BasicBtn />).toJSON();
    expect(basicBtnTree).toMatchSnapshot();
    const successBtnTree = renderer.create(<SuccessBtn />).toJSON();
    expect(successBtnTree).toMatchSnapshot();
    const dangerBtnTree = renderer.create(<DangerBtn />).toJSON();
    expect(dangerBtnTree).toMatchSnapshot();
});
