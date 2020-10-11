import './styles/LoginPage.scss';
import { Col, Row } from 'react-flexbox-grid';
import { Redirect } from 'react-router-dom';
import { SuccessBtn } from '../buttons/Buttons';
import { authenticate } from '../../reducers/authenticationReducer';
import { connect } from 'react-redux';
import React from 'react';

class LoginPage extends React.Component {
    componentDidMount = () => {
        !this.props.isAuthenticated && this.usernameInput.focus();
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.authenticate(this.usernameInput.value, this.passwordInput.value);
    };

    render = () => {
        if (this.props.isAuthenticated) {
            // redirect to root if referrer isn't set in router
            const redirectPath = this.props.location.state ? this.props.location.state.from.pathname : '/';

            return <Redirect to={redirectPath} />;
        }

        return (
            <div className="login-page">
                <Row around="xs">
                    <Col xs={12} md={6} lg={4}>
                        <h1>Kirjaudu sisään</h1>
                        <form method="post" onSubmit={this.onSubmit}>
                            <label htmlFor="username">Käyttäjätunnus</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                ref={(input) => {
                                    this.usernameInput = input;
                                }}
                            />
                            <label htmlFor="password">Salasana</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                ref={(input) => {
                                    this.passwordInput = input;
                                }}
                            />
                            <SuccessBtn onClick={this.onSubmit}>Kirjaudu sisään</SuccessBtn>
                        </form>
                    </Col>
                </Row>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    };
};

const mapDispatchToProps = {
    authenticate
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
