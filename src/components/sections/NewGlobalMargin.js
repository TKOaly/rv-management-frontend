import { connect } from 'react-redux';
import { setGlobalMargin } from '../../reducers/productReducer';
import React from 'react';

class NewGlobalMargin extends React.Component {
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

const mapStateToProps = (state) => {
    return {
        token: state.authentication.accessToken,
        globalMargin: state.product.globalMargin
    };
};

const mapDispatchToProps = {
    setGlobalMargin
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGlobalMargin);
