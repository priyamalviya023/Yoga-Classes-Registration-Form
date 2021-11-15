import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark primary-color">
            <Link className="navbar-brand" to="/">Yoga</Link>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/">Register</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/renew">Renew</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/payment">Payment</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

