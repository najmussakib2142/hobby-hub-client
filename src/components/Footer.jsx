import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope, FaYoutube, FaPaperPlane } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { LuMail, LuMapPin, LuClock } from "react-icons/lu";

const Footer = () => {

    const handleSubscribe = (e) => {
        e.preventDefault(); // Prevents the page from refreshing

        Swal.fire({
            title: 'Coming Soon!',
            text: 'The newsletter feature is currently under development. Stay tuned!',
            icon: 'info',
            confirmButtonColor: '#570df8', // Use your primary color hex here
            buttonsStyling: true,
            customClass: {
                confirmButton: 'btn btn-primary btn-sm' // Matches your DaisyUI style
            }
        });
    };

    return (
        <footer className="bg-[#fcfcfd] dark:bg-slate-950 text-base-content border-t border-base-300">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Info */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-primary tracking-tight">HobbyHub</h2>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            The ultimate community for enthusiasts. Discover hobby groups, connect with like-minded people, and fuel your daily passions.
                        </p>
                        <div className="flex gap-3">
                            <a target="_blank" rel="noreferrer" href="#" className="p-2 bg-base-300 rounded-full hover:bg-primary hover:text-white transition-all duration-300"><FaFacebookF /></a>
                            <a target="_blank" rel="noreferrer" href="#" className="p-2 bg-base-300 rounded-full hover:bg-primary hover:text-white transition-all duration-300"><FaInstagram /></a>
                            <a target="_blank" rel="noreferrer" href="#" className="p-2 bg-base-300 rounded-full hover:bg-primary hover:text-white transition-all duration-300"><FaYoutube /></a>
                            <a href="mailto:info@hobbyhub.com" className="p-2 bg-base-300 rounded-full hover:bg-primary hover:text-white transition-all duration-300"><FaEnvelope /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:ml-10">
                        <h3 className="text-lg font-bold mb-5">Explore</h3>
                        <ul className="space-y-3 text-sm">
                            <li><NavLink to="/" className="hover:text-primary transition-colors">Home</NavLink></li>
                            <li><NavLink to="/AllGroups" className="hover:text-primary transition-colors">All Groups</NavLink></li>
                            <li><NavLink to="/createGroup" className="hover:text-primary transition-colors">Create Group</NavLink></li>
                            <li><NavLink to="/myGroups" className="hover:text-primary transition-colors">My Groups</NavLink></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col">
                        <h3 className="text-lg font-bold mb-6 tracking-tight text-base-content">
                            Support & Help
                        </h3>
                        <div className="space-y-5">
                            {/* Email - Now a clickable link */}
                            <div className="flex items-start gap-3 group">
                                <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <LuMail className="text-sm" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Us</p>
                                    <a href="mailto:info@hobbyhub.com" className="text-sm font-medium hover:text-primary transition-colors">
                                        info@hobbyhub.com
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-3 group">
                                <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <LuMapPin className="text-sm" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Visit Us</p>
                                    <p className="text-sm font-medium">Dhaka, Bangladesh</p>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex items-start gap-3 group">
                                <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <LuClock className="text-sm" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Business Hours</p>
                                    <p className="text-sm font-medium">9:00 AM — 6:00 PM <span className="text-gray-400 font-normal">(Sun-Thu)</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-5 tracking-tight text-base-content">Stay Updated</h3>
                        <p className="text-sm text-gray-500 mb-4">Subscribe to get the latest hobby trends.</p>

                        <form onSubmit={handleSubscribe} className="flex group">
                            <input
                                type="email"
                                required
                                placeholder="Your email"
                                className="input input-bordered input-sm w-full rounded-r-none focus:outline-none focus:border-primary transition-colors"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm rounded-l-none border-none hover:bg-primary-focus px-5"
                            >
                                <FaPaperPlane className="text-xs" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} HobbyHub Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;