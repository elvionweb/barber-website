import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Daniel A.",
    review: "This is hands down one of the best barbing experiences I've had. Clean environment, sharp tools, and absolute attention to detail. Every haircut comes out neat, fresh, and professional. Highly recommended.",
  },
  {
    name: "Michael O.",
    review: "I've been cutting my hair here for years, and I wouldn't go anywhere else. The consistency, respect, and quality are unmatched. Anytime I leave the chair, I feel confident and proud of my look.",
  },
  {
    name: "James K.",
    review: "If you want your haircut to turn heads, this is the place. Clean fades, perfect line-ups, and modern styles every time. This barber understands today's trends and executes them flawlessly..",
  },
  {
    name: "Collins P",
    review: "It was my first visit, and I was seriously impressed. From the welcome to the final look, everything was smooth and professional. I walked in unsure and walked out looking sharp. I'm definitely coming back.",
  },
  {
    name: "Timothy G",
    review: "This haircut completely changed my look. The precision and creativity are on another level. I didn't just get a haircut—I got a confidence boost. People keep asking where I cut my hair.",
  },
  {
    name: "Festus Q.",
    review: "Great vibes, friendly conversations, and top notch service. You don't just come here for a haircut; you come for the experience. Always fresh, always clean, always welcoming.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-2 md:py-3 bg-[#0b0b0b]">
      <div className="max-w-7xl mx-auto px-5">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8">
          What Clients <span className="text-accent">Say</span>
        </h2>

        <div className="grid gap-3 md:gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="bg-blue-700 border border-gray-800 p-6 rounded-xl"
            >
              <p className="text-gray-300 mb-2">“{item.review}”</p>
              <h4 className="font-semibold text-accent">{item.name}</h4>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
