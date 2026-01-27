import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import Elvionwebicon from "../assets/Elvionwebicon.jpg";

const Footer = () => {
  return (
    <footer className="bg-blue-700 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Barber Brand */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-accent">EliteCuts</h3>
          <p className="text-gray-200 text-xs">
            Precision grooming for modern men
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-3 text-lg">
          <FaInstagram className="cursor-pointer text-red-400 h-5 w-5 hover:text-accent transition" />
          <FaFacebookF className="cursor-pointer text-gray-200 h-5 w-5 hover:text-accent transition" />
          <FaWhatsapp className="cursor-pointer text-green-400 h-5 w-5 hover:text-accent transition" />
        </div>

        {/* Elvionweb Branding */}
        <div className="flex items-center justify-center md:justify-end gap-2 text-xs text-gray-200 whitespace-nowrap">
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
            className="h-7 w-7 opacity-80 hover:opacity-100 transition"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-[11px] text-gray-200 pb-4">
        © {new Date().getFullYear()} EliteCuts. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
