import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/2347068826788?text=Hello%20I%20want%20to%20book%20a%20haircut"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 md:p-3 rounded-full shadow-lg hover:scale-110 transition"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
