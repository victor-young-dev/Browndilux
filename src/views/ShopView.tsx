import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory, FabricType } from '../types';
import { 
  Filter, 
  X, 
  Search, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles,
  Check,
  MessageCircle,
  ShoppingBag
} from 'lucide-react';
import { 
  formatNaira, 
  generateCatalogInquiryWhatsAppMessage, 
  generateWhatsAppUrl, 
  BROWNDILUX_WHATSAPP_NUMBER 
} from '../utils/formatters';

const CATEGORY_TABS: { label: string; key: ProductCategory }[] = [
  { label: 'All Pieces', key: 'all' },
  { label: 'Heritage Traditional', key: 'heritage-traditional' },
  { label: 'Corporate Fusion', key: 'corporate-fusion' },
  { label: 'Evening & Occasion', key: 'evening-occasion' },
  { label: 'Outerwear & Jackets', key: 'outerwear-jackets' },
  { label: 'Artisanal Leather', key: 'artisanal-leather' },
  { label: 'Street & Everyday', key: 'street-everyday' }
];

const FABRIC_OPTIONS: FabricType[] = [
  'Adire Eleko / Batik',
  'Aso-Oke',
  'Senator Cashmere / Wool',
  'Ankara Modern',
  'Raw Silk / Satin',
  'Nigerian Genuine Leather',
  'Linen Blend'
];

export const ShopView: React.FC = () => {
  const { products, vendors, filters, setFilters, resetFilters } = useShop();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFullCatalogWhatsApp = () => {
    const text = generateCatalogInquiryWhatsAppMessage(filters.category !== 'all' ? filters.category : undefined);
    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesVendor = product.vendorName.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesName && !matchesSubtitle && !matchesDesc && !matchesVendor && !matchesFabric && !matchesTags) {
          return false;
        }
      }

      // Price Range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Fabrics
      if (filters.fabrics.length > 0 && !filters.fabrics.includes(product.fabric)) {
        return false;
      }

      // Fit Type
      if (filters.fitType !== 'all' && product.fitType !== filters.fitType && product.fitType !== 'unisex') {
        return false;
      }

      // Vendor
      if (filters.vendorId && product.vendorId !== filters.vendorId) {
        return false;
      }

      // Stock
      if (filters.inStockOnly && product.stock <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, filters]);

  const toggleFabric = (fabric: FabricType) => {
    setFilters(prev => {
      const exists = prev.fabrics.includes(fabric);
      return {
        ...prev,
        fabrics: exists ? prev.fabrics.filter(f => f !== fabric) : [...prev.fabrics, fabric]
      };
    });
  };

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.searchQuery !== '' || 
    filters.fabrics.length > 0 || 
    filters.fitType !== 'all' || 
    filters.vendorId !== undefined || 
    filters.priceRange[1] < 200000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#E8DFD5] dark:border-[#3B3029] pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
              Nigerian Multi-Vendor Marketplace
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1">
              Curated Artisan Catalog
            </h1>
            <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-1">
              Showing {filteredProducts.length} verified contemporary Nigerian pieces from Abeokuta, Ibadan, Lagos & Abuja.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#6B635B] dark:text-[#B8ADA3]" />
            <input
              type="text"
              placeholder="Search Adire, Senator, Aso-Oke..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] text-xs text-[#1A1615] dark:text-[#F6F2EC] rounded focus:outline-none focus:border-[#A36B40]"
            />
            {filters.searchQuery && (
              <button 
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute right-3 top-2.5 text-[#6B635B] hover:text-[#1A1615]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Horizontal Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {CATEGORY_TABS.map(tab => {
            const isActive = filters.category === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setFilters(prev => ({ ...prev, category: tab.key }))}
                className={`py-2 px-4 text-xs tracking-wider uppercase whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] border-[#3D2B1F] dark:border-[#FAF7F2] font-semibold'
                    : 'bg-white dark:bg-[#1E1916] text-[#6B635B] dark:text-[#B8ADA3] border-[#E8DFD5] dark:border-[#3B3029] hover:border-[#A36B40]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 pr-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5] dark:border-[#3B3029]">
            <h2 className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] dark:text-[#FAF7F2] flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter Catalog</span>
            </h2>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#A36B40] dark:text-[#C68A5E] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="font-medium text-[#1A1615] dark:text-[#FAF7F2]">Max Price:</span>
              <span className="font-serif font-semibold text-[#A36B40]">{formatNaira(filters.priceRange[1])}</span>
            </div>
            <input
              type="range"
              min="8500"
              max="200000"
              step="5000"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, Number(e.target.value)] }))}
              className="w-full accent-[#A36B40] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6B635B] dark:text-[#B8ADA3] mt-1">
              <span>₦8,500</span>
              <span>₦200,000+</span>
            </div>
          </div>

          {/* Gender / Fit */}
          <div className="pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] dark:text-[#FAF7F2] block mb-2">
              Gender & Fit
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['all', 'men', 'women', 'unisex'] as const).map(fit => (
                <button
                  key={fit}
                  onClick={() => setFilters(prev => ({ ...prev, fitType: fit }))}
                  className={`py-1.5 px-2 text-xs uppercase text-center border transition-colors ${
                    filters.fitType === fit
                      ? 'border-[#3D2B1F] dark:border-[#FAF7F2] bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] font-semibold'
                      : 'border-[#E8DFD5] dark:border-[#3B3029] text-[#6B635B] dark:text-[#B8ADA3] hover:border-[#A36B40]'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* Fabric Type */}
          <div className="pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] dark:text-[#FAF7F2] block mb-2">
              Heritage Fabric
            </span>
            <div className="space-y-1.5">
              {FABRIC_OPTIONS.map(fabric => {
                const checked = filters.fabrics.includes(fabric);
                return (
                  <button
                    key={fabric}
                    onClick={() => toggleFabric(fabric)}
                    className="w-full text-left flex items-center justify-between text-xs py-1 text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615] dark:hover:text-white transition-colors"
                  >
                    <span className={checked ? 'text-[#A36B40] font-semibold' : ''}>{fabric}</span>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${checked ? 'bg-[#A36B40] border-[#A36B40] text-white' : 'border-[#E8DFD5] dark:border-[#3B3029]'}`}>
                      {checked && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Artisan Maker Filter */}
          <div className="pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#1A1615] dark:text-[#FAF7F2] block mb-2">
              Artisan Maker
            </span>
            <div className="space-y-1">
              <button
                onClick={() => setFilters(prev => ({ ...prev, vendorId: undefined }))}
                className={`w-full text-left text-xs py-1 transition-colors ${
                  !filters.vendorId ? 'text-[#A36B40] font-semibold' : 'text-[#6B635B] dark:text-[#B8ADA3]'
                }`}
              >
                All Verified Makers
              </button>
              {vendors.map(v => (
                <button
                  key={v.id}
                  onClick={() => setFilters(prev => ({ ...prev, vendorId: v.id }))}
                  className={`w-full text-left text-xs py-1 transition-colors flex items-center justify-between ${
                    filters.vendorId === v.id ? 'text-[#A36B40] font-semibold' : 'text-[#6B635B] dark:text-[#B8ADA3]'
                  }`}
                >
                  <span className="truncate">{v.name}</span>
                  <span className="text-[10px] text-[#A36B40]">{v.location.split(',')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Catalog Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-white dark:bg-[#1E1916] p-3 border border-[#E8DFD5] dark:border-[#3B3029] rounded">
            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden py-1.5 px-3 border border-[#E8DFD5] dark:border-[#3B3029] text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2] flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters</span>
                {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#A36B40]" />}
              </button>

              <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
                {filteredProducts.length} items found
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-[#6B635B] dark:text-[#B8ADA3] hidden sm:inline">
                Sort by:
              </label>
              <select
                id="sort-select"
                aria-label="Sort products by"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="py-1 px-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] text-xs text-[#1A1615] dark:text-[#FAF7F2] rounded focus:outline-none focus:border-[#A36B40]"
              >
                <option value="featured">Featured & Curated</option>
                <option value="price-asc">Price: Low to High (₦)</option>
                <option value="price-desc">Price: High to Low (₦)</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">New Season Arrivals</option>
              </select>
            </div>
          </div>

          {/* WhatsApp Direct Ordering Concierge Ribbon */}
          <div className="bg-[#FAF4ED] dark:bg-[#201A17] border border-[#E8DFD5] dark:border-[#3B3029] p-3.5 sm:p-4 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded bg-emerald-500/10 text-[#25D366] flex-shrink-0 mt-0.5">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                    Order via WhatsApp: Single Piece or Full Catalog
                  </span>
                  <span className="inline-block px-1.5 py-0.2 bg-[#25D366]/20 text-[#15803d] dark:text-[#4ade80] rounded text-[10px] font-bold uppercase tracking-wider">
                    Fast Atelier Response
                  </span>
                </div>
                <p className="text-[#6B635B] dark:text-[#B8ADA3] text-[11px] leading-relaxed">
                  Click any product's bag icon to toggle items in/out of your bag, or chat directly with our Lagos workshop to request our full lookbook, wholesale line sheets, or custom bespoke fittings.
                </p>
              </div>
            </div>
            <button
              onClick={handleFullCatalogWhatsApp}
              className="py-2 px-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded transition-colors flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire / Order Full Catalog</span>
            </button>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF7F2] dark:bg-[#2B2420] flex items-center justify-center text-[#A36B40]">
                <Search className="w-6 h-6 opacity-60" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                  No matching artisan pieces found
                </h3>
                <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1 max-w-sm mx-auto">
                  Try adjusting your price range or clearing fabric filters to explore other verified Nigerian designs.
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="py-2.5 px-6 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-in fade-in duration-200">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[#FAF7F2] dark:bg-[#171311] border-l border-[#E8DFD5] dark:border-[#3B3029] p-6 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5] dark:border-[#3B3029] mb-6">
                  <h3 className="font-serif text-xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                    Filter Pieces
                  </h3>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-[#6B635B]" />
                  </button>
                </div>

                {/* Mobile Filters Content */}
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold block mb-2 text-[#1A1615] dark:text-[#FAF7F2]">
                      Max Price: {formatNaira(filters.priceRange[1])}
                    </span>
                    <input
                      type="range"
                      min="8500"
                      max="200000"
                      step="5000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, Number(e.target.value)] }))}
                      className="w-full accent-[#A36B40]"
                    />
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold block mb-2 text-[#1A1615] dark:text-[#FAF7F2]">
                      Heritage Fabric
                    </span>
                    <div className="space-y-2">
                      {FABRIC_OPTIONS.map(fabric => {
                        const checked = filters.fabrics.includes(fabric);
                        return (
                          <button
                            key={fabric}
                            onClick={() => toggleFabric(fabric)}
                            className="w-full flex justify-between text-xs py-1 text-[#6B635B] dark:text-[#B8ADA3]"
                          >
                            <span>{fabric}</span>
                            <span>{checked ? '✓' : ''}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8DFD5] dark:border-[#3B3029] flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 py-2.5 border border-[#E8DFD5] dark:border-[#3B3029] text-xs font-semibold uppercase tracking-wider"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] text-xs font-semibold uppercase tracking-wider"
                >
                  Show ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
