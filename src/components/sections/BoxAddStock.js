import './styles/BoxAddStock.scss';
import { Col, Row } from 'react-flexbox-grid';
import { addStock } from '../../reducers/boxReducer';
import { connect } from 'react-redux';
import { setUpgradeStock } from '../../reducers/productReducer';
import { toggleBarcodeVisibility } from '../../reducers/barcodeListenerReducer';
import { withRouter } from 'react-router-dom';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class BoxAddStock extends React.Component {
    updateFields = () => {
        if (this.props.box) {
            this.barcodeInput.value = this.props.box.box_barcode;
            this.productBarcodeInput.value = this.props.product.product_barcode;
            this.costInput.value = moneyFormatter.centsToString(this.props.product.buyprice);
            this.amountInput.value = this.props.box.items_per_box;
            this.marginInput.value = this.props.globalMargin;
            this.calculateProductSellpriceAndBoxcost();
        }
    };

    calculateProductSellprice = () => {
        const boxcost = moneyFormatter.stringToCents(this.boxcostInput.value);
        const margin = parseFloat(this.marginInput.value);
        const boxSellprice = moneyFormatter.applyMarginPercent(boxcost, margin);
        const amount = parseInt(this.amountInput.value);
        const productcost = Math.round(boxcost / amount);
        const productSellprice = Math.round(boxSellprice / amount);

        this.costInput.value = moneyFormatter.centsToString(productcost);
        this.sellpriceInput.value = moneyFormatter.centsToString(productSellprice);
    };

    calculateProductSellpriceAndBoxcost = () => {
        const productcost = moneyFormatter.stringToCents(this.costInput.value);
        const margin = parseFloat(this.marginInput.value);
        const productSellprice = moneyFormatter.applyMarginPercent(productcost, margin);
        const amount = parseInt(this.amountInput.value);

        this.boxcostInput.value = moneyFormatter.centsToString(productcost * amount);
        this.sellpriceInput.value = moneyFormatter.centsToString(productSellprice);
    };

    componentDidMount = () => {
        this.updateFields();
        this.props.toggleBarcodeVisibility(false);
    };

    componentDidUpdate = () => {
        if (!this.props.upgradeStock) {
            this.updateFields();
        } else {
            const link = '/products/' + this.props.product.product_id;
            this.props.history.push(link);
        }
    };

    componentWillUnmount = () => {
        this.props.toggleBarcodeVisibility(true);
    };

    formSubmit = (event) => {
        event.preventDefault();

        const box = {
            product_id: this.props.product.product_id,
            sellprice: moneyFormatter.stringToCents(this.sellpriceInput.value),
            buyprice: moneyFormatter.stringToCents(this.costInput.value),
            boxes: this.quantityInput.value
        };

        this.props.addStock(this.props.box.box_barcode, box, this.props.token);
    };

    render = () => {
        return (
            <div className="box-stocking-form">
                <form onSubmit={this.formSubmit}>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="barcode">Laatikon viivakoodi</label>
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
                            <label htmlFor="cost">Laatikon sisäänostohinta</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="boxcost"
                                name="boxcost"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue="1.50"
                                ref={(input) => {
                                    this.boxcostInput = input;
                                }}
                                onChange={this.calculateProductSellprice}
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
                                onChange={this.calculateProductSellprice}
                            />
                            <span className="unit">%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="amount">Tuotteita laatikossa</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                step="1"
                                defaultValue="10"
                                ref={(input) => {
                                    this.amountInput = input;
                                }}
                                disabled
                            />
                            <span className="unit">kpl</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="quantity">Laatikoiden määrä</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                defaultValue="1"
                                min="1"
                                step="1"
                                ref={(input) => {
                                    this.quantityInput = input;
                                }}
                            />
                            <span className="unit">kpl</span>
                        </Col>
                    </Row>
                    <div className="product-wrapper">
                        <Row>
                            <Col xs={3}>
                                <label className="product-title">Laatikko sisältää:</label>
                            </Col>
                            <Col xs={9}>
                                <label className="product-title">{this.props.product.product_name}</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label htmlFor="barcode">Tuotteen viivakoodi</label>
                            </Col>
                            <Col xs={9}>
                                <input
                                    id="barcode"
                                    name="barcode"
                                    type="text"
                                    ref={(input) => {
                                        this.productBarcodeInput = input;
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label htmlFor="cost">Tuotteen sisäänostohinta</label>
                            </Col>
                            <Col xs={9}>
                                <input
                                    id="cost"
                                    name="cost"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    defaultValue="1.50"
                                    ref={(input) => {
                                        this.costInput = input;
                                    }}
                                    onChange={this.calculateProductSellpriceAndBoxcost}
                                />
                                <span className="unit">&euro;</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3}>
                                <label htmlFor="sellprice">Tuotteen myyntihinta</label>
                            </Col>
                            <Col xs={9}>
                                <input
                                    id="sellprice"
                                    name="sellprice"
                                    type="number"
                                    step="0.01"
                                    ref={(input) => {
                                        this.sellpriceInput = input;
                                    }}
                                />
                                <span className="unit">&euro;</span>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col xs={6}>
                            <input type="submit" className="btn btn-success" value="Osta sisään" />
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
        upgradeStock: state.product.upgradeStock,
        barcodeVisible: state.barcodeListener.visible
    };
};

const mapDispatchToProps = {
    addStock,
    setUpgradeStock,
    toggleBarcodeVisibility
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoxAddStock));
