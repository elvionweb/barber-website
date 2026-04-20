import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import Elvionwebicon from "../assets/Elvionwebicon.jpg";

const Footer = () => {
  return (
    <footer className="bg-blue-700 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-8 md:gap-4 border-b border-gray-800 mb-6">
        {/* Barber Brand & Hours */}
        <div className="text-center md:text-left flex-1 md:pr-4">
          <h3 className="text-2xl font-bold text-accent mb-2">EliteCuts</h3>
          <p className="text-gray-200 text-sm mb-4">
            Precision grooming for modern men, women, and kids.
          </p>
          <div className="text-sm text-gray-300 border-l-2 border-accent pl-3 py-1 inline-block text-left mx-auto md:mx-0">
            <p className="font-bold mb-1">Business Hours:</p>
            <p>Mon–Sat: 9:00 AM – 6:00 PM</p>
            <p className="text-gray-400">Sun: Closed</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left flex-1">
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="text-sm text-gray-300 flex flex-col gap-2">
                <li><a href="/#services" className="hover:text-accent transition">Services</a></li>
                <li><a href="/#gallery" className="hover:text-accent transition">Gallery</a></li>
                <li><a href="/#booking" className="hover:text-accent transition">Book Now</a></li>
                <li><a href="/shop" className="hover:text-accent transition">Shop</a></li>
                <li><a href="/giftcards" className="hover:text-accent transition">Gift Cards</a></li>
                <li><a href="/admin" className="hover:text-accent transition">Admin</a></li>
            </ul>
        </div>

        {/* Social Icons & Contact */}
        <div className="text-center md:text-left flex-1 flex flex-col items-center md:items-start">
            <h4 className="text-white font-bold mb-4">Connect With Us</h4>
            <div className="flex gap-4 text-2xl mb-4">
              <FaInstagram className="cursor-pointer text-red-400 hover:text-accent transition hover:scale-110" />
              <FaFacebookF className="cursor-pointer text-gray-200 hover:text-accent transition hover:scale-110" />
              <FaWhatsapp onClick={() => window.open("https://wa.me/2347068826788")} className="cursor-pointer text-green-400 hover:text-accent transition hover:scale-110" />
            </div>
            <p className="text-gray-300 text-sm">Elite Avenue, G.R.A</p>
            <p className="text-gray-300 text-sm">Benin City, Edo State</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <div className="text-center md:text-left text-xs text-gray-200">
          © {new Date().getFullYear()} EliteCuts. All rights reserved.
        </div>
        
        {/* Elvionweb Branding */}
        <div className="flex items-center justify-center md:justify-end gap-2 text-xs text-gray-200 whitespace-nowrap bg-black/20 px-3 py-1.5 rounded-full border border-gray-800">
          <span>Built by </span>
          <a
            href="https://elvionweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 font-semibold hover:underline"
          >
            Elvionweb
          </a>
          <img
            src={Elvionwebicon}
            alt="Elvionweb"
            className="h-6 w-6 opacity-90 hover:opacity-100 transition rounded-full"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
