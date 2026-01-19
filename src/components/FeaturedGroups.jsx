import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Loader2 } from 'lucide-react';
import GroupCard from '../components/GroupCard';


const FeaturedGroups = ({ isLoading, groups }) => {
    return (
        <section className='max-w-7xl mx-auto'>
            <div className='px-6 md:px-12 py-8 md:py-16'>
                <div className="text-center mt-5">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                        Discover New{' '}
                        <span className="text-primary">
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
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
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
        </section>
    );
};

export default FeaturedGroups;