import React from "react";
import { motion } from "framer-motion";

const defaultBarbers = [
  {
    id: 1,
    name: "James \"The Blade\"",
    title: "Fade Specialist",
    specialties: ["Fade", "Beard Design"],
    image: "/c2c.jpeg",
    rating: 4.9,
    reviews: 142,
  },
  {
    id: 2,
    name: "Marcus Stylez",
    title: "Classic & Beards",
    specialties: ["Classic Cut", "Kids Cut"],
    image: "/c2c1.jpeg",
    rating: 4.8,
    reviews: 98,
  },
  {
    id: 3,
    name: "Tony Sharp",
    title: "All-Rounder",
    specialties: ["Women Fade", "Hair Design"],
    image: "/c2c2.jpeg",
    rating: 4.7,
    reviews: 76,
  },
];

const Barbers = ({ barbersRef }) => {
  return (
    <section
      ref={barbersRef}
      id="barbers"
      className="py-20 bg-[#0b0b0b] text-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our <span className="text-accent">Barbers</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our team of expert stylists are dedicated to crafting your perfect
            look with precision and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {defaultBarbers.map((barber, index) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden hover:border-accent transition duration-300"
            >
              <div className="h-64 bg-cyan-900 flex justify-center items-center overflow-hidden">
                <img src={barber.image} alt={barber.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-2xl font-bold">{barber.name}</h3>
                    <p className="text-accent font-semibold">{barber.title}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 text-sm">
                      <span>★</span>{" "}
                      <span className="text-white font-bold">
                        {barber.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      ({barber.reviews} reviews)
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 my-4">
                  {barber.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="bg-[#0b0b0b] border border-gray-700 text-xs px-2 py-1 rounded text-gray-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <button
                    onClick={(e) => {
                       e.preventDefault();
                       window.history.pushState({}, '', `/?reschedule=false&barber=${encodeURIComponent(barber.name)}#booking`);
                       const section = document.getElementById('booking');
                       if (section) {
                           section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                       } else {
                           window.location.href = `/?reschedule=false&barber=${encodeURIComponent(barber.name)}#booking`;
                       }
                    }}
                    className="w-full bg-gray-800 hover:bg-accent hover:text-[#111111] transition-colors py-3 rounded-lg font-bold"
                  >
                    Book with {barber.name.split(" ")[0]}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Barbers;
