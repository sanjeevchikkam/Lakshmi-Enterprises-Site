import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircle, ArrowLeftRight, Percent } from 'lucide-react';
import { fetchOffers, urlFor } from '../sanity/client';
import { Offer } from '../types';

export const Offers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const data = await fetchOffers();
        setOffers(data);
      } catch (err) {
        console.error('Error loading offers from CMS:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, []);

  const handleOrderNow = (offer: Offer) => {
    const text = `Hello Lakshmi Enterprises,

I would like to know about this offer:

Offer:
${offer.title}

Discount:
${offer.discount ? `${offer.discount}% OFF` : 'Special Promo'}

Thank you`;

    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/7416956129?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="py-16 bg-cream-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-300 border-t-gold-600" />
          <p className="font-sans text-xs text-gold-700 tracking-widest uppercase">Fetching Active Campaigns...</p>
        </div>
      </div>
    );
  }

  if (offers.length === 0) {
    return null; // Don't show the section if Sanity returns empty data and mock is empty (rare)
  }

  return (
    <section id="offers" className="py-12 md:py-16 bg-cream-50 scroll-mt-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12">
          <div className="text-left">
            <div className="flex items-center space-x-2 text-gold-600">
              <Sparkles className="h-4 w-4" />
              <span className="font-sans text-xs font-bold uppercase tracking-[3px]">Seasonal Exclusives</span>
            </div>
            <h2 className="font-serif text-3xl font-extrabold text-cream-900 mt-2 md:text-4xl">
              Deals & Offers
            </h2>
            <p className="font-sans text-sm text-gray-500 mt-2 max-w-md">
              Avail of specialized distributorship markdowns and high-mrp discounts on our elite cookware ranges.
            </p>
          </div>

          <div className="hidden md:flex items-center space-x-2 text-xs font-semibold text-gold-600 border border-gold-300/30 rounded-full px-4 py-1.5 bg-gold-50/50 mt-4 md:mt-0">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>Scroll horizontally to explore list</span>
          </div>
        </div>

        {/* Scrollable Container with Cards */}
        <div className="flex overflow-x-auto gap-6 pb-6 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {offers.map((offer) => {
            const isFeatured = offer.featured;
            return (
              <motion.div
                key={offer._id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                whileHover={{ y: -6 }}
                className={`flex-shrink-0 w-[290px] md:w-[380px] snap-start rounded-2xl overflow-hidden glass-card shadow-xs group transition-all duration-300 ${
                  isFeatured ? 'ring-2 ring-gold-500/20' : ''
                }`}
                id={`offer-card-${offer.offerId}`}
              >
                {/* Image Wrap */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={urlFor(offer.image)}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  {/* Subtle Elegant Gradient Over Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Discount Badge */}
                  {offer.discount && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white flex items-center space-x-1 rounded-full px-3.5 py-1.5 text-xs font-extrabold tracking-wider shadow-md border border-white/20">
                      <Percent className="h-3 w-3" />
                      <span>{offer.discount}% OFF</span>
                    </div>
                  )}

                  {/* Company/Sub-brand name as small badge */}
                  {offer.company && (
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-cream-900 border border-gold-200/45 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      {offer.company.name}
                    </div>
                  )}
                </div>

                {/* Offer Content Details */}
                <div className="p-6 bg-white flex flex-col justify-between h-[180px]">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-cream-900 line-clamp-1 group-hover:text-gold-500 transition-colors duration-200">
                      {offer.title}
                    </h3>
                    <p className="font-sans text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                      {offer.description || "Inquire now to get custom rates and priority logistics handling for your retail outlets."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-cream-100 flex items-center justify-between">
                    <span className="font-sans text-[11px] font-bold text-gold-600 uppercase tracking-widest">
                      LTD TIME DEAL
                    </span>
                    <button
                      onClick={() => handleOrderNow(offer)}
                      className="flex items-center space-x-1.5 rounded-full bg-cream-900 px-4.5 py-1.5 text-xs font-bold text-white hover:bg-gold-500 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Order Now</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
