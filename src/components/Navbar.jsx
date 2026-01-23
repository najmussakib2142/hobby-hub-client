import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useTheme } from "../provider/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Search, X } from "lucide-react";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setOpen] = useState(false);
    const location = useLocation();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [allGroups, setAllGroups] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (isSearchOpen && allGroups.length === 0) {
            setIsSearching(true);
            fetch('https://hobby-hub-server-psi-bay.vercel.app/groups')
                .then(res => res.json())
                .then(data => {
                    setAllGroups(Array.isArray(data) ? data : data.groups || []);
                    setIsSearching(false);
                })
                .catch(() => setIsSearching(false));
        }
    }, [isSearchOpen, allGroups.length]);

    const filteredResults = allGroups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6);

    // 1. Handle Body Scroll Lock
    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isSearchOpen]);

    // 2. Function to close on Esc key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsSearchOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery(""); // This clears the "Coding" text
    };

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4f46e5",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log out",
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => toast.success("Logged out successfully"))
                    .catch((err) => toast.error(err.message));
            }
        });
    };

    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
     ${isActive
            ? "text-primary dark:text-indigo-400 underline decoration-1 underline-offset-4 lg:underline-offset-26"
            : "text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-indigo-400"
        }`;

    const links = (
        <>
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/AllGroups" className={navLinkClass}>Hobby Space</NavLink>
            <NavLink to="/createGroup" className={navLinkClass}>New Circle</NavLink>
            {user && (
                <NavLink to="/myGroups" className={navLinkClass}>My Dashboard</NavLink>
            )}
        </>
    );

    // after change the router the drawer will be closed
    useEffect(() => {
        setOpen(false);
    }, [location.pathname])

    // if drawer is open, prevent body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        }
    }, [isOpen])

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-99 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto pl-4 pr-6 md:px-12  h-14 flex items-center justify-between">

                    {/* Left */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            ☰
                        </button>

                        <Link to="/" className="text-xl text-primary font-bold">
                            HobbyHub
                        </Link>
                    </div>

                    {/* Center (Desktop) */}
                    <div className="hidden lg:flex items-center gap-1">
                        {links}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>

                        {/* Theme toggle */}
                        <div className='hidden md:block'>
                            <div className="flex items-center space-x-1 md:space-x-2">
                                <div className="flex items-center bg-gray-300 dark:bg-gray-700 rounded-full md:p-0.5 transition-colors">
                                    <button
                                        onClick={() => toggleTheme('light')}
                                        className={`md:p-1 rounded-full transition-colors ${theme === 'light'
                                            ? 'bg-white text-yellow-600'
                                            : 'text-gray-600 dark:text-gray-300'
                                            }`}
                                        aria-label="Switch to light mode"
                                    >
                                        <span className="text-base md:text-xl">☀️</span>
                                    </button>
                                    <button
                                        onClick={() => toggleTheme('dark')}
                                        className={` md:p-1 rounded-full transition-colors ${theme === 'dark'
                                            ? 'bg-white text-indigo-500'
                                            : 'text-gray-600 dark:text-gray-300'
                                            }`}
                                        aria-label="Switch to dark mode"
                                    >
                                        <span className="text-base md:text-xl">🌙</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="block md:hidden">
                            <button
                                onClick={toggleTheme}
                                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                                className='p-1 md:p-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
                            >
                                {
                                    theme === 'dark' ?
                                        (
                                            <span className='text-yellow-600 text-xl' > ☀️</span>
                                        ) :
                                        (
                                            <span className='text-gray-700 text-xl'>🌙</span>
                                        )
                                }
                            </button>
                        </div>

                        {/* Avatar */}
                        {user && (
                            <div className="relative group">
                                <img
                                    src={user.photoURL}
                                    alt="user"
                                    className="w-9 h-9 rounded-full border object-cover"
                                />
                                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                    {user.displayName || user.email}
                                </div>
                            </div>
                        )}

                        {/* Auth */}
                        {user ? (
                            <button
                                onClick={handleLogOut}
                                className="text-sm px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="login"
                                className="text-sm px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />

                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 260, damping: 30 }}
                            className="fixed top-0 left-0 z-50 h-full w-72 bg-white dark:bg-gray-900 p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <span className="font-bold text-lg">HobbyHub</span>
                                <button onClick={() => setOpen(false)}>✕</button>
                            </div>

                            <div className="flex flex-col gap-2">
                                {links}
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* --- SEARCH SHUTTER --- */}
            <AnimatePresence>
                {isSearchOpen && (
                    <>
                        {/* Backdrop / Overlay: Clicking this closes the search */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            // onClick={() => setIsSearchOpen(false)}
                            onClick={closeSearch}
                            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[998]"
                        />

                        {/* Shutter Panel */}
                        <motion.div
                            initial={{ y: "-100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 z-[999] shadow-2xl border-b border-primary/30"
                        >
                            <div className="max-w-5xl mx-auto p-6 md:p-10">

                                {/* Input Header */}
                                <div className="flex items-center gap-4 border-b-2 border-gray-100 dark:border-gray-800 pb-6">
                                    <div className="bg-primary/10 p-3 rounded-full">
                                        <Search className="text-primary w-4 h-4" />
                                    </div>
                                    <input
                                        autoFocus
                                        value={searchQuery}
                                        className="flex-1 bg-transparent text-xl md:text-2xl outline-none dark:text-white font-medium placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                        placeholder="Find your next hobby..."
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="text-xs font-bold text-primary hover:underline"
                                        >
                                            Clear
                                        </button>
                                    )}
                                    <button
                                        // onClick={() => setIsSearchOpen(false)}
                                        onClick={closeSearch}
                                        className="group p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                    >
                                        <X className="w-8 h-8 text-gray-400 group-hover:text-red-500 transition-colors" />
                                    </button>
                                </div>

                                {/* Results Body */}
                                <div className="py-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                    {isSearching ? (
                                        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                                            <Loader2 className="animate-spin w-10 h-10 mb-2 text-primary" />
                                            <p className="animate-pulse">Scanning the Hub...</p>
                                        </div>
                                    ) : searchQuery === "" ? (
                                        <div className="flex flex-col gap-2">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Suggestions</p>
                                            <div className="flex gap-2 flex-wrap mt-2">
                                                {['Coffee', 'Photography', 'Coding', 'Fitness'].map(tag => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => setSearchQuery(tag)}
                                                        className="px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm hover:bg-primary hover:text-white transition"
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : filteredResults.length > 0 ? (
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                                                Found {filteredResults.length} Matching Circles
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {filteredResults.map(group => (
                                                    <Link
                                                        key={group._id}
                                                        to={`/groupDetails/${group._id}`}
                                                        // onClick={() => setIsSearchOpen(false)}
                                                        onClick={closeSearch}
                                                        className="flex items-center gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-transparent hover:border-primary hover:bg-white dark:hover:bg-gray-800 transition-all group shadow-sm hover:shadow-md"
                                                    >
                                                        <div className="relative overflow-hidden w-16 h-16 rounded-xl">
                                                            <img src={group.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="font-bold text-gray-900 dark:text-gray-100 truncate group-hover:text-primary transition-colors">
                                                                {group.name}
                                                            </h4>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold uppercase">
                                                                    {group.category}
                                                                </span>
                                                                <span className="text-xs text-gray-400">
                                                                    {group.membersCount || 0} members
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="text-5xl mb-4">🔍</div>
                                            <p className="text-gray-500 text-lg">No results found for "<span className="text-primary font-semibold">{searchQuery}</span>"</p>
                                            <p className="text-sm text-gray-400 mt-1">Try searching for a different category or hobby.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Hint */}
                                <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                    <span>Press <kbd className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-600">ESC</kbd> to close</span>
                                    <span>Search powered by HobbyHub Engine</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
