/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, ArrowUp, ShoppingBasket, Sparkles } from 'lucide-react';
import { CartProvider, useCart } from './store/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Offers } from './components/Offers';
import { Products } from './components/Products';
import { Stats } from './components/Stats';
import { Owners } from './components/Owners';
import { Brands } from './components/brands'
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

// Main Application Inner Layout incorporating Cart States
const StorefrontLayout: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount, sendWhatsAppOrder } = useCart();

  // Scroll to targeted section IDs smoothly
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 font-sans text-stone-800 flex flex-col justify-between selection:bg-gold-200 selection:text-gold-900 scroll-smooth">
      
      {/* Header Block */}
      <Header 
        onScrollToSection={handleScrollToSection} 
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Slideout Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Main Core Storefront Sections */}
      <main className="flex-grow">
        
        {/* HERO SLIDER SECTION */}
        <section id="home">
          <Hero onScrollToSection={handleScrollToSection} />
        </section>

        {/* DISTRIBUTORS SPECIAL ANNOUNCEMENT BLOCK */}
        {/* <div className="bg-cream-950 py-3 text-center border-y border-gold-500/20">
          <div className="mx-auto max-w-7xl px-4 flex items-center justify-center space-x-2 text-white text-[10px] md:text-xs font-bold uppercase tracking-[2px]">
            <Sparkles className="h-4 w-4 text-gold-400 shrink-0 animate-pulse" />
            <span className="text-gold-100">Lakshmi Enterprises General Merchant Wholesale Hub</span>
            <span className="hidden sm:inline bg-gold-500 text-cream-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded ml-2">MILTON SPECIAL DEALER RATES</span>
          </div>
        </div> */}

        {/*Brands Scrolling */}
        <Brands/>

        {/* CATALOG PRODUCTS WITH FILTERS & LIVE SEARCH SECTION */}
        <Products />

        {/* OFFERS SECTION */}
        <Offers />

        {/* ANIMATED STATS NUMBER COUNTERS SECTION */}
        <Stats />

        {/* OWNER CARDS SECTION */}
        {/* <Owners /> */}

      </main>

      {/* FOOTER BLOCK */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* DYNAMIC FLOATING WHATSAPP ORDER BUTTON */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-40 w-[90%] max-w-[340px] md:w-auto"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs md:text-sm font-bold uppercase tracking-wider py-4 px-6 rounded-full shadow-2xl border border-emerald-500 flex items-center justify-between space-x-3 cursor-pointer group active:scale-98 transition-all"
              id="sticky-whatsapp-floating-btn"
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4.5 w-4.5 animate-pulse shrink-0" />
                <span>Confirm Order ({cartCount})</span>
              </div>
              <span className="bg-white/20 text-white rounded-md px-2 py-0.5 font-mono text-xs">
                View Cart
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Elegant scroll-to-top button fallback */}
      <button
        onClick={() => handleScrollToSection('hero')}
        className="fixed bottom-6 left-6 hidden md:flex h-11 w-11 items-center justify-center rounded-full bg-white text-stone-700 border border-gold-200/40 hover:bg-gold-50 shadow-md active:scale-95 transition-all text-sm z-30 cursor-pointer"
        title="Scroll to Top"
        id="scroll-to-top-btn"
      >
        <ArrowUp className="h-4 w-4" />
      </button>

    </div>
  );
};

// Main Export wrapping global providers
export default function App() {
  return (
    <CartProvider>
      <StorefrontLayout />
    </CartProvider>
  );
}
