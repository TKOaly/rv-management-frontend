import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SuccessBtn } from './../buttons/Buttons';
import { setProductSelected } from '../../reducers/productReducer';
import { setBarcode, toggleBarcodeVisibility, clearBarcode } from '../../reducers/barcodeListenerReducer';
import { errorMessage } from '../../reducers/notificationReducer';
import { withRouter } from 'react-router-dom';

export class BarcodeListener extends Component {
    handleInputEvent = (event) => {
        this.props.setBarcode(event.target.value);
    };

    handleSubmit = (event) => {
        event.preventDefault();
        var product = this.props.products.find((prod) => prod.product_barcode === this.props.barcode);
        if (product) {
            this.props.setProductSelected(product.product_id);
            this.props.history.push(`/products/${product.product_id}/stock`);
        } else {
            var box = this.props.boxes.find((b) => b.box_barcode === this.props.barcode);
            if (box) {
                this.props.setProductSelected(box.product_id);
                this.props.history.push(`/products/${box.product_id}/box`);
            } else {
                if (window.confirm('Not found.\nWant to create a new item?')) {
                    if (window.confirm('Create a box?')) {
                        this.props.history.push('/products/create/box');
                    } else {
                        this.props.history.push('/products/create/product');
                    }
                } else {
                    this.props.errorMessage('Product not found');
                }
            }
        }
        this.props.clearBarcode();
    };

    handleOpen = (event) => {
        this.props.clearBarcode();
        this.props.toggleBarcodeVisibility(true);
    };

    render = () => {
        return (
            <React.Fragment>
                {this.props.barcodeVisible && (
                    <form onSubmit={(event) => this.handleSubmit(event)}>
                        <input
                            id="barcodeInput"
                            style={{
                                paddingLeft: 16,
                                paddingRight: 16,
                                paddingTop: 11,
                                paddingBottom: 11,
                                fontSize: 16,
                                textAlign: 'center',
                                display: 'inlineBlock'
                            }}
                            ref={(input) => {
                                input && input.focus();
                            }}
                            value={this.props.barcode}
                            placeholder="Lue viivakoodi"
                            pattern="\d*"
                            onChange={(event) => this.handleInputEvent(event)}
                        />
                        <SuccessBtn onClick={(event) => this.handleSubmit(event)} type="button">
                            Hae
                        </SuccessBtn>
                    </form>
                )}
                {this.props.barcodeVisible || (
                    <SuccessBtn onClick={(event) => this.handleOpen(event)}>Lue viivakoodi</SuccessBtn>
                )}
            </React.Fragment>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        products: state.product.products,
        boxes: state.box.boxes,
        barcode: state.barcodeListener.barcode,
        barcodeVisible: state.barcodeListener.visible
    };
};

const mapDispatchToProps = {
    setProductSelected,
    errorMessage,
    setBarcode,
    clearBarcode,
    toggleBarcodeVisibility
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BarcodeListener));
