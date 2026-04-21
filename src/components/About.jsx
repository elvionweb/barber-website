import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const AnimatedCounter = ({ from, to, suffix, duration }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let current = from;
      const stepTime = Math.abs(Math.floor(duration / (to - from)));
      const timer = setInterval(() => {
        current += 1;
        setCount(current);
        if (current >= to) {
          setCount(to);
          clearInterval(timer);
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  return (
    <section
      className="relative min-h-[98vh] flex items-center justify-center bg-cover bg-center py-20"
      style={{ backgroundImage: "url('/Mc4.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl px-6 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          About <span className="text-accent">EliteCuts</span>
        </h2>

        <p className="text-gray-300 mb-4 text-lg leading-relaxed">
          EliteCuts is more than a barbershop; it's a premium grooming experience.
          We specialize in precision cuts, modern fades, and clean beard
          styling for anyone who values confidence and excellence.
        </p>

        <p className="text-gray-300 mb-10 text-lg leading-relaxed">
          With years of experience and attention to detail, we combine classic
          barbering with modern techniques to deliver sharp, consistent
          results every time.
        </p>

        <button 
           onClick={() => {
              const section = document.getElementById('booking');
              if (section) {
                  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                  window.location.href = '/#booking';
              }
           }}
           className="bg-accent text-[#111111] px-10 py-4 rounded-md font-bold text-lg hover:opacity-90 transition mb-12"
        >
          Book Your Cut
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 border-t border-gray-700 pt-10">
            <div className="text-center bg-[#111111]/40 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                <div className="text-5xl font-bold text-accent mb-2">
                    <AnimatedCounter from={0} to={500} suffix="+" duration={2000} />
                </div>
                <div className="text-sm font-bold tracking-widest text-gray-300 uppercase">Happy Clients</div>
            </div>
            <div className="text-center bg-[#111111]/40 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                <div className="text-5xl font-bold text-accent mb-2">
                    <AnimatedCounter from={0} to={3} suffix="" duration={1000} />
                </div>
                <div className="text-sm font-bold tracking-widest text-gray-300 uppercase">Expert Barbers</div>
            </div>
            <div className="text-center bg-[#111111]/40 p-6 rounded-xl backdrop-blur-sm border border-gray-800">
                <div className="text-5xl font-bold text-accent mb-2">
                    <AnimatedCounter from={0} to={5} suffix="" duration={1500} />
                </div>
                <div className="text-sm font-bold tracking-widest text-gray-300 uppercase">Years Experience</div>
            </div>
        </div>

      </motion.div>
    </section>
  );
};

export default About;