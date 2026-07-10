import React from 'react';
import { LOGO_IMAGE_PATH } from '../lib/Media';
import { Phone, MessageCircle, MapPin, Instagram, Facebook, Clock, Mail } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-cream-950 text-white pt-16 pb-8 scroll-mt-6">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand & Logo */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-full p-0.5 bg-white overflow-hidden shadow-sm">
                <img 
                  src={LOGO_IMAGE_PATH} 
                  alt="Lakshmi Enterprises logo" 
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold text-white tracking-wider">Lakshmi Enterprises</span>
                <span className="text-[9px] uppercase tracking-[2px] text-gold-400 font-bold -mt-1">Luxury Homeware</span>
              </div>
            </div>

            <p className="text-xs text-cream-100/70 leading-relaxed pt-2">
              Authorized partner and leading multi-brand general merchant distribution store supplying premium casseroles, flasks, cookware, and modern electrical items.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3.5 pt-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full border border-white/10 hover:border-gold-400 hover:text-gold-400 text-cream-100/80 transition-colors"
                id="footer-social-facebook"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 rounded-full border border-white/10 hover:border-gold-400 hover:text-gold-400 text-cream-100/80 transition-colors"
                id="footer-social-instagram"
              >
                <Instagram className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Store Shortcuts */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-[2.5px] text-gold-400 mb-5 text-left">
              Warehouse Navigation
            </h4>
            <ul className="space-y-3.5 text-left">
              {['home', 'offers', 'products', 'contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onScrollToSection(item)}
                    className="text-xs text-cream-100/70 hover:text-gold-400 capitalize transition-colors duration-200 cursor-pointer"
                  >
                    Browse {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Warehouse Details */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-[2.5px] text-gold-400 mb-5 text-left">
              Hours & Customer desk
            </h4>
            <ul className="space-y-4 text-left">
              <li className="flex items-start space-x-3">
                <Clock className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                <div className="text-xs text-cream-100/70">
                  <p className="font-semibold text-white">Open Daily</p>
                  <p className="mt-0.5">10:00 AM — 08:00 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                <div className="text-xs text-cream-100/70">
                  <p className="font-semibold text-white">Write Us</p>
                  <p className="mt-0.5">lakshmienterprises@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Reach US */}
          <div>
            <h4 className="font-sans text-xs font-bold uppercase tracking-[2.5px] text-gold-400 mb-5 text-left">
              Official Head Office
            </h4>
            <ul className="space-y-4 text-left">
              <li className="flex items-start space-x-3.5">
                <MapPin className="h-4.5 w-4.5 text-gold-400 shrink-0 mt-1" />
                <div className="text-xs text-cream-100/70 leading-relaxed">
                  <p className="font-semibold text-white">Lakshmi Enterprises</p>
                  <p className="mt-0.5">D. No, 87-1-19/12, Shelton Road, Rehmath Nagar Colony, Rajamahendravaram, Andhra Pradesh.</p>
                </div>
              </li>
              <li className="flex flex-col space-y-2 pt-2">
                <a
                  href="tel:7416956129"
                  className="inline-flex items-center space-x-2 text-xs text-gold-400 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Phone: +91 74169 56129</span>
                </a>
                <a
                  href="https://wa.me/7416956129"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 text-xs text-emerald-400 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp: +91 74169 56129</span>
                </a>
              </li>
              
              {/* Find on map button */}
              <li className="pt-2">
                <a
                  href="https://maps.app.goo.gl/tBQEx4Zwk2dA6f3t9"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center space-x-2 rounded-lg bg-gold-500 hover:bg-gold-400 text-cream-950 font-sans text-xs font-bold py-2.5 px-4 transition-all"
                  id="footer-location-btn"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Show Maps Location</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Brand Copyright bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-cream-100/40">
          <p>© {currentYear} Lakshmi Enterprises. All rights reserved. Multi-brand general homeware distribution hub.</p>
          <div className="flex items-center space-x-4 mt-3 md:mt-0">
            <span className="hover:text-gold-400 transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-gold-400 transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gold-400 transition cursor-pointer">Dealers Support</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
