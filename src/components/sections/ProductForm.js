import './styles/ProductForm.scss';
import { useSelector } from 'react-redux';
import { Col, Row } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { addProduct } from '../../reducers/productReducer';
import { connect } from 'react-redux';
import { toggleBarcodeVisibility } from '../../reducers/barcodeListenerReducer';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

const CategoryChooser = ({ ...props }) => {
    const categories = useSelector((state) => state.category.categories);

    console.log(categories);

    return (
        <select { ...props}>
            {categories.map((category) => (
                <option value={category.categoryId}>{ category.description }</option>
            ))}
        </select>
    );
};

class ProductForm extends React.Component {
    updateFields = () => {
        this.marginInput.value = Math.round(this.props.globalMargin * 100);
        this.calculateSellprice();
    };

    calculateSellprice = () => {
        const cost = moneyFormatter.stringToCents(this.buyInInput.value);
        const margin = parseFloat(this.marginInput.value);
        const sellprice = Math.round(cost * ((margin / 100.0) + 1.0));

        console.log(this.buyInInput.value, cost, margin, sellprice);

        this.sellpriceInput.value = moneyFormatter.centsToString(sellprice);
    };

    componentDidMount = () => {
        this.updateFields();
        this.props.toggleBarcodeVisibility(false);
    };

    componentDidUpdate = () => {
        this.updateFields();
    };

    componentWillUnmount = () => {
        this.props.toggleBarcodeVisibility(true);
    };

    formSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            name: event.target.name.value,
            pgrpid: 1,
            weight: parseInt(event.target.weight.value),
            barcode: event.target.barcode.value,
            categoryId: parseInt(event.target.category.value),
            stock: 0,
            buyPrice: moneyFormatter.stringToCents(event.target.buyprice.value),
            sellPrice: moneyFormatter.stringToCents(event.target.sellprice.value)
        };
        this.props.addProduct(newProduct, this.props.token);
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
                            <label htmlFor="name">Nimi</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                ref={(input) => {
                                    this.nameInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="category">Kategoria</label>
                        </Col>
                        <Col xs={9}>
                            <CategoryChooser
                                id="category"
                                name="category"
                                ref={(input) => {
                                    this.categoryInput = input;
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="weight">Paino</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="weight"
                                name="weight"
                                type="number"
                                step="1"
                                min="0"
                                defaultValue="42"
                                ref={(input) => {
                                    this.weightInput = input;
                                }}
                            />
                            <span className="unit">g</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={3}>
                            <label htmlFor="descr">Kuvaus</label>
                        </Col>
                        <Col xs={9}>
                            <textarea
                                id="descr"
                                name="descr"
                                type="text"
                                ref={(input) => {
                                    this.descriptionInput = input;
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
                                defaultValue="0"
                                ref={(input) => {
                                    this.buyInInput = input;
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
                            <label htmlFor="sellprice">Myyntihinta</label>
                        </Col>
                        <Col xs={9}>
                            <input
                                id="sellprice"
                                name="sellprice"
                                type="number"
                                step="0.01"
                                min="0"
                                defaultValue="0"
                                ref={(input) => {
                                    this.sellpriceInput = input;
                                }}
                                onChange={this.calculateSellprice}
                            />
                            <span className="unit">&euro;</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={8}>
                            <input type="submit" className="btn btn-success" value="Luo uusi tuote" />
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
        token: state.authentication.accessToken
    };
};

const mapDispatchToProps = {
    addProduct,
    toggleBarcodeVisibility
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
