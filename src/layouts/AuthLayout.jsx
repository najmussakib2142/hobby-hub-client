import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='max-w-6xl mx-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AuthLayout;