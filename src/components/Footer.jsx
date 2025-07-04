import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaYoutube, } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Footer = () => {
    return (
        <nav>
            <footer className="bg-base-200 text-base-content pt-12 pb-12 lg:pb-5 mt-10 border-t border-base-300">
                <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-primary">HobbyHub</h2>
                        <p className="text-sm text-gray-500 mt-2">
                            Discover hobby groups, connect with others, and fuel your passions.
                        </p>
                        <div className="flex gap-4 mt-4 text-lg">
                            <a target="_blank"   href="https://www.facebook.com/programmingHero/" className="hover:text-primary"><FaFacebookF /></a>
                            <a target="_blank" href="https://www.instagram.com/programminghero/?hl=en" className="hover:text-primary"><FaInstagram /></a>
                            <a target="_blank" href="https://www.youtube.com/c/ProgrammingHeroCommunity" className="hover:text-primary"><FaYoutube /></a>
                            <a href="web@programming-hero.com" className="hover:text-primary"><FaEnvelope /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li className='text-[#101828]'><NavLink to="/">Home </NavLink></li>
                            <li className='text-[#101828]'><NavLink to="/AllGroups">All Groups</NavLink></li>
                            <li className='text-[#101828]'><NavLink to="/createGroup">Create Group </NavLink></li>
                            <li className='text-[#101828]'><NavLink to="/myGroups">My Groups </NavLink></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Contact</h3>
                        <p className="text-sm text-gray-500">📧 info@hobbyhub.com</p>
                        <p className="text-sm text-gray-500">📍 Dhaka, Bangladesh</p>
                        <p className="text-sm text-gray-500 mt-2">Open: 9:00AM - 6:00PM</p>
                    </div>

                </div>

                {/* Bottom */}
                <div className="text-center text-xs text-gray-500 mt-4 mb-2 lg:mt-8 border-t border-base-300 pt-4">
                    &copy; {new Date().getFullYear()} HobbyHub. All rights reserved.
                </div>


            </footer>
            <div className="fixed bottom-1 left-0 right-0 z-50 bg-base-100 border-t border-gray-300 shadow-md px-6 py-3 flex justify-between text-sm lg:hidden">
                <NavLink to="/" className="text-[#101828] font-medium hover:text-blue-600" >Home</NavLink>
                <NavLink to="/AllGroups" className="text-[#101828] font-medium hover:text-blue-600">All Groups</NavLink>
                <NavLink to="/createGroup" className="text-[#101828] font-medium hover:text-blue-600">Create Group </NavLink>
                <NavLink to="/myGroups" className="text-[#101828] font-medium hover:text-blue-600">My Groups </NavLink>
            </div>

        </nav>

    );
};

export default Footer;
