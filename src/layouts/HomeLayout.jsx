import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/Loading';
import PopularCategories from '../components/PopularCategories';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

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
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;