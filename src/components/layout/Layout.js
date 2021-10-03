import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import "./layout.css";
import React from 'react';
import {experimentalStyled} from '@material-ui/core';

const Layout = ({children}) => {
    const LayoutContent = experimentalStyled('main')({
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    });

    return (
        <div className="layout">
            <Sidebar/>
            <LayoutContent>
                <Navbar/>
                <div className="children">{children}</div>
                <Footer/>
            </LayoutContent>

        </div>
    );
};

export default Layout;
