import './styles/Header.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import HeaderUser from './HeaderUser';
import React, { Component } from 'react';

export class Header extends Component {
    render = () => {
        return (
            <header className="topheader">
                <div className="header-title">
                    <h1>RV management</h1>
                </div>
                {this.props.isAuthenticated && <HeaderNav />}
                {this.props.isAuthenticated && <HeaderUser />}
            </header>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
};

export default withRouter(connect(mapStateToProps)(Header));
