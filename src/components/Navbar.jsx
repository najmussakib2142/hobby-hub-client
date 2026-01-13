import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useTheme } from "../provider/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setOpen] = useState(false);
    const location = useLocation();

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
        `px-3 py-2 rounded-md text-sm font-medium transition
     ${isActive
            ? "text-indigo-600 dark:text-indigo-400"
            : "text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
        }`;

    const links = (
        <>
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/AllGroups" className={navLinkClass}>All Groups</NavLink>
            <NavLink to="/createGroup" className={navLinkClass}>Create Group</NavLink>
            {user && (
                <NavLink to="/myGroups" className={navLinkClass}>My Groups</NavLink>
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
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

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
                                className="text-sm px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/auth/login"
                                className="text-sm px-4 py-2 rounded-md border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition"
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
        </>
    );
};

export default Navbar;
