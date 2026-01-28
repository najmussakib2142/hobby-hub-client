import React, { useEffect, useState } from 'react';
import GroupCard from '../components/GroupCard';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';

const AllGroups = () => {
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch('https://hobby-hub-server-psi-bay.vercel.app/groups');
                const data = await res.json();
                setGroups(data);
                setFilteredGroups(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGroups();
    }, []);

    useEffect(() => {
        const results = groups.filter(group =>
            group.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredGroups(results);
    }, [searchTerm, groups]);

    if (loading) return <Loading />;

    return (
        // Added dark:bg-slate-950 for a deep, professional dark theme
        <div className='min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 pb-20'>
            <Helmet>
                <title>HobbyHub || All Groups</title>
            </Helmet>

            {/* Header Section with glassmorphism effect in dark mode */}
            <div className="bg-white dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-800 py-16 px-4 mb-10">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Explore <span className="text-primary">Hobby Groups</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
                        Connect with passionate people and build your community.
                    </p>

                    {/* Search Bar - Adjusted for Dark Mode focus */}
                    <div className="mt-8 max-w-md mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for a hobby..."
                            className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 
                                     bg-white dark:bg-slate-800 text-gray-900 dark:text-white
                                     focus:ring-2 focus:ring-primary focus:border-transparent 
                                     outline-none transition-all shadow-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {filteredGroups.length > 0 ? (
                    <div className='grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        {filteredGroups.map(group => (
                            <GroupCard key={group._id} group={group} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-gray-500 dark:text-gray-400">
                            No groups found matching "{searchTerm}"
                        </h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllGroups;