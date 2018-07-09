import './styles/NewProduct.css';
import { NavLink, Route, withRouter } from 'react-router-dom';
import BoxForm from './BoxForm';
import ProductForm from './ProductForm';
import React from 'react';

class NewProduct extends React.Component {
    render = () => {
        const match = this.props.match;

        return (
            <React.Fragment>
                <div className="create-title">
                    <h1>Luo uusi tuote/laatikko </h1>
                </div>
                <div className="create-menu">
                    <ul>
                        <li>
                            <NavLink to={`${match.url}/product`}>Uusi tuote</NavLink>
                        </li>
                        <li>
                            <NavLink to={`${match.url}/box`}>Uusi laatikko</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="form-container">
                    <Route exact path={`${match.path}/product`} render={() => <ProductForm />} />
                    <Route path={`${match.path}/box`} render={() => <BoxForm />} />
                </div>
            </React.Fragment>
        );
    };
}

export default withRouter(NewProduct);
