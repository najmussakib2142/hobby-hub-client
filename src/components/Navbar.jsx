import React, { use, } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import Swal from 'sweetalert2';
import { LuMoon, LuSun } from 'react-icons/lu';
import toast from 'react-hot-toast';
import { useTheme } from '../provider/ThemeContext';

const Navbar = () => {
    const { user, logOut } = use(AuthContext)
    const { theme, toggleTheme } = useTheme();

    const handleLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1F1A70",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, log me out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Logged out!",
                            text: "You have been successfully logged out.",
                            icon: "success"
                        });
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    })
            }
        })
    }

    const links = <>
        <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/">Home</NavLink></li>
        <li className='text-[#101828]  dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/AllGroups">All Groups</NavLink></li>
        <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="/createGroup">Create Group </NavLink></li>
        {user && (
            <>
                <li className='text-[#101828] dark:text-gray-100 hover:text-primary dark:hover:text-secondary'><NavLink to="myGroups">My Groups </NavLink></li>
            </>
        )}
    </>

    return (
        <div>
            <div>
                <div className="navbar lg:fixed py-0  sticky top-0 z-50 md:px-8 lg:px-12 bg-base-100/80 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 backdrop-blur transition-all duration-300 shadow-md">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm left-0 text-[#101828] dropdown-content bg-base-100  z-1 w-[80vw] p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        <Link to="/" className="font-bold text-2xl"><span className='text-primary'>HobbyHub</span><span className='text-secondary'></span></Link>

                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu text-[#101828] menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end md:gap-3 gap-1">
                        <div>
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
                        </div>
                        <div className="relative group">

                            {user && (
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <Link to="/">
                                        <img
                                            className="w-12 dark:border dark:border-gray-500 h-12 rounded-full object-cover"
                                            src={`${user ? user.photoURL : "https://i.ibb.co/VWqpdVpB/user.pngs"}`}
                                            alt="User"
                                        />
                                    </Link>
                                </div>
                            )}

                            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-max bg-gray-700 text-white text-xs font-medium py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-20">
                                {user?.displayName || user?.email}
                            </div>
                        </div>

                        {
                            user ? <Link onClick={handleLogOut} to="/" className="btn border-primary text-primary hover:bg-primary hover:text-white hover:border-primary">Logout</Link>
                                : <Link to="auth/login" className="btn border-primary text-primary  hover:bg-primary hover:text-white hover:border-primary">Login</Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;