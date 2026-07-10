import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Color } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: Color;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product, color?: Color) => void;
  removeFromCart: (productId: string, colorId?: string) => void;
  updateQuantity: (productId: string, quantity: number, colorId?: string) => void;
  updateColor: (productId: string, oldColorId?: string, newColor?: Color) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  sendWhatsAppOrder: (name?: string, mobile?: string, address?: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('lakshmi_enterprises_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('lakshmi_enterprises_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, color?: Color) => {
    setCart((prevCart) => {
      // Find item with same product ID and same color ID
      const existingKey = prevCart.findIndex(
        (item) =>
          item.product._id === product._id &&
          (item.selectedColor?._id === color?._id || (!item.selectedColor && !color))
      );

      if (existingKey > -1) {
        const nextCart = [...prevCart];
        nextCart[existingKey] = {
          ...nextCart[existingKey],
          quantity: nextCart[existingKey].quantity + 1,
        };
        return nextCart;
      }

      // Default color if available and none selected
      const defaultColor = color || (product.colors && product.colors.length > 0 ? product.colors[0] : undefined);

      return [...prevCart, { product, quantity: 1, selectedColor: defaultColor }];
    });
  };

  const removeFromCart = (productId: string, colorId?: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product._id === productId && item.selectedColor?._id === colorId)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, colorId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId && item.selectedColor?._id === colorId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const updateColor = (productId: string, oldColorId?: string, newColor?: Color) => {
    setCart((prevCart) => {
      // Find if we have another item of the SAME product, with the NEW color
      const sameNewColorIndex = prevCart.findIndex(
        (item) => item.product._id === productId && item.selectedColor?._id === newColor?._id
      );

      // Find the item with the OLD color
      const oldColorIndex = prevCart.findIndex(
        (item) => item.product._id === productId && item.selectedColor?._id === oldColorId
      );

      if (oldColorIndex === -1) return prevCart;

      const nextCart = [...prevCart];
      const oldItem = nextCart[oldColorIndex];

      if (sameNewColorIndex > -1 && sameNewColorIndex !== oldColorIndex) {
        // Merge them!
        nextCart[sameNewColorIndex].quantity += oldItem.quantity;
        // Remove old item
        nextCart.splice(oldColorIndex, 1);
      } else {
        // Update color
        nextCart[oldColorIndex] = {
          ...oldItem,
          selectedColor: newColor,
        };
      }

      return nextCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Compute total number of items
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Compute total pricing
  const cartTotal = cart.reduce(
    (sum, item) => sum + (item.product.price || item.product.mrp || 0) * item.quantity,
    0
  );

  const sendWhatsAppOrder = (name?: string, mobile?: string, address?: string) => {
    if (cart.length === 0) return;

    let message = 'Hello Lakshmi Enterprises,\n\n';
    message += 'I would like to place an order.\n\n';
    
    if (name || mobile || address) {
      message += 'Customer Details:\n';
      if (name) message += `- Name: ${name}\n`;
      if (mobile) message += `- Mobile: ${mobile}\n`;
      if (address) message += `- Delivery Address: ${address}\n`;
      message += '\n';
    }

    message += 'Items:\n\n';

    cart.forEach((item, index) => {
      const p = item.product;
      const priceSingle = p.price || p.mrp || 0;
      const totalItemPrice = priceSingle * item.quantity;
      
      message += `${index + 1}. ${p.name}`;
      if (p.size) {
        message += ` (${p.size})`;
      }
      message += '\n';

      if (item.selectedColor) {
        message += `color: ${item.selectedColor.name}\n`;
      }
      message += `Qty: ${item.quantity}\n`;
      message += `Price: ₹${totalItemPrice}\n\n`;
    });

    message += '----------------\n\n';
    message += `Total Items: ${cartCount}\n`;
    message += `Total price: ₹${cartTotal}\n\n`;
    message += 'Once you place order via whatsapp, you\'ll get QR for payment and once you pay, your order will be confirmed.\n\n';
    message += 'Thank you';

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/7416956129?text=${encodedText}`;
    
    // Open in a new tab safely obeying strict runtime context
    window.open(whatsappUrl, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateColor,
        clearCart,
        cartCount,
        cartTotal,
        sendWhatsAppOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
