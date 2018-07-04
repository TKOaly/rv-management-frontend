import './styles/HeaderUser.css';
import { DangerBtn } from '../buttons/Buttons';
import { connect } from 'react-redux';
import { logout } from '../../reducers/authenticationReducer';
import React, { Component } from 'react';

export class HeaderUser extends Component {
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
