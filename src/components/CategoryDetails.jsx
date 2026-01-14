import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GroupCard from './GroupCard';

const CategoryDetails = () => {
    const { categoryName } = useParams(); // Matches the :categoryName in your Route
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://hobby-hub-server-psi-bay.vercel.app/groups/category/${categoryName}`)
            .then(res => res.json())
            .then(data => {
                setGroups(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [categoryName]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-center mt-20 text-2xl animate-bounce">Loading {categoryName} clubs...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-16 ">
            <h2 className="text-4xl font-bold mb-12 text-center">
                Explore <span className="text-primary capitalize">{categoryName}</span> Groups
            </h2>

            {groups.length === 0 ? (
                <p className="text-center text-gray-500">No groups found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groups.map((group) => (
                        <GroupCard group={group} />
                        // <div key={group._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-transform hover:scale-[1.02]">
                        //     <img 
                        //         src={group.image} 
                        //         alt={group.name} 
                        //         className="w-full h-48 object-cover"
                        //     />
                        //     <div className="p-6">
                        //         <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase">
                        //             {group.category}
                        //         </span>
                        //         <h3 className="text-xl font-bold mt-3 text-gray-800 dark:text-white">{group.name}</h3>
                        //         <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm line-clamp-2">
                        //             {group.description}
                        //         </p>
                        //         <div className="mt-4 pt-4 border-t flex justify-between items-center text-sm">
                        //             <span className="text-gray-500">📍 {group.location}</span>
                        //             <span className="font-semibold text-blue-500">{group.maxMembers} Members</span>
                        //         </div>
                        //     </div>
                        // </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryDetails;