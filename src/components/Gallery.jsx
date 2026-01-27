import { useState } from "react";

const images = [
  "/Mc.jpeg",
  "/Mc.jpeg",
  "/Mc2.jpeg",
  "/Mc2.jpeg",
  "/Mc4.jpeg",
  "/Mc4.jpeg",
];

const Gallery = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="py-10 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10">
          Our <span className="text-accent">Work</span>
        </h2>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setActive(img)}
              className="cursor-pointer object-cover rounded-lg hover:opacity-80 transition"
            />
          ))}
        </div>

        {/* Lightbox */}
        {active && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setActive(null)}
          >
            <img src={active} className="max-h-[90vh] rounded-lg" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
