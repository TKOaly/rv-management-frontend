import './styles/ProductEditForm.scss';
import { Col, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleBarcodeVisibility } from '../../reducers/barcodeListenerReducer';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';

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
        categoryId: product.category.categoryId,
        buyPrice: moneyFormatter.centsToString(product.buyPrice),
        sellPrice: moneyFormatter.centsToString(product.sellPrice)
    });

// Create and re-use validator for name field.
// See issue #5 on Github
const productNameMaxLenValidator = maxLength('Tuotteen nimen', 64);

class ProductEditForm extends React.Component {
    componentDidMount = () => {
        this.props.toggleBarcodeVisibility(false);


    };

    componentWillUnmount = () => {
        this.props.toggleBarcodeVisibility(true);
    };

    render = () => {
        const calculateSellprice = (value, _previousValue, allValues) => {
            this.props.change(
                'sellPrice',
                moneyFormatter.centsToString(
                    moneyFormatter.applyMarginPercent(
                        moneyFormatter.stringToCents(allValues.buyPrice),
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
                            name="barcode"
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
                            name="name"
                            placeholder="Tuotteen nimi"
                            type="text"
                            validate={[required, productNameMaxLenValidator]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="category">Kategoria</label>
                    </Col>
                    <Col xs={8}>
                        <Field component="select" id="categoryId" name="categoryId">
                            <option disabled>Valitse kategoria..</option>
                            {this.props.categories &&
                                this.props.categories.map((category) => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.description}
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
                            id="weight"
                            name="weight"
                            type="number"
                            placeholder="Paino"
                            step="1"
                            min="0"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <label htmlFor="buyPrice">Sisäänostohinta (&euro;)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="buyPrice"
                            name="buyPrice"
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
                        <label htmlFor="sellPrice">Myyntihinta (&euro;)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component={renderField}
                            id="sellPrice"
                            name="sellPrice"
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
                        <label htmlFor="stock">Varastosaldo (kpl)</label>
                    </Col>
                    <Col xs={8}>
                        <Field
                            component="input"
                            id="stock"
                            name="stock"
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

const mapStateToProps = (state, props) => {
    return {
        initialValues: Object.assign(
            {},
            prodMapper(
                state.product.products.find(
                    (product) => product.barcode === props.match.params.barcode
                )
            ),
            { margin: Math.round(state.product.globalMargin * 100) }
        ),
        categories: state.category.categories
    };
};

const mapDispatchToProps = {
    toggleBarcodeVisibility
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'productEditForm',
            enableReinitialize: true
        })(ProductEditForm)
    )
);
