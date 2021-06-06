import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/Sidebar";
import "./layout.css";
import React from 'react';

const Layout = ({children}) => {
    return (
        <div className="layout">
            <Sidebar/>
            <main>
                <Navbar/>
                <div className="children">{children}</div>
                <Footer/>
            </main>
        </div>
    );
};

export default Layout;
