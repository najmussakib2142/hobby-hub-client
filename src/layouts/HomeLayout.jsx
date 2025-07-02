import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-6xl mx-auto'>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default HomeLayout;