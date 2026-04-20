import { motion } from "framer-motion";

const services = [
  { name: "Classic Haircut", price: "₦5,000", desc: "Clean, sharp, professional cut." },
  { name: "Fade Cut", price: "₦6,000", desc: "Modern fade with precision." },
  { name: "Beard Trim", price: "₦3,000", desc: "Sharp beard shaping & lining." },
  { name: "Kids Cut", price: "₦4,000", desc: "Comfortable, stylish kids haircut." },
  { name: "Women Classic Haircut", price: "₦6,000", desc: "Clean and sharp for women." },
  { name: "Women Fade Cut", price: "₦5,000", desc: "Modern fade with precision for women" },
  { name: "Women Shaving", price: "₦4,000", desc: "Comfortable Shaving." },
  { name: "Kids Shaving", price: "₦2,000", desc: "stylish for kids." },
];

const Services = () => {
  return (
    <section className="overflow-hidden md:pb-8 pt-8 md:pt-8 bg-[#0b0b0b]">
      <div className="max-w-7xl mx-auto px-4">
        
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 md:mb-8 md:py-6 ">
          Our <span className="text-accent">Services</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-blue-700 border border-gray-800 rounded-xl p-4 md:p-8 text-center"
            >
              <h3 className="text-xl font-semibold mb-1 md:mb-2">{service.name}</h3>
              <p className="text-accent text-2xl font-bold mb-1 md:mb-2">{service.price}</p>
              <p className="text-gray-400 text-sm mb-4">{service.desc}</p>
              <button 
                onClick={() => window.location.href = `/?reschedule=false&service=${encodeURIComponent(service.name)}#booking`} 
                className="mt-auto w-full bg-gray-800 hover:bg-accent hover:text-[#111111] py-2 rounded font-bold text-sm transition-colors"
               >
                Book This Service
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
