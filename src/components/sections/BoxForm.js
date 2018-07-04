import './styles/ProductForm.css';
import { Col, Row } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { errorMessage, successMessage } from '../../reducers/notificationReducer';
import { getProducts } from '../../reducers/productReducer';
import { toggleBarcodeVisibility } from '../../reducers/barcodeListenerReducer';
import React, { Component } from 'react';
import boxService from '../../services/boxService';
import moneyFormatter from '../../services/moneyFormatter';

export class BoxForm extends Component {
    componentDidMount = () => {
        this.props.toggleBarcodeVisibility(false);
    };

    componentWillUnmount = () => {
        this.props.toggleBarcodeVisibility(true);
    };

    formSubmit = async (event) => {
        event.preventDefault();
        const buyprice = moneyFormatter.stringToCents(this.buyInInput.value);
        const margin = parseFloat(this.marginInput.value, 10);
        const sellprice = moneyFormatter.applyMarginPercent(buyprice, margin);
        const barcode = this.barcodeInput.value;
        const productCount = parseInt(this.productCountInput.value, 10);
        const boxes = parseInt(this.countInput.value, 10);
        const singleItemBuyPrice = Math.round(buyprice / productCount);
        const singleItemSellPrice = Math.round(sellprice / productCount);

        const boxProduct = this.props.products.filter((product) => {
            return product.product_barcode === this.productEANInput.value;
        })[0];

        if (!boxProduct) {
            this.props.errorMessage('Tuntematon tuotteen viivakoodi. Luo tuote ensin.');
            return;
        }

        const parsedProduct = this.parseBoxProduct(boxProduct);

        try {
            await boxService.createBox(this.props.token, barcode, productCount, parsedProduct);
            await boxService.buyInBox(this.props.token, barcode, boxes, singleItemBuyPrice, singleItemSellPrice);
            this.props.getProducts(this.props.token);
            this.barcodeInput.value = '';
            this.countInput.value = 0;
            this.buyInInput.value = 0;
            this.marginInput.value = this.props.globalMargin;
            this.productEANInput.value = '';
            this.productCountInput.value = 0;
            this.props.successMessage('Lisätty uusi laatikko');
        } catch (err) {
            console.error(err);
            this.props.errorMessage('Virhe lisättäessä uutta laatikkoa');
        }
    };

    parseBoxProduct = (product) => {
        return {
            product_barcode: product.product_barcode,
            product_group: product.product_group,
            product_id: product.product_id,
            product_name: product.product_name,
            quantity: product.quantity,
            product_weight: 1,
            product_sellprice: product.sellprice,
            product_buyprice: product.buyprice
        };
    };

    render = () => {
        return (
            <div className="product-create-form">
                <form onSubmit={this.formSubmit}>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="barcode">Viivakoodi</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="barcode"
                                name="barcode"
                                type="text"
                                ref={(input) => {
                                    this.barcodeInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="count">Kappalemäärä</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="count"
                                name="count"
                                type="number"
                                defaultValue={0}
                                ref={(input) => {
                                    this.countInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="buyprice">Sisäänostohinta</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="buyprice"
                                name="buyprice"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue={0}
                                ref={(input) => {
                                    this.buyInInput = input;
                                }}
                            />
                            <span className="unit">&euro;</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="margin">Kate</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="margin"
                                name="margin"
                                type="number"
                                step="1"
                                min="0"
                                defaultValue={this.props.globalMargin}
                                ref={(input) => {
                                    this.marginInput = input;
                                }}
                            />
                            <span className="unit">%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="productEAN">Tuotteen viivakoodi</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="productEAN"
                                name="productEAN"
                                type="text"
                                ref={(input) => {
                                    this.productEANInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="count">Kappalemäärä (tuote)</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="productcount"
                                name="productcount"
                                type="number"
                                defaultValue={0}
                                ref={(input) => {
                                    this.productCountInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <input type="submit" className="btn btn-success" value="Luo uusi laatikko" />
                        </Col>
                        <Col xs={4}>
                            <Link to={'/products'}>
                                <input type="submit" className="btn btn-danger" value="Peruuta" />
                            </Link>
                        </Col>
                    </Row>
                </form>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        globalMargin: state.product.globalMargin,
        token: state.authentication.accessToken,
        products: state.product.products
    };
};

const mapDispatchToProps = {
    successMessage,
    errorMessage,
    getProducts,
    toggleBarcodeVisibility
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxForm);
