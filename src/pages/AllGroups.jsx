import React from 'react';
import { useLoaderData } from 'react-router';
import GroupCard from '../components/GroupCard';
import { Helmet } from 'react-helmet-async';

const AllGroups = () => {
    const groups = useLoaderData()
    console.log(groups);

    return (
        
        <div className='mb-10'>
            <Helmet>
                <title>HobbyHub || All Groups</title>
            </Helmet>
            <div className="text-center mb-3 mt-10">
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
        </div>
    );
};

export default AllGroups;