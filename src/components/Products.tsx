import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Plus, Minus, Check, ShoppingBag, X, Info } from 'lucide-react';
import { fetchProducts, fetchCompanies, fetchCategories, urlFor } from '../sanity/client';
import { Product, Company, Category, Color } from '../types';
import { useCart } from '../store/CartContext';

export const Products: React.FC = () => {
  const { addToCart, cart, updateQuantity } = useCart();

  // State elements
  const [products, setProducts] = useState<Product[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);

  // Product Card Specific details: Selected color for each product ID
  const [productColorSelections, setProductColorSelections] = useState<Record<string, Color>>({});

  // Fetch from CMS on Mount
  useEffect(() => {
    async function loadCMSData() {
      try {
        setLoading(true);
        const [prodList, compList, catList] = await Promise.all([
          fetchProducts(),
          fetchCompanies(),
          fetchCategories(),
        ]);
        setProducts(prodList);
        setCompanies(compList);
        setCategories(catList);
      } catch (err) {
        console.error('Error fetching CMS data in products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCMSData();
  }, []);

  // Filter Categories available based on selected Company
  const getFilteredCategories = () => {
    if (!selectedCompany) {
      return categories;
    }
    // If company is selected, find if there are matching declared references or matching products
    const availableRefs = selectedCompany.categoriesAvailable;
    if (availableRefs && availableRefs.length > 0) {
      // Check if they are full object Categories or just references
      return categories.filter((cat) =>
        availableRefs.some((ref: any) => ref._id === cat._id || ref._ref === cat._id)
      );
    }
    // Fallback: check which categories actually have products belonging to this company
    const categoryIdsWithProducts = products
      .filter((p) => p.company._id === selectedCompany._id)
      .map((p) => p.category._id);
    return categories.filter((cat) => categoryIdsWithProducts.includes(cat._id));
  };

  // Safe category selection trigger (ensure category belongs to selected company if any)
  const handleSelectCompany = (comp: Company | null) => {
    setSelectedCompany(comp);
    setSelectedCategory(null); // Clear selected category when company changes
    setVisibleCount(10); // Reset pagination
  };

  const handleSelectCategory = (cat: Category | null) => {
    setSelectedCategory(cat);
    setVisibleCount(10); // Reset pagination
  };

  // Filter products locally based on multiple states
  const getFilteredProducts = () => {
    return products.filter((p) => {
      // 1. Search Query filter (matches Name, Company Name, Category Name)
      const matchesSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.company?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description || '').toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Company Filter
      const matchesCompany = !selectedCompany || p.company._id === selectedCompany._id;

      // 3. Category Filter
      const matchesCategory = !selectedCategory || p.category._id === selectedCategory._id;

      return matchesSearch && matchesCompany && matchesCategory;
    });
  };

  // Incremental "Show More"
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const filteredProducts = getFilteredProducts();
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const activeCategories = getFilteredCategories();

  if (loading) {
    return (
      <div className="py-24 bg-white flex flex-col items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold-300 border-t-gold-600" />
        <p className="font-sans text-xs text-gold-700 tracking-wider mt-4">FETCHING CATALOGUE DATA...</p>
      </div>
    );
  }

  return (
    <section id="products" className="py-5 bg-white scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
          <span className="font-sans text-[10px] tracking-[4px] uppercase font-bold text-gold-500">OUR CATALOGUE</span>
          <h2 className="font-serif text-3xl font-extrabold text-cream-900 mt-1 md:text-4xl">Browse Luxury Collections</h2>
          <p className="font-sans text-xs md:text-sm text-gray-500 mt-2">
            Dynamic live filter by enterprise brands, sizes, and collections. Select colors and build your order on-the-go.
          </p>
        </div>

        {/* Global Filter Toolbar Panel */}
        <div className="mb-6 md:mb-8 flex flex-col space-y-6">
          
          {/* SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto w-full group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-gold-500 transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200/80 bg-cream-50/30 py-3.5 pl-12 pr-10 text-sm text-gray-800 placeholder-gray-400 focus:border-gold-500 focus:bg-white focus:outline-hidden shadow-xs transition-all"
              placeholder="Search products by title, company, or collection..."
              id="product-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-hidden"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* BRAND/COMPANY FILTERS */}
          <div className="w-full">
            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest text-left mb-2.5">
              Filter by Distributor Brand
            </span>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => handleSelectCompany(null)}
                className={`px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                  selectedCompany === null
                    ? 'bg-cream-900 border border-cream-900 text-white shadow-md'
                    : 'bg-cream-50 border border-cream-200/60 text-cream-900 hover:bg-gold-50/50'
                }`}
                id="brand-chip-all"
              >
                <span>All Brands</span>
              </button>
              {companies.map((comp) => {
                const isSelected = selectedCompany?._id === comp._id;
                return (
                  <button
                    key={comp._id}
                    onClick={() => handleSelectCompany(comp)}
                    className={`px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center space-x-2 border cursor-pointer ${
                      isSelected
                        ? 'bg-cream-900 border-cream-900 text-white shadow-md'
                        : 'bg-white border-gold-200/30 text-cream-900 hover:border-gold-300'
                    }`}
                    id={`brand-chip-${comp.companyId}`}
                  >
                    {comp.image && (
                      <img
                        src={urlFor(comp.image)}
                        alt={comp.name}
                        className="h-4.5 w-4.5 rounded-full object-cover bg-white p-0.5 border border-gold-200/20"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <span>{comp.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="w-full pt-1">
            <span className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest text-left mb-2.5">
              Filter by Product Category {selectedCompany ? `within ${selectedCompany.name}` : ''}
            </span>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => handleSelectCategory(null)}
                className={`px-4.5 py-2 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                  selectedCategory === null
                    ? 'bg-gold-500 text-cream-950 shadow-xs ring-1 ring-gold-400'
                    : 'bg-cream-50/60 border border-cream-100 text-cream-900/80 hover:bg-gold-50/20'
                }`}
                id="category-chip-all"
              >
                <span>All Categories</span>
              </button>
              {activeCategories.map((cat) => {
                const isSelected = selectedCategory?._id === cat._id;
                return (
                  <button
                    key={cat._id}
                    onClick={() => handleSelectCategory(cat)}
                    className={`px-4.5 py-2 rounded-md text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer flex items-center space-x-2 ${
                      isSelected
                        ? 'bg-gold-500 border-gold-500 text-cream-950 shadow-xs'
                        : 'bg-white border-gold-200/20 text-cream-900 hover:border-gold-200'
                    }`}
                    id={`category-chip-${cat.categoryId}`}
                  >
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Filters State Info Banner */}
        {(selectedCompany || selectedCategory || searchQuery) && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-gold-50/40 border border-gold-200/20 rounded-xl p-3.5">
            <div className="flex items-center space-x-2 text-xs text-gold-800">
              <Info className="h-4 w-4 text-gold-500 shrink-0" />
              <span>
                Found <strong>{filteredProducts.length}</strong> products matching:
                {selectedCompany && <span className="bg-white px-2 py-0.5 rounded-md border text-cream-900 text-[10px] ml-1.5 font-bold uppercase">{selectedCompany.name}</span>}
                {selectedCategory && <span className="bg-white px-2 py-0.5 rounded-md border text-cream-900 text-[10px] ml-1.5 font-bold uppercase">{selectedCategory.name}</span>}
                {searchQuery && <span className="bg-white px-2 py-0.5 rounded-md border text-cream-900 text-[10px] ml-1.5 font-mono italic">"{searchQuery}"</span>}
              </span>
            </div>
            
            <button
              onClick={() => {
                setSelectedCompany(null);
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="text-[10px] font-bold text-cream-900 underline uppercase tracking-wider hover:text-gold-500 cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Empty Search Outcomes */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center border border-dashed rounded-2xl border-cream-200 bg-cream-50/20">
            <SlidersHorizontal className="h-8 w-8 text-gray-300 mx-auto mb-3" />
            <span className="font-serif text-lg font-bold text-cream-900 block">No matching products found</span>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
              Please clear filters or test search criteria to inspect other distributor warehouse collections.
            </p>
          </div>
        )}

        {/* PRODUCTS GRID (DOUBLE COLUMN ON MOBILE!) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-6">
          {visibleProducts.map((prod) => {
            // Colors definitions
            const colorsList = prod.colors || [];
            const selectedColor = productColorSelections[prod._id] || colorsList[0] || null;

            // Find if item is already in cart (matching same product & selected color)
            const matchedCartItem = cart.find(
              (item) =>
                item.product._id === prod._id &&
                (item.selectedColor?._id === selectedColor?._id || (!item.selectedColor && !selectedColor))
            );
            const cartQty = matchedCartItem ? matchedCartItem.quantity : 0;

            const hasDiscount = prod.discount !== undefined && prod.discount !== null && Number(prod.discount) > 0;

            return (
              <motion.div
                key={prod._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group flex flex-col justify-between rounded-xl overflow-hidden border border-gray-100 bg-white shadow-xs hover:shadow-md transition-all duration-300 relative"
                id={`product-card-${prod.productId}`}
              >
                
                {/* Image panel & Discount Badge */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center p-3">
                  <img
                    src={urlFor(prod.image)}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-104"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  
                  {/* Premium floating discount badge style (Matching exact Milton green capsule) */}
                  {hasDiscount && (
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white rounded-md px-2 py-1 text-[10px] font-extrabold shadow-sm">
                      {prod.discount}% OFF
                    </div>
                  )}

                  {/* Company Watermark label */}
                  {prod.company && (
                    <div className="absolute top-2 right-2 text-[9px] font-bold text-gray-650 bg-white/80 backdrop-blur-xs border border-gray-200/30 px-2 py-0.5 rounded uppercase tracking-wider">
                      {prod.company.name}
                    </div>
                  )}
                </div>

                {/* Body details */}
                <div className="p-3 md:p-4.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Collection and category tags */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">
                        {prod.category?.name || 'Home essentials'}
                      </span>
                      {prod.size && (
                        <span className="text-[10px] font-medium bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                          {prod.size}
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="font-sans text-xs md:text-sm font-bold text-cream-900 group-hover:text-gold-600 transition-colors line-clamp-1 leading-normal">
                      {prod.name}
                    </h3>

                    {/* Small description */}
                    <p className="text-[11px] text-gray-400 line-clamp-2 md:line-clamp-2 leading-relaxed mt-1.5">
                      {prod.description || 'Exclusive kitchen asset built with double-walled thermal grade insulation.'}
                    </p>

                    {/* Colors Circles Selector (Show very small as requested) */}
                    {colorsList.length > 0 && (
                      <div className="flex items-center space-x-1.5 mt-3 pt-2.5 border-t border-slate-100">
                        <span className="text-[9px] font-semibold text-slate-400 uppercase mr-1">Color:</span>
                        <div className="flex items-center space-x-1.5">
                          {colorsList.map((col) => {
                            const isColorSelected = selectedColor?._id === col._id;
                            return (
                              <button
                                key={col._id}
                                onClick={() =>
                                  setProductColorSelections((prev) => ({
                                    ...prev,
                                    [prod._id]: col,
                                  }))
                                }
                                style={{ backgroundColor: col.colorCode }}
                                className={`w-3.5 h-3.5 rounded-full border border-black/10 focus:outline-hidden relative transition-transform cursor-pointer ${
                                  isColorSelected ? 'ring-2 ring-gold-500 scale-110' : 'hover:scale-105'
                                }`}
                                title={col.name}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Prices & Controls */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-3.5">
                      {/* Price labels */}
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-sm font-extrabold text-cream-900">
                          ₹{prod.price || prod.mrp}
                        </span>
                        {hasDiscount && (
                          <span className="text-[10px] text-gray-400 line-through">
                            ₹{prod.mrp}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Order Button + Quantity selector */}
                    <AnimatePresence mode="wait">
                      {cartQty > 0 ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex items-center justify-between rounded-lg bg-cream-50 p-1 border border-cream-200/50"
                        >
                          <button
                            onClick={() => updateQuantity(prod._id, cartQty - 1, selectedColor?._id)}
                            className="bg-white rounded-md p-1.5 text-cream-900 hover:text-gold-500 hover:bg-gold-50 transition border border-gray-200/20 active:scale-95"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          
                          <span className="font-mono text-xs font-extrabold text-cream-900 px-2.5">
                            {cartQty}
                          </span>

                          <button
                            onClick={() => updateQuantity(prod._id, cartQty + 1, selectedColor?._id)}
                            className="bg-white rounded-md p-1.5 text-cream-900 hover:text-gold-500 hover:bg-gold-50 transition border border-gray-200/20 active:scale-95"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </motion.div>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => addToCart(prod, selectedColor || undefined)}
                          className="w-full bg-cream-900 text-white rounded-lg py-2 text-xs font-bold hover:bg-gold-500 hover:text-cream-950 transition-colors cursor-pointer flex items-center justify-center space-x-1.5"
                          id={`order-btn-${prod.productId}`}
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          <span>Add to Order</span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Incremental Load "Show More" Button */}
        {filteredProducts.length > visibleCount && (
          <div className="mt-14 text-center">
            <button
              onClick={handleShowMore}
              className="bg-white border border-gold-400/50 text-gold-700 font-sans text-xs font-bold tracking-[1.5px] uppercase py-3.5 px-8 rounded-full hover:bg-gold-50/50 hover:border-gold-500 transition-all shadow-2xs active:scale-95 cursor-pointer"
              id="product-btn-show-more"
            >
              Show More Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
