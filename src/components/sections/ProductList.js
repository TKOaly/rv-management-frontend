import './styles/ProductList.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { productFilterType } from '../../reducers/productFilterReducer';
import { setProductSelected } from '../../reducers/productReducer';
import React from 'react';

const compareStringsNormalized = (a, b) => {
    a = a.toLowerCase().trim();
    b = b.toLowerCase().trim();

    return a < b ? -1 : a === b ? 0 : 1;
}

const sorters = {
    [productFilterType.NONE]: (a, b) => a.barcode - b.barcode,
    [productFilterType.NAME_ASC]: (a, b) => compareStringsNormalized(a.name, b.name),
    [productFilterType.NAME_DESC]: (a, b) => compareStringsNormalized(a.name, b.name) * -1,
    [productFilterType.STOCK_LOW]: (a, b) => a.quantity - b.quantity,
    [productFilterType.STOCK_HIGH]: (a, b) => b.quantity - a.quantity
};

class ProductListItem extends React.PureComponent {
    handleClick = () => {
        this.props.onClick(this.props.product.barcode);
    }

    render() {
        const { barcode, name, stock } = this.props.product;
        return (
            <Link
                to={`/products/${barcode}`}
                className="product"
                onClick={this.handleClick}
            >
                <span>{`${name} (${stock}) `}</span>
            </Link>
        );
    }
}

class ActiveProductListItem extends React.PureComponent {
    render() {
        const { product, innerRef } = this.props;
        const { barcode, name, stock } = product;
        return (
            <Link
                innerRef={innerRef}
                to={`/products/${barcode}`}
                className="product active"
            >
                <span>{`${name} (${stock}) `}</span>
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

    handleListItemClick = (barcode) => {
        this.props.setProductSelected(barcode);
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
                            product.barcode !== this.props.active ? (
                                <ProductListItem
                                    key={product.barcode}
                                    product={product}
                                    onClick={this.handleListItemClick}
                                />
                            ) : (
                                <ActiveProductListItem
                                    key={product.barcode}
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
