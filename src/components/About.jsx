import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      className="relative h-[98vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Mc4.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          About <span className="text-accent">EliteCuts</span>
        </h2>

        <p className="text-gray-300 mb-4 leading-relaxed">
          EliteCuts is more than a barbershop it's a grooming experience.
          We specialize in precision cuts, modern fades, and clean beard
          styling for men who value confidence and excellence.
        </p>

        <p className="text-gray-300 mb-6 leading-relaxed">
          With years of experience and attention to detail, we combine classic
          barbering with modern techniques to deliver sharp, consistent
          results every time.
        </p>

        <button className="bg-accent text-black px-8 py-3 rounded-md font-semibold hover:opacity-90 transition">
          Book Your Cut
        </button>
      </motion.div>
    </section>
  );
};

export default About;