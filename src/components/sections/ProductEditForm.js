import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Col } from 'react-flexbox-grid';
import { Link, withRouter } from 'react-router-dom';
import { toggleBarcodeVisibility } from './../../reducers/barcodeListenerReducer';
import './styles/ProductEditForm.css';
import moneyFormatter from './../../services/moneyFormatter';

// Validators (consider moving these to a global validation module)
const required = (value) => (value ? undefined : 'Kenttä ei saa olla tyhjä');
const maxLength = (field, max) => (value) =>
    value && value.length > max ? `${field} on oltava lyhyempi kuin ${max} merkki(ä)` : undefined;

const renderField = ({ input, label, type, className, ref, meta: { touched, error, warning }, ...props }) => (
    <div>
        <label>{label}</label>
        <div>
            <input
                {...input}
                placeholder={label}
                type={type}
                {...props}
                ref={ref}
                className={className + (touched && error ? ' error-field' : '')}
            />
            {touched &&
                ((error && <span className="error-msg">{error}</span>) ||
                    (warning && <span className="warning-msg">{warning}</span>))}
        </div>
    </div>
);

const prodMapper = (product) =>
    Object.assign({}, product, {
        buyprice: moneyFormatter.centsToString(product.buyprice),
        sellprice: moneyFormatter.centsToString(product.sellprice)
    });

export class ProductEditForm extends Component {
    componentDidMount = () => {
        this.props.toggleBarcodeVisibility(false);
    };
    componentWillUnmount = () => {
        this.props.toggleBarcodeVisibility(true);
    };
    render = () => {
        const calculateSellprice = (value, previousValue, allValues) => {
            this.props.change(
                'sellprice',
                moneyFormatter.centsToString(
                    moneyFormatter.applyMarginPercent(
                        moneyFormatter.stringToCents(allValues.buyprice),
                        parseFloat(allValues.margin)
                    )
                )
            );
            return value;
        };
        return (
            <form onSubmit={this.props.handleSubmit} className="product-edit-form">
                <Row>
                    <Col xs={3}>
                        <label htmlFor="barcode">Viivakoodi</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            name="product_barcode"
                            type="text"
                            placeholder="Viivakoodi"
                            disabled={true}
                            validate={[required]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="name">Nimi</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="name"
                            name="product_name"
                            placeholder="Tuotteen nimi"
                            type="text"
                            validate={[required, maxLength('Tuotteen nimen', 64)]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="category">Kategoria</label>
                    </Col>
                    <Col xs={8}>
                        <Field component="select" id="category" name="product_group">
                            <option disabled>Valitse kategoria..</option>
                            {this.props.categories &&
                                this.props.categories.map((category) => (
                                    <option key={category.category_id} value={category.category_id}>
                                        {category.category_description}
                                    </option>
                                ))}
                        </Field>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="weight">Paino (g)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="product_weight"
                            name="product_weight"
                            type="number"
                            placeholder="Paino"
                            step="1"
                            min="0"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="buyprice">Sisäänostohinta (&euro;)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="buyprice"
                            name="buyprice"
                            type="number"
                            placeholder="Sisäänostohinta"
                            step="0.01"
                            min="0"
                            validate={[required]}
                            normalize={calculateSellprice}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="margin">Kate (%)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="margin"
                            name="margin"
                            type="number"
                            placeholder="Kate"
                            step="1"
                            min="0"
                            normalize={calculateSellprice}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="sellprice">Myyntihinta (&euro;)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="sellprice"
                            name="sellprice"
                            type="number"
                            placeholder="Myyntihinta"
                            step="0.01"
                            min="0"
                            normalize={calculateSellprice}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="sellprice">Varastosaldo (kpl)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component="input"
                            id="quantity"
                            name="quantity"
                            placeholder="Varastosaldo"
                            type="number"
                            step="1"
                            validate={[required]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Field component="button" type="submit" name="submit" className="btn btn-success">
                            Tallenna muutokset
                        </Field>
                    </Col>
                    <Col xs={4}>
                        <Link to={'/products'}>
                            <input type="submit" className="btn btn-danger" value="Peruuta" />
                        </Link>
                    </Col>
                </Row>
            </form>
        );
    };
}

const ProductEditReduxForm = reduxForm({
    form: 'productEditForm',
    enableReinitialize: true
})(ProductEditForm);

const mapStateToProps = (state, props) => {
    return {
        initialValues: Object.assign(
            {},
            prodMapper(
                state.product.products.find(
                    (product) => product.product_id === parseInt(props.match.params.productid, 10)
                )
            ),
            { margin: state.product.globalMargin }
        ),
        categories: state.category.categories.categories
    };
};

const mapDispatchToProps = {
    toggleBarcodeVisibility
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductEditReduxForm));
