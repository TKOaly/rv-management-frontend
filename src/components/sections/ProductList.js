import './styles/ProductList.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { productFilterType } from '../../reducers/productFilterReducer';
import { setProductSelected } from '../../reducers/productReducer';
import React from 'react';

const sorters = {
    [productFilterType.NONE]: (a, b) => a.product_id - b.product_id,
    [productFilterType.NAME_ASC]: (a, b) =>
        a.product_name.toLowerCase().trim() < b.product_name.toLowerCase().trim()
            ? -1
            : b.product_name.toLowerCase().trim() === a.product_name.toLowerCase().trim() ? 0 : 1,

    [productFilterType.NAME_DESC]: (a, b) =>
        a.product_name.toLowerCase().trim() < b.product_name.toLowerCase().trim()
            ? 1
            : b.product_name.toLowerCase().trim() === a.product_name.toLowerCase().trim() ? 0 : -1,

    [productFilterType.STOCK_LOW]: (a, b) => a.quantity - b.quantity,

    [productFilterType.STOCK_HIGH]: (a, b) => b.quantity - a.quantity
};

class ProductListItem extends React.PureComponent {
    handleClick = () => {
        this.props.onClick(this.props.product.product_id);
    }

    render() {
        const { product_id, product_name, quantity } = this.props.product;
        return (
            <Link
                to={`/products/${product_id}`}
                className="product"
                onClick={this.handleClick}
            >
                <span>{`${product_name} (${quantity}) `}</span>
            </Link>
        );
    }
}

class ActiveProductListItem extends React.PureComponent {
    render() {
        const { product, innerRef } = this.props;
        const { product_id, product_name, quantity } = product;
        return (
            <Link
                innerRef={innerRef}
                to={`/products/${product_id}`}
                className="product active"
            >
                <span>{`${product_name} (${quantity}) `}</span>
            </Link>
        );
    }
}

class ProductList extends React.Component {
    componentDidUpdate = () => {
        if (this.active) {
            this.active.scrollIntoView();
            window.scrollTo(0, 0);
        }
    };

    handleListItemClick = (productId) => {
        this.props.setProductSelected(productId);
    }

    handleActiveItemRef = (activeRef) => {
        this.active = activeRef;
    }

    render = () => {
        const prods = this.props.products ? this.props.products.sort(sorters[this.props.sortedBy]) : [];
        return (
            <div className="products">
                <div className="product-container">
                    <button className="product-disabled" disabled>
                        Nimi (varastosaldo)
                    </button>
                    {prods.map(
                        (product) =>
                            product.product_id !== this.props.active ? (
                                <ProductListItem
                                    key={product.product_id}
                                    product={product}
                                    onClick={this.handleListItemClick}
                                />
                            ) : (
                                <ActiveProductListItem
                                    key={product.product_id}
                                    product={product}
                                    innerRef={this.handleActiveItemRef}
                                />
                            )
                    )}
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        products: state.product.products,
        sortedBy: state.productFilter.sortedBy,
        margin: state.product.globalMargin
    };
};

const mapDispatchToProps = {
    setProductSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
