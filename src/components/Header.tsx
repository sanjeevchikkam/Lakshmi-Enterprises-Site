import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, MapPin, Menu, X, ShoppingCart } from 'lucide-react';
import { LOGO_IMAGE_PATH } from '../lib/Media';
import { useCart } from '../store/CartContext';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onScrollToSection, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const handleNavClick = (sectionId: string) => {
    setIsOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-header shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo and Brand Name */}
        <div 
          onClick={() => onScrollToSection('hero')} 
          className="flex cursor-pointer items-center space-x-3 group"
          id="header-brand-logo"
        >
          <div className="relative h-15 w-15 overflow-hidden rounded-full border border-gold-200/50 bg-white p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img 
              src={LOGO_IMAGE_PATH} 
              alt="Lakshmi Enterprises Logo" 
              className="h-full w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-wide text-cream-900 md:text-2xl">
              LAKSHMI ENTERPRISES
            </span>
            <span className="font-sans text-[12px] tracking-[4px] uppercase text-gold-500 font-semibold -mt-1">
              Home & Kitchen Appliances
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {['home', 'offers', 'products', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className="font-sans text-sm font-medium tracking-wide text-cream-900/80 hover:text-gold-500 capitalize transition-colors duration-200 relative py-1 group cursor-pointer"
            >
              {section}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-500 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="https://wa.me/7416956129"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 rounded-full border border-gold-500/25 bg-gold-50/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-700 hover:bg-gold-100/70 transition-all duration-300 shadow-2xs"
            id="header-cta-whatsapp"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href="tel:7416956129"
            className="flex items-center space-x-2 rounded-full bg-cream-900 px-4 py-1.5 text-xs font-semibold tracking-wide text-white hover:bg-gold-600 transition-all duration-300 shadow-2xs"
            id="header-cta-call"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Call Us</span>
          </a>

          <a
            href="https://maps.app.goo.gl/tBQEx4Zwk2dA6f3t9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-full border border-cream-900/10 bg-white p-2 text-cream-900 hover:text-gold-500 hover:bg-gold-50/10 transition-colors duration-200"
            title="Locate Store"
            id="header-cta-map"
          >
            <MapPin className="h-4 w-4" />
          </a>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center rounded-full bg-gold-50 p-2 text-gold-700 hover:bg-gold-100 transition-all duration-300 cursor-pointer"
            id="header-cart-btn"
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navbar Controls */}
        <div className="flex lg:hidden items-center space-x-3">
          {/* Cart Icon Mobile */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center rounded-full bg-gold-50 p-2 text-gold-700 active:scale-95 transition-all duration-200 cursor-pointer"
            id="header-cart-mobile-btn"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center rounded-full border border-cream-900/10 bg-white p-2 text-cream-900 focus:outline-hidden cursor-pointer"
            aria-label="Toggle Menu"
            id="header-hamburger-toggle"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 z-50 h-screen w-3/4 max-w-sm bg-cream-50 px-6 py-8 shadow-2xl flex flex-col justify-between border-l border-gold-100 lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={LOGO_IMAGE_PATH} 
                      alt="Lakshmi Enterprises Logo" 
                      className="h-8 w-8 object-contain"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-serif font-bold text-cream-900 text-base">Lakshmi Ent.</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full bg-cream-100 p-1.5 text-cream-900 hover:text-gold-500 focus:outline-hidden"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-col space-y-5">
                  {['home', 'offers', 'products', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => handleNavClick(section)}
                      className="text-left font-serif text-lg font-medium tracking-wide text-cream-900/90 capitalize active:text-gold-500"
                    >
                      {section}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-4 pt-6 border-t border-cream-200">
                <a
                  href="https://wa.me/7416956129"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full rounded-full border border-emerald-500/30 bg-emerald-50 py-3 text-sm font-semibold tracking-wide text-emerald-700 active:bg-emerald-100 transition-colors"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <a
                  href="tel:7416956129"
                  className="flex items-center justify-center space-x-2 w-full rounded-full bg-cream-900 py-3 text-sm font-semibold tracking-wide text-white active:bg-gold-600 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call 74169 56129</span>
                </a>

                <a
                  href="https://maps.app.goo.gl/tBQEx4Zwk2dA6f3t9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full rounded-full border border-cream-900/10 bg-white py-3 text-sm font-semibold tracking-wide text-cream-900 active:bg-cream-100 transition-colors"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Our Showroom Location</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
