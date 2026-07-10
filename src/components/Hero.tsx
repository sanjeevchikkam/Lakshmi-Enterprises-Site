import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageSquare, ArrowRight, User, Shield, Phone, MapPin, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { HERO_IMAGE_1, HERO_IMAGE_2 } from '../lib/Media';
import { DealerEnquiry } from '../types';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

const sliderImages = [
  {
    url: HERO_IMAGE_1,
    tag: "AESTHETIC LIVING",
    heading: "Quality Home & Kitchen Products From Many Years",
    subheading: "Trusted for 15+ Years",
    desc: "Highly durable kitchenware, casseroles, premium steel flasks, and culinary mixers."
  },
  {
    url: HERO_IMAGE_2,
    tag: "LUXURY CRAFT",
    heading: "Excellence & Complete Culinary Trust",
    subheading: "Exclusive Multi-Brand Distributor",
    desc: "Authorized partner of elite brands. Unrivaled customer care, competitive dealer margins"
  }
];

const dealerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(10, 'Please write your complete dealership/store address'),
  mobile: z.string().regex(/^[0-9]{10}$/, 'Mobile must be a valid 10-digit number'),
});

type DealerFormInput = z.infer<typeof dealerSchema>;

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDealerModalOpen, setIsDealerModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Autoplay intervals
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  };

  // React Hook Form for Dealer Submission
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<DealerFormInput>({
    mode: 'onTouched',
    defaultValues: { name: '', address: '', mobile: '' }
  });

  const onDealerSubmit = (data: DealerFormInput) => {
    setIsDealerModalOpen(false);
    
    // Generate encoded message
    const message = `Hello Lakshmi Enterprises,\n\nI want to apply to "Be a Dealer". Here are my details:\n\n👤 Name: ${data.name}\n📍 Address: ${data.address}\n📞 Mobile: ${data.mobile}\n\nPlease let me know the process.\n\nThank you!`;
    const whatsappUrl = `https://wa.me/7416956129?text=${encodeURIComponent(message)}`;
    
    // Open whatsapp and show thank you popup
    window.open(whatsappUrl, '_blank');
    setIsSuccessModalOpen(true);
    reset();
  };

  return (
    <section id="hero" className="relative h-[55vh] min-h-[340px] md:h-[65vh] w-full overflow-hidden bg-cream-950">
      {/* Slider Slides */}
      <div className="absolute inset-0 h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full"
          >
            {/* Background image cover */}
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${sliderImages[currentIndex].url})` }}
            />
            {/* Dark Golden Luxurious Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-cream-900/90 via-cream-900/70 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur-xs hover:bg-gold-500/30 hover:border-gold-300 transition-all duration-300 active:scale-90"
        id="hero-arrow-prev"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur-xs hover:bg-gold-500/30 hover:border-gold-300 transition-all duration-300 active:scale-90"
        id="hero-arrow-next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-12">
        <div className="max-w-2xl text-left text-white">
          {/* Animated Tags & Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-2 inline-flex items-center space-x-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4.5 py-1 text-xs font-bold uppercase tracking-[2px] text-gold-200 backdrop-blur-md"
          >
            <span>{sliderImages[currentIndex].tag}</span>
            <span className="h-1 w-1 rounded-full bg-gold-400" />
            <span>{sliderImages[currentIndex].subheading}</span>
          </motion.div>

          {/* Core App Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-serif text-2xl font-extrabold leading-tight tracking-wide text-white md:text-4xl lg:text-5xl text-glow"
          >
            {sliderImages[currentIndex].heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-2 font-sans text-sm text-cream-100/90 md:text-base leading-relaxed leading-extra-loose"
          >
            {sliderImages[currentIndex].desc}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            <button
              onClick={() => onScrollToSection('products')}
              className="flex items-center space-x-1.5 rounded-full bg-gold-500 px-5 py-2.5 text-xs font-bold tracking-wide text-cream-950 shadow-lg hover:bg-gold-200 transition-all duration-300 active:scale-95 cursor-pointer"
              id="hero-cta-view-products"
            >
              <span>View Products</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsDealerModalOpen(true)}
              className="flex items-center space-x-1.5 rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-xs font-bold tracking-wide text-white backdrop-blur-md hover:bg-white hover:text-cream-900 transition-all duration-300 active:scale-95 cursor-pointer"
              id="hero-cta-be-dealer"
            >
              <Shield className="h-4 w-4" />
              <span>Be a Dealer</span>
            </button>

            <a
              href={`https://wa.me/7416956129?text=${encodeURIComponent("Hello Lakshmi Enterprises, I would like to inquire about kitchen products and overall deals. Thank you!")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-bold tracking-wide text-white hover:bg-emerald-600 transition-all duration-300 active:scale-95"
              id="hero-cta-whatsapp-enquiry"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Inquiry</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Slider Carousel Dot Indicators */}
      <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 space-x-2.5">
        {sliderImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              currentIndex === i ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/40'
            }`}
            id={`hero-dot-${i}`}
          />
        ))}
      </div>

      {/* "Be a Dealer" modal */}
      <AnimatePresence>
        {isDealerModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60"
              onClick={() => setIsDealerModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border border-gold-200 md:p-8"
              id="dealer-modal-container"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsDealerModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center mb-6">
                <span className="font-sans text-[10px] tracking-[3px] uppercase font-bold text-gold-500">PROPOSAL FORM</span>
                <h3 className="font-serif text-2xl font-bold text-cream-900 mt-1">Dealer Partnership</h3>
                <p className="text-xs text-gray-500 mt-2">
                  Submit your details to establish a luxury retail franchise or direct dealer margin with Lakshmi Enterprises.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onDealerSubmit)} className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Dealer Name</label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 h-4 w-4 text-gray-400" />
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:border-gold-500 focus:outline-hidden"
                      placeholder="Enter individual or firm name"
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-500 mt-1 pl-1">{errors.name.message}</p>}
                </div>

                {/* Mobile */}
                <div className="relative">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Mobile Number</label>
                  <div className="relative flex items-center">
                    <Phone className="absolute left-3.5 h-4 w-4 text-gray-400" />
                    <input
                      {...register('mobile')}
                      type="tel"
                      className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:border-gold-500 focus:outline-hidden"
                      placeholder="10-digit primary mobile"
                    />
                  </div>
                  {errors.mobile && <p className="text-[10px] text-red-500 mt-1 pl-1">{errors.mobile.message}</p>}
                </div>

                {/* Address */}
                <div className="relative">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Business Address</label>
                  <div className="relative flex items-start">
                    <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      {...register('address')}
                      rows={3}
                      className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 focus:border-gold-500 focus:outline-hidden resize-none"
                      placeholder="Store location, street details, and city"
                    />
                  </div>
                  {errors.address && <p className="text-[10px] text-red-500 mt-1 pl-1">{errors.address.message}</p>}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full rounded-full bg-cream-900 py-3 text-sm font-bold text-white shadow-md hover:bg-gold-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Send Proposal via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* Form Submission Success Alert */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60" onClick={() => setIsSuccessModalOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl border border-gold-200"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 mb-4 border border-emerald-200">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-cream-900">Proposal Dispatched</h3>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                We have redirected your dealership interest to our official chat. Lakshmi Enterprises representatives will verify your address and verify dealer margins.
              </p>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="mt-5 w-full rounded-full bg-cream-900 py-2 text-xs font-semibold text-white hover:bg-gold-600 transition"
              >
                Continue Browsing
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
