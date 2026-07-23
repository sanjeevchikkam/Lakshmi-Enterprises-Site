import React from 'react';
import { motion } from 'motion/react';

// Import brand image assets saved at src/assets/images/brand1.png ... brand7.png
import brand1 from '../assets/images/brand1.png';
import brand2 from '../assets/images/brand2.png';
import brand3 from '../assets/images/brand3.png';
import brand4 from '../assets/images/brand4.png';
import brand5 from '../assets/images/brand5.png';
import brand6 from '../assets/images/brand6.png';
import brand7 from '../assets/images/brand7.png';

export interface BrandItem {
  id: string;
  name: string;
  image: string;
  category: string;
}

export const BRANDS_LIST: BrandItem[] = [
  { id: 'milton', name: 'Milton', image: brand1, category: 'Flasks, Bottles & Casseroles' },
  { id: 'prestige', name: 'Prestige', image: brand2, category: 'Pressure Cookers & Cookware' },
  { id: 'preeti', name: 'Preeti', image: brand3, category: 'Mixer Grinders & Juicers' },
  { id: 'havells', name: 'Havells', image: brand4, category: 'Home & Kitchen Appliances' },
  { id: 'spotzero', name: 'Spotzero', image: brand5, category: 'Cleaning Tools & Mops' },
  { id: 'panasonic', name: 'Panasonic', image: brand6, category: 'Ovens & Electronics' },
  { id: 'ultra', name: 'Ultra', image: brand7, category: 'Tabletop Wet Grinders' },
];

export const Brands: React.FC = () => {
  // Triplicate array to achieve seamless infinite loop marquee scrolling
  const extendedBrands = [...BRANDS_LIST, ...BRANDS_LIST, ...BRANDS_LIST];

  return (
    <section 
      id="brands-section"
      className="relative w-full bg-white border-y border-gray-200 py-4 overflow-hidden select-none"
    >
      {/* Subtle edge gradient fade overlays */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 md:w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 md:w-24 bg-gradient-to-l from-white to-transparent" />

      {/* Single Row Horizontal Scrolling Container */}
      <div className="flex w-full overflow-hidden py-1">
        <motion.div
          className="flex items-center space-x-4 md:space-x-6 shrink-0"
          animate={{ x: ['0%', '-33.333%'] }}
          transition={{
            ease: 'linear',
            duration: 25,
            repeat: Infinity,
          }}
        >
          {extendedBrands.map((brand, idx) => (
            <motion.div
              key={`${brand.id}-${idx}`}
              whileHover={{ scale: 1.06, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="group relative flex flex-col items-center justify-between w-40 md:w-48 h-28 rounded-xl bg-white border border-gray-200 hover:border-amber-500/80 p-2.5 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer shrink-0"
            >
              {/* Direct Brand Image Display */}
              <div className="flex items-center justify-center w-full h-14 overflow-hidden rounded-lg bg-gray-50/50 p-1 group-hover:bg-amber-50/30 transition-colors">
                <img
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain filter group-hover:brightness-105 group-hover:scale-108 transition-all duration-300"
                />
              </div>

              {/* Name & Categories written directly on card */}
              <div className="w-full text-center px-1">
                <div className="text-xs font-bold text-gray-900 group-hover:text-amber-600 transition-colors truncate">
                  {brand.name}
                </div>
                <div className="text-[10px] text-gray-500 group-hover:text-gray-700 transition-colors truncate font-medium mt-0.5">
                  {brand.category}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Brands;

