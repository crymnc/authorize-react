import React from 'react';
import './sidebar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faHome, faAngleDoubleRight, faAddressCard} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <a href="/#" className="nav-link">
                        <span className="link-text logo-text">Authorize</span>
                        <FontAwesomeIcon icon={faAngleDoubleRight} size={"lg"} className="fa-primary"/>
                    </a>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        <FontAwesomeIcon icon={faHome} size={"lg"} className="fa-primary"/>
                        <span className="link-text">Home</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/users">
                        <FontAwesomeIcon icon={faUser} size={"lg"} className="fa-primary"/>
                        <span className="link-text">Users</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/about">
                        <FontAwesomeIcon icon={faAddressCard} size={"lg"} className="fa-primary"/>
                        <span className="link-text">About</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
