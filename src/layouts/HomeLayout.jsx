import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/Loading';
import PopularCategories from '../components/PopularCategories';
import Faq from '../components/Faq';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import BottomNav from '../components/BottomNav';

const HomeLayout = () => {
    const {state} = useNavigation()

    return (
        <div className='md:pt-15'>
        <Helmet>
                <title>HobbyHub || Home</title>
            </Helmet>
            <nav className=''>
                <Navbar></Navbar>
            </nav>
            <main className='max-w-7xl mx-auto '>
               {state == "loading" ? <Loading/> : <Outlet></Outlet>} 
            </main>
            <Footer></Footer>
            <BottomNav></BottomNav>
        </div>
    );
};

export default HomeLayout;