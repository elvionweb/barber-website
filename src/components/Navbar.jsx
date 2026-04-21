import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import WalkInBadge from "./WalkInBadge";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

const Navbar = ({ scrollToSection, refs }) => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const {
    homeRef,
    aboutRef,
    servicesRef,
    barbersRef,
    galleryRef,
    testimonialsRef,
    bookingRef,
    contactRef,
  } = refs;

  const handleScroll = (ref) => {
    scrollToSection(ref);
    setOpen(false); // close mobile menu after click
  };

  return (
    <header className="fixed w-full z-50 bg-black/90 backdrop-blur">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <h1
          onClick={() => handleScroll(homeRef)}
          className="text-2xl font-bold text-accent cursor-pointer"
        >
          EliteCuts
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-sm uppercase">
          <li onClick={() => handleScroll(aboutRef)} className="hover:text-accent cursor-pointer">
            About
          </li>
          <li onClick={() => handleScroll(servicesRef)} className="hover:text-accent cursor-pointer">
            Services
          </li>
          <li onClick={() => handleScroll(barbersRef)} className="hover:text-accent cursor-pointer">
            Barbers
          </li>
          <li onClick={() => window.location.href = "/shop"} className="hover:text-accent cursor-pointer">
            Shop
          </li>
          <li onClick={() => window.location.href = "/giftcards"} className="hover:text-accent cursor-pointer">
            Gift Cards
          </li>
          <li onClick={() => handleScroll(galleryRef)} className="hover:text-accent cursor-pointer">
            Gallery
          </li>
          <li onClick={() => handleScroll(testimonialsRef)} className="hover:text-accent cursor-pointer">
            Reviews
          </li>
          <li onClick={() => handleScroll(contactRef)} className="hover:text-accent cursor-pointer">
            Contact
          </li>
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <WalkInBadge />
          <button
            onClick={() => {
              const section = document.getElementById('booking');
              if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                  window.location.href = '/#booking';
              }
              setOpen(false);
            }}
            className="bg-accent text-black px-6 py-2 rounded-md font-semibold hover:opacity-90"
          >
            Book Now
          </button>

          {user ? (
            <div className="relative group cursor-pointer ml-2">
               <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-accent font-bold uppercase border border-gray-700">
                  {user.name ? user.name[0] : 'U'}
               </div>
               <div className="absolute right-0 mt-2 w-48 bg-[#111111] border border-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto flex flex-col p-2">
                  <p className="text-gray-300 px-4 py-2 text-sm border-b border-gray-800 overflow-hidden text-ellipsis whitespace-nowrap">{user.name}</p>
                  <a href="/dashboard" className="text-white hover:text-accent px-4 py-2 text-sm transition mt-1">Dashboard</a>
                  <button onClick={logout} className="text-left text-red-400 hover:text-red-300 px-4 py-2 text-sm transition">Logout</button>
               </div>
            </div>
          ) : (
            <a href="/login" className="text-white hover:text-accent font-semibold ml-2 transition">
               Login
            </a>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
      {open && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-black px-6 py-3 space-y-2 overflow-hidden"
        >
          <p onClick={() => handleScroll(homeRef)} className="border-b border-gray-800 pb-2 cursor-pointer mt-2">
            Home
          </p>
          <p onClick={() => handleScroll(aboutRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            About
          </p>
          <p onClick={() => handleScroll(servicesRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            Services
          </p>
          <p onClick={() => handleScroll(barbersRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            Barbers
          </p>
          <p onClick={() => window.location.href = "/shop"} className="border-b border-gray-800 pb-2 cursor-pointer">
            Shop
          </p>
          <p onClick={() => window.location.href = "/giftcards"} className="border-b border-gray-800 pb-2 cursor-pointer">
            Gift Cards
          </p>
          <p onClick={() => handleScroll(galleryRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            Gallery
          </p>
          <p onClick={() => handleScroll(testimonialsRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            Reviews
          </p>
          <p onClick={() => handleScroll(contactRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            Contact
          </p>
         <div className="border-t border-gray-800 pt-3 mt-1 mb-2">
            {user ? (
               <div className="flex justify-between items-center px-1">
                  <span className="text-accent font-bold text-sm truncate max-w-[120px]">{user.name}</span>
                  <div className="flex gap-4">
                      <a href="/dashboard" className="text-white text-sm hover:underline">Dashboard</a>
                      <button onClick={logout} className="text-red-400 text-sm hover:underline">Logout</button>
                  </div>
               </div>
            ) : (
               <a href="/login" className="block text-center text-white hover:text-accent py-2 font-semibold border-b border-gray-800 mb-2">
                  Login
               </a>
            )}
         </div>

         <div className="overflow-hidden flex justify-center pt-2">
            <button onClick={() => {
              const section = document.getElementById('booking');
              if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                  window.location.href = '/#booking';
              }
              setOpen(false);
            }} className="bg-accent text-black py-3 px-3 rounded-lg font-semibold hover:opacity-90 w-full mb-2">
            Book Now
          </button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

