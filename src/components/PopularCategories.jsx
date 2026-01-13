import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { LayoutGrid, Loader2, AlertCircle, ArrowRight, Tag } from 'lucide-react'; // Optional: for better visuals
import { Link } from 'react-router';
const PopularCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://hobby-hub-server-psi-bay.vercel.app/api/category');
                if (!res.ok) throw new Error('Failed to fetch categories');
                const data = await res.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center gap-2 text-red-500 py-10">
            <AlertCircle size={20} /> <span>Error: {error}</span>
        </div>
    );

    return (
        <section className="py-8 md:py-12 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div className="text-left">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Browse by <span className="text-primary">
                            <Typewriter words={['Interest', 'Activity', 'Category']} loop={0} cursor />
                        </span>
                    </h2>
                    <p className="text-gray-500 mt-2">Find the perfect club based on your favorite hobby.</p>
                </div>
                {/* <button className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                    View all categories <ArrowRight size={16} />
                </button> */}
            </div>

            {/* Compact Pill Layout */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {categories.map((cat, idx) => (
                    <Link
                        to={`/category/${cat}`} // This changes the URL to /category/Running
                        key={idx}
                        className="no-underline" // Removes default link styling
                    >
                        <div className="group flex items-center gap-3 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full cursor-pointer transition-all duration-200 hover:border-primary hover:bg-blue-50 dark:hover:bg-primary/20 hover:shadow-md">
                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full group-hover:bg-blue-100 dark:group-hover:bg-blue-800 transition-colors">
                                <Tag size={14} className="text-gray-500 group-hover:text-blue-600" />
                            </div>
                            <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                                {cat}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default PopularCategories;