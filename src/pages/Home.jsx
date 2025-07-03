import React from 'react';
import Banner from './Banner';
import Footer from '../components/Footer';
import AllGroups from './AllGroups';
import GroupCard from '../components/GroupCard';
import { useLoaderData } from 'react-router';
import PopularCategories from '../components/PopularCategories';
import Faq from '../components/Faq';

const Home = () => {
    const groups = useLoaderData()
    return (
        <div>
            <Banner></Banner>
            <div>
                <div className="text-center mt-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Explore Hobby Groups</h2>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                        Connect with passionate people, discover new hobbies, and build your own community!
                    </p>
                </div>
                <div className='grid p-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {
                        groups.map(group =>
                            <GroupCard
                                key={group._id} group={group}>
                            </GroupCard>)
                    }
                </div>
                <section>
                    <PopularCategories></PopularCategories>
                    <Faq></Faq>

                </section>
            </div>
        </div>
    );
};

export default Home;