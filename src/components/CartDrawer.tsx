import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, MessageSquare, AlertCircle, Check } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { urlFor } from '../sanity/client';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    updateQuantity,
    updateColor,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
    sendWhatsAppOrder,
  } = useCart();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [showValidation, setShowValidation] = useState(false);

  const handleConfirmOrder = () => {
    if (!name.trim() || !mobile.trim() || !address.trim()) {
      setShowValidation(true);
      return;
    }
    sendWhatsAppOrder(name.trim(), mobile.trim(), address.trim());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Gray Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
            id="cart-overlay-backdrop"
          />

          {/* Cart sliding drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed right-0 top-0 z-50 h-screen w-full sm:w-[480px] bg-slate-50 border-l border-gold-200/20 shadow-2xl flex flex-col justify-between"
            id="cart-drawer-container"
          >
            {/* Header portion */}
            <div className="p-5 border-b border-gray-200/70 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <span className="font-serif text-lg font-extrabold text-cream-900">Your Order Cart</span>
                <span className="bg-gold-100 text-gold-800 text-[11px] font-bold px-2 py-0.5 rounded-full font-mono">
                  {cartCount} Items
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-slate-100 p-1.5 text-slate-800 hover:text-gold-500 hover:bg-gold-50 transition focus:outline-hidden"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Cart Items listing section */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20 px-4">
                  <div className="h-16 w-16 bg-cream-50 rounded-full flex items-center justify-center text-gold-500 mb-4 border border-gold-200/10">
                    <AlertCircle className="h-8 w-8" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-cream-900">Your cart is empty</h4>
                  <p className="text-xs text-gray-500 mt-2 max-w-[280px]">
                    Configure products from our catalog and check them in to build details of your wholesale order list.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 font-sans text-xs font-bold uppercase tracking-wider bg-cream-900 text-white rounded-full px-6 py-3 hover:bg-gold-500 hover:text-cream-950 transition"
                  >
                    Start Add Items
                  </button>
                </div>
              ) : (
                cart.map((item, index) => {
                  const p = item.product;
                  const priceSingle = p.price || p.mrp || 0;
                  const totalItemPrice = priceSingle * item.quantity;
                  const availableColors = p.colors || [];

                  return (
                    <motion.div
                      key={`${p._id}_${item.selectedColor?._id || ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-gray-100 bg-white p-3.5 shadow-2xs relative flex space-x-3.5"
                    >
                      {/* Product small image preview */}
                      <div className="h-16 w-16 bg-slate-50 border rounded-lg overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                        <img
                          src={urlFor(p.image)}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Content column */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title & Brand */}
                          <div className="flex items-start justify-between">
                            <h5 className="font-sans text-xs md:text-sm font-bold text-cream-900 line-clamp-1">
                              {p.name}
                            </h5>
                            
                            {/* Remove single item button */}
                            <button
                              onClick={() => removeFromCart(p._id, item.selectedColor?._id)}
                              className="text-gray-400 hover:text-red-500 p-1 rounded-sm cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Sizes / brand watermarks */}
                          <span className="text-[10px] text-gray-400">
                            {p.company?.name || 'Milton'} {p.size ? `• ${p.size}` : ''}
                          </span>

                          {/* Selected Color Dropdown swapping inside cart */}
                          {availableColors.length > 0 && (
                            <div className="mt-2 flex items-center space-x-1.5">
                              <span className="text-[9px] text-gray-400 font-bold uppercase">Color:</span>
                              <div className="flex flex-wrap gap-1">
                                {availableColors.map((col) => {
                                  const isSelected = item.selectedColor?._id === col._id;
                                  return (
                                    <button
                                      key={col._id}
                                      onClick={() => updateColor(p._id, item.selectedColor?._id, col)}
                                      style={{ backgroundColor: col.colorCode }}
                                      className={`w-4 h-4 rounded-full border border-black/10 focus:outline-hidden relative cursor-pointer ${
                                        isSelected ? 'ring-2 ring-gold-500 scale-105' : 'opacity-70 hover:opacity-100'
                                      }`}
                                      title={col.name}
                                    >
                                      {isSelected && (
                                        <div className="absolute inset-0 flex items-center justify-center text-white">
                                          <Check className="h-2 w-2 stroke-[3]" />
                                        </div>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Modifying quantities & individual prices */}
                        <div className="flex items-end justify-between mt-3 pt-3.5 border-t border-slate-50">
                          {/* Adjusters */}
                          <div className="flex items-center space-x-2.5 bg-slate-100/60 p-0.5 rounded-lg border">
                            <button
                              onClick={() => updateQuantity(p._id, item.quantity - 1, item.selectedColor?._id)}
                              className="bg-white rounded-md p-1 text-cream-900 border"
                            >
                              <Minus className="h-2.5 w-2.5" />
                            </button>
                            <span className="font-mono text-xs font-bold text-cream-800 px-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(p._id, item.quantity + 1, item.selectedColor?._id)}
                              className="bg-white rounded-md p-1 text-cream-900 border"
                            >
                              <Plus className="h-2.5 w-2.5" />
                            </button>
                          </div>

                          {/* Pricing */}
                          <div className="text-right">
                            <p className="text-[10px] text-gray-400 line-through">₹{p.mrp ? p.mrp * item.quantity : '-'}</p>
                            <p className="text-xs font-extrabold text-cream-900">₹{totalItemPrice}</p>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  );
                })
              )}
              {cart.length > 0 && (
                <div id="checkout-form-container" className="mt-6 border-t border-gray-200/60 pt-5 space-y-4">
                  <h4 className="font-serif text-sm font-bold text-cream-900 tracking-wide uppercase">
                    Delivery & Billing Information
                  </h4>
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label htmlFor="checkout-name" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      className={`w-full text-xs bg-white text-stone-800 border rounded-lg p-2.5 focus:outline-hidden focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors ${
                        showValidation && !name.trim() ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200'
                      }`}
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {showValidation && !name.trim() && (
                      <p className="text-[10px] text-red-500 font-medium">Please enter your name.</p>
                    )}
                  </div>

                  {/* Mobile field */}
                  <div className="space-y-1">
                    <label htmlFor="checkout-mobile" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="checkout-mobile"
                      type="tel"
                      className={`w-full text-xs bg-white text-stone-800 border rounded-lg p-2.5 focus:outline-hidden focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors ${
                        showValidation && !mobile.trim() ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200'
                      }`}
                      placeholder="e.g. +91 98765 43210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    {showValidation && !mobile.trim() && (
                      <p className="text-[10px] text-red-500 font-medium">Please enter your mobile number.</p>
                    )}
                  </div>

                  {/* Address field */}
                  <div className="space-y-1">
                    <label htmlFor="checkout-address" className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="checkout-address"
                      rows={3}
                      className={`w-full text-xs bg-white text-stone-800 border rounded-lg p-2.5 focus:outline-hidden focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors resize-none ${
                        showValidation && !address.trim() ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200'
                      }`}
                      placeholder="Detailed address (Street, Door No, Landmark, City/Town)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {showValidation && !address.trim() && (
                      <p className="text-[10px] text-red-500 font-medium">Please enter your delivery address.</p>
                    )}
                  </div>

                  {/* Note block */}
                  <div id="checkout-note-block" className="bg-amber-50/50 border border-gold-200/30 rounded-xl p-3.5 flex items-start space-x-2 text-[11px] leading-relaxed text-amber-900 select-none">
                    <AlertCircle className="h-4 w-4 text-gold-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>Note:</strong> Once you place order via whatsapp. you'll get QR for payment and once you pay. Your order will be confirm.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Order totals and WhatsApp button Footer portion */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-200 bg-white">
                <div className="space-y-2.5 mb-5 select-none">
                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <span>Total selected items:</span>
                    <span className="font-bold text-cream-950 font-mono">{cartCount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <span>Shipping Handling:</span>
                    <span className="font-bold text-emerald-600 uppercase tracking-wide">Free Delivery</span>
                  </div>

                  <div className="border-t border-dashed my-2 border-gray-200"></div>

                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-cream-950">Grand Order Total:</span>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-cream-950 block">₹{cartTotal}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold block">GST inclusive</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pb-2 text-center select-none">
                  <button
                    onClick={clearCart}
                    className="py-3 border border-red-200 rounded-full text-xs font-bold text-red-600 hover:bg-red-50 hover:border-red-300 transition duration-300 cursor-pointer"
                  >
                    Clear Order
                  </button>

                  <button
                    onClick={handleConfirmOrder}
                    className="py-3 bg-emerald-600 text-white rounded-full text-xs font-bold hover:bg-emerald-700 transition duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Confirm Order</span>
                  </button>
                </div>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
