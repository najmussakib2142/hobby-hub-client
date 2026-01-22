import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";

const BottomNav = () => {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setShowNav(true); 
      } else {
        setShowNav(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:px-8 bg-base-100/80 dark:bg-gray-800 backdrop-blur border-t border-gray-300 dark:border-gray-600 shadow-md px-2 py-3 flex justify-around text-sm lg:hidden transition-all duration-300 ${
        showNav ? "translate-y-0" : "translate-y-24"
      }`}
    >
      <NavLink to="/" className="text-gray-900 dark:text-gray-100 font-medium hover:text-primary dark:hover:text-secondary">Home</NavLink>
      <NavLink to="/AllGroups" className="text-gray-900 dark:text-gray-100 font-medium hover:text-primary dark:hover:text-secondary">All Groups</NavLink>
      <NavLink to="/createGroup" className="text-gray-900 dark:text-gray-100 font-medium hover:text-primary dark:hover:text-secondary">Build Space</NavLink>
      <NavLink to="/myGroups" className="text-gray-900 dark:text-gray-100 font-medium hover:text-primary dark:hover:text-secondary">My Spaces</NavLink>
    </div>
  );
};

export default BottomNav;
