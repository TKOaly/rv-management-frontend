import './styles/ProductListPage.scss';
import { Col, Row } from 'react-flexbox-grid';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBoxes } from '../../reducers/boxReducer';
import { getCategories } from '../../reducers/categoryReducer';
import { getGlobalMargin } from '../../reducers/productReducer';
import { getProducts } from '../../reducers/productReducer';
import BarcodeListener from '../sections/BarcodeListener';
import NewProduct from '../sections/NewProduct';
import ProductFilter from '../sections/ProductFilter';
import ProductList from '../sections/ProductList';
import React from 'react';
import SingleProduct from '../sections/SingleProduct';

class ProductListPage extends React.Component {
    componentDidMount = () => {
        this.props.getProducts(this.props.token);
        this.props.getGlobalMargin(this.props.token);
        this.props.getBoxes(this.props.token);
        this.props.getCategories(this.props.token);
    };

    render = () => {
        const match = this.props.match;

        return (
            <div className="productListPage">
                <Row className="products-content">
                    <Col xs={3} className="products-sidebar">
                        <BarcodeListener />
                        <ProductFilter />
                        <ProductList active={this.props.activeProduct} />
                    </Col>
                    <Col xs={9} className="single-product">
                        <Route
                            exact
                            path={`${match.path}`}
                            component={(props) => (
                                <div>
                                    <div>Valitse tuote tai lue viivakoodi.</div>
                                </div>
                            )}
                        />
                        <Route path={`${match.path}/:productid(\\d+)`} component={SingleProduct} />
                        <Route path={`${match.path}/create`} component={NewProduct} />
                    </Col>
                </Row>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        activeProduct: state.product.selectedProduct,
        token: state.authentication.accessToken
    };
};

const mapDispatchToProps = {
    getProducts,
    getGlobalMargin,
    getBoxes,
    getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
