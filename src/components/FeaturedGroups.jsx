import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Loader2 } from 'lucide-react';
import GroupCard from '../components/GroupCard';
import GroupCardSkeleton from './GroupCardSkeleton';


const FeaturedGroups = ({ isLoading, groups }) => {
    const displayLimit = 6;
    return (
        <section className='max-w-7xl mx-auto'>
            <div className='px-6 md:px-12 py-8 md:py-16'>
                <div className="text-center mt-5">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
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
                <div className={`grid py-8 md:py-12 lg:gap-6 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                    {isLoading ? (
                        [...Array(displayLimit)].map((_, index) => (
                            <GroupCardSkeleton key={index} />
                        ))
                    ) : (
                        <>
                            {groups.length > 0 ? (
                                groups.slice(0, displayLimit).map((group) => (
                                    <GroupCard key={group._id} group={group} />
                                ))
                            ) : (
                                <p className="col-span-full text-center py-10">No groups found.</p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedGroups;