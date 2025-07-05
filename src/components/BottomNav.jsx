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
      className={`fixed bottom-0 left-0 right-0 z-50 md:px-8 bg-base-100/80 backdrop-blur border-t border-gray-300 shadow-md px-2 py-3 flex justify-around text-sm lg:hidden transition-all duration-300 ${
        showNav ? "translate-y-0" : "translate-y-24"
      }`}
    >
      <NavLink to="/" className="text-[#101828] font-medium hover:text-primary">Home</NavLink>
      <NavLink to="/AllGroups" className="text-[#101828] font-medium hover:text-primary">All Groups</NavLink>
      <NavLink to="/createGroup" className="text-[#101828] font-medium hover:text-primary">Create Group</NavLink>
      <NavLink to="/myGroups" className="text-[#101828] font-medium hover:text-primary">My Groups</NavLink>
    </div>
  );
};

export default BottomNav;
