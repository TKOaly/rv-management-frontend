import './styles/SingleProduct.scss';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductMargin } from '../../reducers/productMarginReducer';
import { setProductSelected, updateProduct } from '../../reducers/productReducer';
import BoxAddStock from './BoxAddStock';
import ProductAddStock from './ProductAddStock';
import ProductEditForm from './ProductEditForm';
import React from 'react';
import moneyFormatter from '../../services/moneyFormatter';
import noImage from '../../images/no_image.png';

class SingleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buyInClicked: false
        };
    }

    componentDidUpdate = () => {
        const product = this.getCurrentProduct();
        if (this.props.selectedProduct === 0 && product) {
            this.props.setProductSelected(product.barcode);
        }
    };

    componentWillUnmount = () => {
        this.props.setProductSelected(0);
    };

    getCurrentProduct = () => {
        return this.props.products.find(
            (product) => product.barcode === this.props.match.params.barcode
        );
    };

    getCurrentBox = () => {
        return this.props.boxes.find((box) => box.product.barcode === this.props.match.params.barcode);
    };

    handleProductEdit = (values) => {
        const product = {
            barcode: this.props.match.params.barcode,
            name: values.name,
            categoryId: parseInt(values.categoryId),
            weight: values.product_weight || 0,
            buyPrice: moneyFormatter.stringToCents(values.buyPrice),
            sellPrice: moneyFormatter.stringToCents(values.sellPrice),
            stock: values.stock
        };

        // Back-end call here to /api/v1/admin/boxes/barcode
        this.props.updateProduct(product, this.props.token);
    };

    render = () => {
        const product = this.getCurrentProduct();
        const box = this.getCurrentBox();
        if (!product) {
            return <div>Valitse tuote tai lue viivakoodi.</div>;
        }
        const match = this.props.match;

        //link to box exist only if product has a box
        const linkToBox = box ? (
            <li>
                <NavLink to={`${match.url}/box`}> Laatikon sisäänosto </NavLink>
            </li>
        ) : (
            <li />
        );

        return (
            <React.Fragment>
                <div className="product-info">
                    <div className="product-title">
                        <h1>{product.name}</h1>
                        <h2>{product.stock} varastossa</h2>
                    </div>
                    <div className="product-image">
                        <img src={noImage} alt={product.name} />
                    </div>
                </div>
                <div className="product-menu">
                    <ul>
                        <li>
                            <NavLink exact to={match.url}>
                                Perustiedot
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`${match.url}/stock`}>Tuotteen sisäänosto</NavLink>
                        </li>
                        {linkToBox}
                    </ul>
                </div>
                <div className="product-section-container">
                    <Route
                        exact
                        path={`${match.path}`}
                        render={() => <ProductEditForm product={product} onSubmit={this.handleProductEdit} />}
                    />
                    <Route path={`${match.path}/stock`} render={() => <ProductAddStock product={product} />} />
                    <Route path={`${match.path}/box`} render={() => <BoxAddStock product={product} box={box} />} />
                </div>
            </React.Fragment>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        products: state.product.products,
        boxes: state.box.boxes,
        productMargin: state.productMargin.productMargin,
        selectedProduct: state.product.selectedProduct,
        globalMargin: state.product.globalMargin,
        token: state.authentication.accessToken
    };
};

const mapDispatchToProps = {
    fetchProductMargin,
    setProductSelected,
    updateProduct
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));
