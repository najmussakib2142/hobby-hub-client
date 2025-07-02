import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/AllGroups">All Groups</NavLink></li>
        <li><NavLink to="/createGroup">Create Group </NavLink></li>
        <li><NavLink to="/my-events">My Groups </NavLink></li>
    </>

    return (
        <div>
            <div>
                <div className="navbar sticky top-0 z-50 px-12 bg-base-100 shadow-sm">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}
                            </ul>
                        </div>
                        {/* <Link to="/" className="font-bold text-2xl"><span className='text-[#3B25C1]'>Hobby</span><span className='text-[#F97316]'>Hub</span></Link> */}
                        <Link to="/" className="font-bold text-2xl"><span className='text-primary'>HobbyHub</span><span className='text-[#F97316]'></span></Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end gap-3">
                        {/* <span className="hidden md:inline text-sm font-medium text-gray-600">{user && user.email}</span> */}

                        <div className="relative group">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <Link to="/profile">
                                    <img
                                        className="w-12 h-12 rounded-full object-cover"
                                        // src={user?.photoURL || userIcon}
                                        alt="User"
                                    />
                                </Link>
                            </div>

                            {/* Tooltip on hover */}
                            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-max bg-gray-700 text-white text-xs font-medium py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-20">
                                {/* {user?.displayName || user?.email} */}
                            </div>
                        </div>

                        {/* {
                            user ? <Link onClick={handleLogOut} to="/" className="btn border-primary text-primary hover:bg-primary hover:text-white hover:border-primary">Logout</Link>
                                : <Link to="auth/login" className="btn border-primary text-primary hover:bg-primary hover:text-white hover:border-primary">Login</Link>
                        } */}
                        <Link to="auth/login" className="btn border-primary text-primary hover:bg-primary hover:text-white hover:border-primary">Login</Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;