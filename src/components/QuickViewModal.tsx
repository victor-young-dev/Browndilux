import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShoppingBag, MessageCircle, Heart, Check, Sparkles } from 'lucide-react';
import { formatNaira, generateProductWhatsAppMessage, generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInCart,
    toggleProductInCart,
    openProductDetail, 
    wishlist, 
    toggleWishlist 
  } = useShop();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.availableSizes[0] || 'Standard';
  const isSaved = wishlist.includes(product.id);
  const inBag = isInCart(product.id);

  const handleToggleCart = () => {
    if (inBag) {
      toggleProductInCart(product, currentSize, undefined, quantity);
    } else {
      addToCart(product, currentSize, undefined, quantity);
    }
  };

  const handleWhatsAppOrder = () => {
    const text = generateProductWhatsAppMessage(
      product.name,
      product.price,
      currentSize,
      product.vendorName,
      `BDL-${product.id.split('-').pop()}`
    );
    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-[#1E1916]/80 text-[#1A1615] dark:text-[#F6F2EC] hover:text-[#A36B40] rounded-full transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col items-center bg-[#FAF7F2] dark:bg-[#251F1B]">
          <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded bg-[#F4EFEA] dark:bg-[#1E1916] mb-4">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-16 rounded overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-[#A36B40]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Action Form */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="text-xs uppercase tracking-wider text-[#6B635B] dark:text-[#B8ADA3] mb-1">
            <span>{product.vendorName}</span>
            <span className="mx-1.5 opacity-50">·</span>
            <span>{product.vendorLocation}</span>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#1A1615] dark:text-[#F6F2EC] mb-1">
            {product.name}
          </h2>

          <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mb-4">
            {product.subtitle}
          </p>

          <div className="flex items-baseline gap-3 pb-4 mb-4 border-b border-[#E8DFD5] dark:border-[#3B3029]">
            <span className="font-serif text-2xl font-semibold text-[#1A1615] dark:text-[#F6F2EC]">
              {formatNaira(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-[#6B635B] dark:text-[#B8ADA3] line-through">
                {formatNaira(product.compareAtPrice)}
              </span>
            )}
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              In Stock ({product.stock} workshop units)
            </span>
          </div>

          <p className="text-sm text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#F6F2EC]">
                Select Size
              </label>
              <button 
                onClick={() => {
                  setQuickViewProduct(null);
                  openProductDetail(product);
                }}
                className="text-xs text-[#A36B40] dark:text-[#C68A5E] hover:underline"
              >
                View Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.availableSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3.5 text-xs font-medium border transition-colors ${
                    currentSize === size
                      ? 'border-[#3D2B1F] dark:border-[#F6F2EC] bg-[#3D2B1F] text-white dark:bg-[#F6F2EC] dark:text-[#171311]'
                      : 'border-[#E8DFD5] dark:border-[#3B3029] text-[#1A1615] dark:text-[#F6F2EC] hover:border-[#A36B40]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="mt-auto space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#E8DFD5] dark:border-[#3B3029] rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-sm text-[#1A1615] dark:text-[#F6F2EC] hover:bg-[#F4EFEA] dark:hover:bg-[#2B2420]"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-medium text-[#1A1615] dark:text-[#F6F2EC]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 text-sm text-[#1A1615] dark:text-[#F6F2EC] hover:bg-[#F4EFEA] dark:hover:bg-[#2B2420]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleToggleCart}
                className={`flex-1 py-3 px-4 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  inBag
                    ? 'bg-[#A36B40] text-white hover:bg-[#88542F]'
                    : 'bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E]'
                }`}
              >
                {inBag ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>In Bag (Click to Remove)</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · {formatNaira(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-3 border border-[#E8DFD5] dark:border-[#3B3029] text-[#1A1615] dark:text-[#F6F2EC] hover:text-[#A36B40] transition-colors"
                title="Save piece"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#A36B40] text-[#A36B40]' : ''}`} />
              </button>
            </div>

            {/* Direct WhatsApp Order CTA */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-2.5 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1b7e3e] dark:text-[#4ade80] text-xs font-semibold tracking-wider rounded transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via Lagos WhatsApp Concierge</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
