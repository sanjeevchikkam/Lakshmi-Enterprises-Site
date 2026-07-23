import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Users, ShoppingCart, ShieldCheck } from 'lucide-react';

interface CounterProps {
  value: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalSteps = 40;
    const stepTime = Math.floor(duration / totalSteps);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / totalSteps;
      // Simple easeOutQuad easing
      const easedProgress = progress * (2 - progress);
      const currentCount = Math.floor(easedProgress * end);

      setCount(currentCount);

      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="font-serif font-extrabold text-3xl md:text-5xl text-gold-500 tabular-nums">
      {count}{suffix}
    </span>
  );
};

export const Stats: React.FC = () => {
  return (
    <section id="stats" className="py-12 md:py-16 bg-cream-100 border-y border-gold-200/20">
      <div className="mx-auto max-w-7xl px-4 md:px-12 bg-white rounded-2xl border border-gold-200/20 p-6 md:p-8 shadow-xs">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-cream-200">
          
          {/* Stat Item 1 */}
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 mb-4 shadow-2xs">
              <Users className="h-6 w-6" />
            </div>
            <AnimatedCounter value={10000} suffix="+" />
            <span className="font-sans text-xs font-bold text-cream-900 tracking-widest uppercase mt-3">
              Happy Customers
            </span>
            <p className="text-[11px] text-gray-400 mt-1 max-w-[200px]">
              Distributors, small shops, and retail households.
            </p>
          </div>

          {/* Stat Item 2 */}
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 mb-4 shadow-2xs">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <AnimatedCounter value={1000} suffix="+" />
            <span className="font-sans text-xs font-bold text-cream-900 tracking-widest uppercase mt-3">
              Products Available
            </span>
            <p className="text-[11px] text-gray-400 mt-1 max-w-[200px]">
              Complete premium cookware, bottles, and tiffins in stock.
            </p>
          </div>

          {/* Stat Item 3 */}
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700 mb-4 shadow-2xs">
              <Award className="h-6 w-6" />
            </div>
            <AnimatedCounter value={30} suffix="+" />
            <span className="font-sans text-xs font-bold text-cream-900 tracking-widest uppercase mt-3">
              Years of Service
            </span>
            <p className="text-[11px] text-gray-400 mt-1 max-w-[200px]">
              Supplying ultimate kitchen trust to generations.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
