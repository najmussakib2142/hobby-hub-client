import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { Loader2, AlertCircle, ChevronRight, Hash } from 'lucide-react';
import { Link } from 'react-router';

const PopularCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://hobby-hub-server-psi-bay.vercel.app/category');
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
        <div className="flex flex-col justify-center items-center h-64 gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-slate-400 text-sm font-medium animate-pulse">Loading infrastructure...</p>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center gap-3 text-red-500 py-20 border border-dashed border-red-200 rounded-xl m-6">
            <AlertCircle size={24} /> 
            <span className="font-medium">System Error: {error}</span>
        </div>
    );

    return (
        <section className="bg-white dark:bg-slate-950 py-16 md:py-24 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-3">
                            Marketplace Taxonomy
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                            Browse by <span className="text-primary inline-block min-w-[150px]">
                                <Typewriter words={['Interest', 'Category']} loop={0} cursor cursorStyle='|' />
                            </span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg">
                            Select a specialized domain to find curated peer groups and technical resources.
                        </p>
                    </div>
                    
                    {/* <Link to="/categories" className="group flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider hover:text-primary transition-colors">
                        View Directory
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link> */}
                </div>

                {/* Professional Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {categories.map((cat, idx) => (
                        <Link
                            to={`/category/${cat}`}
                            key={idx}
                            className="group relative overflow-hidden"
                        >
                            <div className="h-full flex items-center justify-between p-4 bg-[#fcfcfd] dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white dark:bg-slate-800 rounded-md shadow-sm border border-slate-100 dark:border-slate-700 group-hover:text-primary transition-colors">
                                        <Hash size={16} className="opacity-50 group-hover:opacity-100" />
                                    </div>
                                    <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                        {cat}
                                    </span>
                                </div>
                                <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all -translate-x-2 group-hover:translate-x-0" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;