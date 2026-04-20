import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { id: 1, src: "/Mc.jpeg", category: "Men" },
  { id: 2, src: "/Mc1.jpeg", category: "Men" },
  { id: 3, src: "/Mc2.jpeg", category: "Women" },
  { id: 4, src: "/Mc3.jpeg", category: "Women" },
  { id: 5, src: "/Mc4.jpeg", category: "Kids" },
  { id: 6, src: "/Mc5.jpeg", category: "Kids" },
  { id: 7, src: "/Mc6.jpeg", category: "Men" },
  { id: 8, src: "/Mc7.jpeg", category: "Women" }
];

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [activeIdx, setActiveIdx] = useState(null);

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  const openLightbox = (index) => setActiveIdx(index);
  const closeLightbox = () => setActiveIdx(null);
  
  const showPrev = (e) => {
      e.stopPropagation();
      setActiveIdx(prev => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };
  
  const showNext = (e) => {
      e.stopPropagation();
      setActiveIdx(prev => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const tabs = ['All', 'Men', 'Women', 'Kids'];

  return (
    <section className="py-16 bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          Our <span className="text-accent">Work</span>
        </h2>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-10 overflow-x-auto pb-2">
            {tabs.map(tab => (
                <button 
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-6 py-2 rounded-full font-bold transition-colors whitespace-nowrap ${filter === tab ? 'bg-accent text-[#111111]' : 'border border-gray-700 text-gray-400 hover:text-white'}`}
                >
                    {tab}
                </button>
            ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <AnimatePresence>
              {filteredImages.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-square relative group overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                    <img
                      src={item.src}
                      alt={`Gallery work ${item.category}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white font-bold tracking-widest uppercase">{item.category}</span>
                    </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
            {activeIdx !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
                onClick={closeLightbox}
              >
                <button className="absolute top-6 right-6 text-white text-4xl hover:text-accent z-50">✕</button>
                
                <button onClick={showPrev} className="absolute left-4 md:left-10 text-white text-5xl hover:text-accent z-50 select-none px-4 py-8">‹</button>
                
                <motion.img 
                  key={activeIdx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  src={filteredImages[activeIdx].src} 
                  className="max-h-[85vh] max-w-full rounded-lg shadow-2xl object-contain" 
                />
                
                <button onClick={showNext} className="absolute right-4 md:right-10 text-white text-5xl hover:text-accent z-50 select-none px-4 py-8">›</button>
                
                <div className="absolute bottom-6 text-white text-sm font-bold tracking-widest">
                    {activeIdx + 1} / {filteredImages.length}
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
