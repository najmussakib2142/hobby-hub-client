import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import GroupCard from '../components/GroupCard';
import PopularCategories from '../components/PopularCategories';
import Faq from '../components/Faq';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
    const [groups, setGroups] = useState([]); // Initialize as empty array
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://hobby-hub-server-psi-bay.vercel.app/groups');
                const data = await response.json();

                // Debug: See exactly what the API sends back
                console.log("API Response:", data);

                // Check if data is actually an array before setting state
                if (Array.isArray(data)) {
                    setGroups(data);
                } else if (data && typeof data === 'object' && Array.isArray(data.groups)) {
                    // If your API wraps the array in an object like { groups: [] }
                    setGroups(data.groups);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGroups();
    }, []);

    return (
        <div>
            <Banner />
            <section className='max-w-7xl mx-auto'>
                <div className='px-6 md:px-12 py-8 md:py-16'>
                    <div className="text-center mt-5">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary">
                            Discover New{' '}
                            <span className="text-secondary">
                                <Typewriter
                                    words={['Passions', 'Hobbies', 'Skills', 'Communities']}
                                    loop={true}
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={100}
                                    deleteSpeed={50}
                                    delaySpeed={1500}
                                />
                            </span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm md:text-base">
                            Connect with passionate people, discover new hobbies, and build your own community!
                        </p>
                    </div>

                    {/* Loader/Grid Logic */}
                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <span className="loading loading-bars loading-lg text-blue-600"></span>
                        </div>
                    ) : (
                        <div className='grid py-8 md:py-12 lg:gap-6 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            {groups.length > 0 ? (
                                groups.slice(0, 6).map((group) => (
                                    <GroupCard key={group._id} group={group} />
                                ))
                            ) : (
                                <p className="col-span-full text-center py-10">No groups found.</p>
                            )}
                        </div>
                    )}
                </div>

                <div>
                    <PopularCategories />
                    <Faq />
                </div>
            </section>
        </div>
    );
};

export default Home;