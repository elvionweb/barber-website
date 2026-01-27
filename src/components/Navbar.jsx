import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = ({ scrollToSection, refs }) => {
  const [open, setOpen] = useState(false);

  const {
    homeRef,
    aboutRef,
    servicesRef,
    galleryRef,
    testimonialsRef,
    bookingRef,
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
          <li onClick={() => handleScroll(galleryRef)} className="hover:text-accent cursor-pointer">
            Gallery
          </li>
          <li onClick={() => handleScroll(testimonialsRef)} className="hover:text-accent cursor-pointer">
            Reviews
          </li>
          <li onClick={() => handleScroll(bookingRef)} className="hover:text-accent cursor-pointer">
            Contact
          </li>
        </ul>

        {/* CTA */}
        <button
          onClick={() => handleScroll(bookingRef)}
          className="hidden md:block bg-accent text-black px-6 py-2 rounded-md font-semibold hover:opacity-90"
        >
          Book Now
        </button>

        {/* Mobile Menu Icon */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black px-6 py-3 space-y-2">
          <p onClick={() => handleScroll(homeRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            Home
          </p>
          <p onClick={() => handleScroll(aboutRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            About
          </p>
          <p onClick={() => handleScroll(servicesRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            Services
          </p>
          <p onClick={() => handleScroll(galleryRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            Gallery
          </p>
          <p onClick={() => handleScroll(testimonialsRef)} className="border-b border-gray-800 pb-2 cursor-pointer">
            Reviews
          </p>

         <div className="overflow-hidden flex justify-center">
            <button className="bg-accent text-black py-3 px-3 rounded-lg font-semibold hover:opacity-90">
            Book Now
          </button>
          </div>
        </div>

        
      )}
    </header>
  );
};

export default Navbar;

