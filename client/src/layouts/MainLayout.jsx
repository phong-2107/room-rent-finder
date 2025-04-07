import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/root/styleguide.scss';


const MainLayout = () => {
    return (
        <div className="page-container">
            <Header />
            <div className="content-wrap">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;


