import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setGlobalMargin } from '../../reducers/productReducer';

export class NewGlobalMargin extends Component {
    render = () => {
        return (
            <div>
                Set a new global profit margin.
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.props.setGlobalMargin(this.input.value, this.props.token);
                    }}
                >
                    <input type="number" placeholder={this.props.globalMargin} ref={(input) => (this.input = input)} />
                </form>
            </div>
        );
    };
}

const mapDispatchToProps = {
    setGlobalMargin
};

const mapStateToProps = (state) => {
    return {
        token: state.authentication.accessToken,
        globalMargin: state.product.globalMargin
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGlobalMargin);
