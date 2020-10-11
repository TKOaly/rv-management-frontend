import './styles/ProductAddStock.scss';
import { Col, Row } from 'react-flexbox-grid';
import { addStock, setUpgradeStock } from '../../reducers/productReducer';
import { connect } from 'react-redux';
import { toggleBarcodeVisibility } from '../../reducers/barcodeListenerReducer';
import { withRouter } from 'react-router-dom';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

class ProductAddStock extends React.Component {
    updateFields = () => {
        if (this.props.product) {
            this.barcodeInput.value = this.props.product.barcode;
            this.marginInput.value = Math.round(this.props.globalMargin * 100);
            this.calculateSellprice();
        }
    };

    calculateSellprice = () => {
        const cost = moneyFormatter.stringToCents(this.costInput.value);
        const margin = parseFloat(this.marginInput.value);
        const sellprice = moneyFormatter.applyMarginPercent(cost, margin);

        this.sellpriceInput.value = moneyFormatter.centsToString(sellprice);
    };

    componentDidMount = () => {
        this.updateFields();
        this.props.toggleBarcodeVisibility(false);
    };

    componentDidUpdate = () => {
        if (!this.props.upgradeStock) {
            this.updateFields();
        } else {
            const link = '/products/' + this.props.product.barcode;
            this.props.history.push(link);
        }
    };

    componentWillUnmount = () => {
        this.props.setUpgradeStock(false);
        this.props.toggleBarcodeVisibility(true);
    };

    formSubmit = (event) => {
        event.preventDefault();
        const product = {
            barcode: this.props.product.barcode,
            buyPrice: moneyFormatter.stringToCents(this.costInput.value),
            sellPrice: moneyFormatter.stringToCents(this.sellpriceInput.value),
            count: parseInt(this.quantityInput.value)
        };

        this.props.addStock(product, this.props.token);
    };

    render = () => {
        return (
            <div className="product-stocking-form">
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
                            <label htmlFor="cost">Sisäänostohinta (1 tuote)</label>
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
                                onChange={this.calculateSellprice}
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
                                defaultValue={Math.round(this.props.globalMargin * 100)}
                                ref={(input) => {
                                    this.marginInput = input;
                                }}
                                onChange={this.calculateSellprice}
                            />
                            <span className="unit">%</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="sellprice">Myyntihinta (1 tuote)</label>
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
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="quantity">Kappalemäärä</label>
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
        barcodeVisibile: state.barcodeListener.visible
    };
};

const mapDispatchToProps = {
    addStock,
    setUpgradeStock,
    toggleBarcodeVisibility
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductAddStock));
