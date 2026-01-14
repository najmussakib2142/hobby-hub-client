import React, { useEffect, useState } from 'react';
import GroupCard from '../components/GroupCard';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';

const AllGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch('https://hobby-hub-server-psi-bay.vercel.app/groups');
                if (!res.ok) {
                    throw new Error('Failed to fetch groups');
                }
                const data = await res.json();
                setGroups(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className='mb-10 min-h-screen flex flex-col items-center max-w-7xl mx-auto'>
            <Helmet>
                <title>HobbyHub || All Groups</title>
            </Helmet>
            <div className="text-center mb-3 mt-10">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">Explore Hobby Groups</h2>
                <p className="text-gray-500 mt-2 text-sm md:text-base">
                    Connect with passionate people, discover new hobbies, and build your own community!
                </p>
            </div>
            <div className='grid p-8 gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {groups.map(group => (
                    <GroupCard key={group._id} group={group} />
                ))}
            </div>
        </div>
    );
};

export default AllGroups;
