import React from 'react';
import './navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className="top-navbar">
            <ul>
                <li className="top-navbar-link">
                    <a href="/#">
                        <FontAwesomeIcon icon={faEllipsisV} size={"lg"}/>
                    </a>
                </li>
            </ul>
        </nav>

    );
};

export default Navbar;
