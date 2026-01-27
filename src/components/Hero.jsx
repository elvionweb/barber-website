import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/Mc.jpeg",
  "/Mc1.jpeg",
  "/Mc2.jpeg",
  "/Mc3.jpeg",
  "/Mc4.jpeg",
  "/Mc5.jpeg",
  "/Mc6.jpeg",
  "/Mc7.jpeg",
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* IMAGE CAROUSEL */}
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt="Barber work showcase"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Precision Cuts. <span className="text-accent">Clean Styles.</span>
        </h1>

        <p className="text-gray-300 mb-8 text-base md:text-lg">
          Professional barbering for men, women and kid who value confidence, detail, and style.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-accent text-black px-6 py-3 sm:px-8 sm:py-3 rounded-md font-semibold hover:opacity-90 transition">
            Book Appointment
          </button>

          <button className="border border-accent px-6 py-3 sm:px-8 sm:py-3 rounded-md hover:bg-accent hover:text-black transition">
            View Services
          </button>
        </div>
      </motion.div>

      {/* INDICATORS */}
      <div className="absolute bottom-8 flex gap-2 z-10">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-accent" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
