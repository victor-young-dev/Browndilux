import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { formatNaira, generateProductWhatsAppMessage, generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';
import { Heart, Eye, ShoppingBag, MessageCircle, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    openProductDetail, 
    setQuickViewProduct, 
    wishlist, 
    toggleWishlist,
    isInCart,
    toggleProductInCart
  } = useShop();

  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = wishlist.includes(product.id);
  const inBag = isInCart(product.id);

  const handleBagToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.availableSizes[0] || 'Standard';
    toggleProductInCart(product, defaultSize);
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = generateProductWhatsAppMessage(
      product.name,
      product.price,
      product.availableSizes[0] || 'Standard',
      product.vendorName,
      `BDL-${product.id.split('-').pop()}`
    );
    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="group relative flex flex-col bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#332A24] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#A36B40]/40 cursor-pointer"
      onClick={() => openProductDetail(product)}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4EFEA] dark:bg-[#28221D]">
        <img
          src={product.images[imageIndex] || product.images[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80';
          }}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNewArrival && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A36B40] dark:text-[#E8DFD5] bg-[#FAF7F2]/90 dark:bg-[#171311]/90 backdrop-blur-xs px-2 py-0.5 border border-[#E8DFD5] dark:border-[#3B3029]">
              New Arrival
            </span>
          )}
          {product.isBestSeller && (
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#3D2B1F] dark:text-[#F6F2EC] bg-[#FAF7F2]/90 dark:bg-[#171311]/90 backdrop-blur-xs px-2 py-0.5 border border-[#E8DFD5] dark:border-[#3B3029]">
              Bestseller
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-[10px] font-medium tracking-wide text-amber-700 dark:text-amber-300 bg-amber-50/90 dark:bg-amber-950/80 px-1.5 py-0.5 border border-amber-200 dark:border-amber-800">
              Only {product.stock} left in workshop
            </span>
          )}
        </div>

        {/* Action Buttons Top Right: Shopping Bag Toggle & Wishlist */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {/* Shopping Bag Quick Toggle Icon */}
          <button
            onClick={handleBagToggle}
            className={`p-2 rounded-full backdrop-blur-xs transition-all duration-200 shadow-sm flex items-center justify-center ${
              inBag
                ? 'bg-[#A36B40] text-white ring-2 ring-white/90 dark:ring-[#1E1916] scale-105'
                : 'bg-white/90 dark:bg-[#1E1916]/90 text-[#1A1615] dark:text-[#F6F2EC] hover:bg-[#3D2B1F] hover:text-white dark:hover:bg-[#FAF7F2] dark:hover:text-[#171311]'
            }`}
            title={inBag ? 'In shopping bag (Click to remove)' : 'Add to shopping bag'}
            aria-label={inBag ? 'Remove from shopping bag' : 'Add to shopping bag'}
          >
            {inBag ? (
              <div className="relative">
                <ShoppingBag className="w-4 h-4 fill-white text-white" />
                <Check className="w-2.5 h-2.5 absolute -bottom-1 -right-1 text-white font-bold stroke-[3]" />
              </div>
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="p-2 bg-white/90 dark:bg-[#1E1916]/90 backdrop-blur-xs rounded-full text-[#1A1615] dark:text-[#F6F2EC] hover:text-[#A36B40] transition-colors shadow-sm"
            aria-label={isSaved ? 'Remove from saved' : 'Save to wishlist'}
            title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#A36B40] text-[#A36B40]' : ''}`} />
          </button>
        </div>

        {/* Hover Action Bar */}
        <div className={`absolute bottom-3 left-3 right-3 flex items-center gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <button
            onClick={handleBagToggle}
            className={`flex-1 py-2 px-3 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-md ${
              inBag
                ? 'bg-[#A36B40] text-white hover:bg-[#88542F]'
                : 'bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E]'
            }`}
          >
            {inBag ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Bag (Remove)</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="p-2 bg-white/95 dark:bg-[#2B2420]/95 text-[#1A1615] dark:text-[#F6F2EC] hover:text-[#A36B40] transition-colors border border-[#E8DFD5] dark:border-[#3B3029] shadow-md"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Subtle Maker & Origin Metadata */}
        <div className="text-[11px] uppercase tracking-wider text-[#6B635B] dark:text-[#B8ADA3] mb-1">
          <span>{product.vendorName}</span>
          <span className="mx-1.5 opacity-50">·</span>
          <span>{product.fabric}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#F6F2EC] line-clamp-1 group-hover:text-[#A36B40] dark:group-hover:text-[#C68A5E] transition-colors">
          {product.name}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] line-clamp-1 mt-0.5 mb-3">
          {product.subtitle}
        </p>

        {/* Price & Contextual WhatsApp Action */}
        <div className="mt-auto pt-2 border-t border-[#E8DFD5]/60 dark:border-[#332A24] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg font-semibold text-[#1A1615] dark:text-[#F6F2EC]">
              {formatNaira(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3] line-through">
                {formatNaira(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* WhatsApp Direct Order Button for This Particular Product */}
          <button
            onClick={handleWhatsAppInquiry}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#15803d] dark:text-[#4ade80] hover:text-[#166534] dark:hover:text-[#86efac] bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/60 rounded px-2 py-1 transition-colors"
            title="Order this particular piece directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

