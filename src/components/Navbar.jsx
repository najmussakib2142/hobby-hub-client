import React, { use, } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthContext';
import Swal from 'sweetalert2';
import { LuMoon, LuSun } from 'react-icons/lu';

const Navbar = () => {
    const { user, logOut } = use(AuthContext)
    // const [theme, setTheme] = useState("")

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
                        console.log(error);
                    })
            }
        })
    }

    const links = <>
        <li className='text-[#101828]'><NavLink to="/">Home</NavLink></li>
        <li className='text-[#101828]'><NavLink to="/AllGroups">All Groups</NavLink></li>
        <li className='text-[#101828]'><NavLink to="/createGroup">Create Group </NavLink></li>
        <li className='text-[#101828]'><NavLink to="myGroups">My Groups </NavLink></li>
    </>

    return (
        <div>
            <div>
                <div className="navbar sticky top-0 z-50 md:px-12 bg-base-100 shadow-sm">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm text-[#101828] dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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
                    <div className="navbar-end gap-3">
                        {/* <div className='flex gap-1.5 bg-zinc-100 dark:bg-zinc-600 p-2 rounded-xl'>
                            <button className='bg-transparent p-2 hover:bg-zinc-800 dark:bg-zinc-100/10 rounded-lg text-black dark:text-white'
                                onClick={() => {
                                    document.documentElement.setAttribute("data-theme", "light");
                                }}                            >
                                <LuSun></LuSun>
                            </button>
                            <button
                                onClick={() => {
                                    document.documentElement.setAttribute("data-theme", "dark");
                                }} className='bg-transparent p-2 hover:bg-zinc-200 dark:bg-zinc-100/10 rounded-lg text-black dark:text-white'>
                                <LuMoon></LuMoon>
                            </button>
                        </div> */}
                        {/* <div className="flex gap-1.5 bg-zinc-100 dark:bg-zinc-600 p-2 rounded-xl">
                            <button
                                className="bg-transparent p-2 hover:bg-zinc-800 dark:bg-zinc-100/10 rounded-lg text-black dark:text-white"
                                onClick={() => document.documentElement.setAttribute("data-theme", "light")}
                            >
                                <LuSun />
                            </button>
                            <button
                                className="bg-transparent p-2 hover:bg-zinc-200 dark:bg-zinc-100/10 rounded-lg text-black dark:text-white"
                                onClick={() => document.documentElement.setAttribute("data-theme", "dark")}
                            >
                                <LuMoon />
                            </button>
                        </div> */}
                        {/* <span className="hidden md:inline text-sm font-medium text-gray-600">{user && user.email}</span> */}
                        <div className="relative group">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <Link to="/">
                                    <img
                                        className="w-12 h-12 rounded-full object-cover"
                                        src={`${user ? user.photoURL : "https://i.ibb.co/VWqpdVpB/user.pngs"}`}
                                        alt="User"
                                    />
                                </Link>
                            </div>

                            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-max bg-gray-700 text-white text-xs font-medium py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition duration-200 whitespace-nowrap z-20">
                                {user?.displayName || user?.email}
                            </div>
                        </div>

                        {
                            user ? <Link onClick={handleLogOut} to="/" className="btn border-primary text-primary hover:bg-primary hover:text-white hover:border-primary">Logout</Link>
                                : <Link to="auth/login" className="btn border-primary text-primary hover:bg-primary hover:text-white hover:border-primary">Login</Link>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;