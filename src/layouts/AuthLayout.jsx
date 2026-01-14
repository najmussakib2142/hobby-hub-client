import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import BottomNav from '../components/BottomNav';

const AuthLayout = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='max-w-7xl mx-auto lg:pt-10'>
                <Outlet></Outlet>
            </div>
            {/* <BottomNav></BottomNav> */}
        </div>
    );
};

export default AuthLayout;