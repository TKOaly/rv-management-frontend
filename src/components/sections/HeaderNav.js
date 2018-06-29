import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/HeaderNav.css';

const activeClass = 'header-nav-active';

export class HeaderNav extends Component {
    render = () => {
        return (
            <div className="header-nav">
                <ul>
                    <li>
                        <NavLink exact to="/products" activeClassName={activeClass}>
                            Tuotteet
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products/create/product" activeClassName={activeClass}>
                            Luo uusi tuote
                        </NavLink>
                    </li>
                </ul>
            </div>
        );
    };
}

export default HeaderNav;
