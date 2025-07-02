import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, } from "react-icons/fa";
import { Link, NavLink } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-base-200 text-base-content pt-12 pb-6 mt-10 border-t border-base-300">
            <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand Info */}
                <div>
                    <h2 className="text-3xl font-bold text-primary">HobbyHub</h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Discover hobby groups, connect with others, and fuel your passions.
                    </p>
                    <div className="flex gap-4 mt-4 text-lg">
                        <a href="#" className="hover:text-primary"><FaFacebookF /></a>
                        <a href="#" className="hover:text-primary"><FaInstagram /></a>
                        <a href="#" className="hover:text-primary"><FaTwitter /></a>
                        <a href="mailto:info@hobbyhub.com" className="hover:text-primary"><FaEnvelope /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/AllGroups">All Groups</NavLink></li>
                        <li><NavLink to="/createGroup">Create Group </NavLink></li>
                        <li><NavLink to="/my-events">My Groups </NavLink></li>
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
            <div className="text-center text-xs text-gray-500 mt-8 border-t border-base-300 pt-4">
                &copy; {new Date().getFullYear()} HobbyHub. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
