import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Quote } from 'lucide-react';
import { OWNER_PRADEEP_IMAGE, OWNER_BAABJI_IMAGE } from '../lib/Media';

interface Owner {
  name: string;
  position: string;
  description: string;
  image: string;
}

const ownersData: Owner[] = [
  {
    name: 'P. Pradeep',
    position: 'Owner',
    description: 'A good visionary one with full passion',
    image: OWNER_PRADEEP_IMAGE,
  },
  {
    name: 'P. Babji',
    position: 'Owner',
    description: 'A good visionary one with full commitment and legacy',
    image: OWNER_BAABJI_IMAGE,
  },
];

export const Owners: React.FC = () => {
  return (
    <section id="leadership" className="py-12 md:py-16 bg-cream-50 border-t border-gold-200/20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center space-x-2 bg-gold-100/60 border border-gold-500/15 px-3 py-1 rounded-full mb-3">
            <Award className="h-3.5 w-3.5 text-gold-600" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[3px] text-gold-700">
              Corporate Governance
            </span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-cream-900 leading-tight">
            Our Visionary Leadership
          </h2>
          <div className="h-0.5 w-16 bg-gold-500 mx-auto mt-4 mb-4"></div>
          <p className="font-sans text-sm text-gray-500 max-w-lg mx-auto">
            Governed by absolute integrity and decades of supply chain legacy, steering culinary excellence across regional distribution networks.
          </p>
        </div>

        {/* Owner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {ownersData.map((owner, index) => (
            <motion.div
              key={owner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl border border-gold-200/20 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 relative"
              id={`owner-card-${index}`}
            >
              {/* Premium top accent gradient line */}
              <div className="h-1.5 w-full bg-linear-to-r from-gold-500 to-gold-600" />

              <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                
                {/* Photo Display with Gold Border Overlay */}
                <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border-2 border-gold-100 shadow-2xs group-hover:border-gold-500/40 transition-colors duration-300">
                  <img
                    src={owner.image}
                    alt={owner.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    id={`owner-photo-${index}`}
                  />
                  {/* Decorative corner badge */}
                  <div className="absolute right-1 bottom-1 bg-cream-950/80 p-1 rounded-md text-gold-400 backdrop-blur-xs select-none">
                    <ShieldCheck className="h-3 w-3" />
                  </div>
                </div>

                {/* Info and vision details */}
                <div className="flex-1 text-center sm:text-left flex flex-col justify-between">
                  <div>
                    {/* Position Label */}
                    <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gold-600 mt-1 block">
                      {owner.position}
                    </span>
                    
                    {/* Owner Name */}
                    <h3 className="font-serif text-xl font-bold text-cream-900 mt-0.5">
                      {owner.name}
                    </h3>
                    
                    {/* Quote indicator */}
                    <div className="flex justify-center sm:justify-start text-gold-100 my-2.5">
                      <Quote className="h-5 w-5 fill-gold-100/20" />
                    </div>

                    {/* Owner description / vision statement */}
                    <p className="font-sans text-xs md:text-sm text-gray-500 leading-relaxed italic group-hover:text-cream-950 transition-colors duration-300">
                      &ldquo;{owner.description}&rdquo;
                    </p>
                  </div>

                  {/* Decorative baseline signature element */}
                  <div className="border-t border-slate-50 mt-5 pt-3 flex items-center justify-between select-none">
                    <span className="text-[9px] font-mono tracking-widest text-slate-350 uppercase">
                      Lakshmi Enterprises
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Active Principal
                    </span>
                  </div>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
