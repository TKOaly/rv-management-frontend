import './styles/HeaderUser.scss';
import { DangerBtn } from '../buttons/Buttons';
import { connect } from 'react-redux';
import { logout } from '../../reducers/authenticationReducer';
import React from 'react';

class HeaderUser extends React.Component {
    render = () => {
        return (
            <div className="header-user">
                <DangerBtn small onClick={this.props.logout}>
                    Kirjaudu ulos
                </DangerBtn>
            </div>
        );
    };
}

const mapDispatchToProps = {
    logout
};

export default connect(null, mapDispatchToProps)(HeaderUser);
