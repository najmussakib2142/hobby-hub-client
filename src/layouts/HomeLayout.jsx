import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/Loading';

const HomeLayout = () => {
    const {state} = useNavigation()

    return (
        <div>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main className='max-w-6xl mx-auto'>
               {state == "loading" ? <Loading/> : <Outlet></Outlet>} 
            </main>
            
        </div>
    );
};

export default HomeLayout;