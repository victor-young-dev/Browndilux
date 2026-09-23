import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { 
  ShoppingBag, 
  MessageCircle, 
  Heart, 
  ShieldCheck, 
  Truck, 
  Ruler, 
  Sparkles, 
  ArrowLeft,
  CheckCircle2,
  Share2,
  Check
} from 'lucide-react';
import { formatNaira, generateProductWhatsAppMessage, generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

export const ProductDetailView: React.FC = () => {
  const { 
    activeProduct, 
    setCurrentView, 
    addToCart, 
    isInCart,
    toggleProductInCart,
    products, 
    openVendorDetail, 
    vendors,
    wishlist,
    toggleWishlist,
    showToast
  } = useShop();

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState<boolean>(false);

  if (!activeProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-medium mb-4">No product selected</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="py-2.5 px-6 bg-[#3D2B1F] text-white text-xs uppercase tracking-wider font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const product = activeProduct;
  const currentSize = selectedSize || product.availableSizes[0] || 'Standard';
  const currentColor = selectedColor || product.colorPalette[0]?.name;
  const isSaved = wishlist.includes(product.id);
  const inBag = isInCart(product.id);

  const vendor = vendors.find(v => v.id === product.vendorId);

  // Complete the look recommendations
  const completeTheLook = products
    .filter(p => p.id !== product.id && (p.category === 'artisanal-leather' || p.category !== product.category))
    .slice(0, 3);

  const handleToggleBag = () => {
    if (inBag) {
      toggleProductInCart(product, currentSize, currentColor, quantity);
    } else {
      addToCart(product, currentSize, currentColor, quantity);
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on Browndilux Nigerian Marketplace`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumb & Navigation Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#A36B40] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marketplace</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2 text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615] dark:hover:text-white transition-colors"
          title="Share Piece"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded bg-[#F4EFEA] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029]">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80';
              }}
              className="w-full h-full object-cover object-top"
            />
            {product.stock <= 5 && (
              <span className="absolute top-4 left-4 text-xs font-medium text-amber-800 dark:text-amber-200 bg-amber-50/90 dark:bg-amber-950/80 px-2 py-1 border border-amber-300 dark:border-amber-700">
                Only {product.stock} units remaining in artisan workshop
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-24 rounded overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-[#A36B40]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt="thumbnail"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80';
                    }}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details & Actions Column */}
        <div className="lg:col-span-5 space-y-6 flex flex-col">
          <div>
            {/* Maker Profile Link */}
            {vendor && (
              <div 
                onClick={() => openVendorDetail(vendor)}
                className="cursor-pointer inline-flex items-center gap-2 mb-2 text-xs uppercase tracking-wider text-[#A36B40] dark:text-[#C68A5E] hover:underline"
              >
                <span>{vendor.name}</span>
                <span className="opacity-50">·</span>
                <span>{vendor.location}</span>
              </div>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
              {product.name}
            </h1>

            <p className="text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-1">
              {product.subtitle}
            </p>
          </div>

          {/* Price & Guarantee Strip */}
          <div className="py-4 border-y border-[#E8DFD5] dark:border-[#3B3029] flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                {formatNaira(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#6B635B] dark:text-[#B8ADA3] line-through">
                  {formatNaira(product.compareAtPrice)}
                </span>
              )}
            </div>

            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Verified Stitch Quality
            </span>
          </div>

          {/* Color Palette */}
          {product.colorPalette.length > 0 && (
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] block mb-2">
                Colorway: <span className="font-normal text-[#6B635B] dark:text-[#B8ADA3]">{currentColor}</span>
              </span>
              <div className="flex gap-2">
                {product.colorPalette.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-1.5 py-1.5 px-3 border text-xs rounded transition-all ${
                      currentColor === color.name
                        ? 'border-[#A36B40] bg-[#A36B40]/10 text-[#1A1615] dark:text-white font-medium'
                        : 'border-[#E8DFD5] dark:border-[#3B3029] text-[#6B635B] dark:text-[#B8ADA3]'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2]">
                Select Size
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs text-[#A36B40] dark:text-[#C68A5E] hover:underline flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Nigerian & UK Size Guide</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {product.availableSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 px-3 text-xs font-medium border text-center transition-colors ${
                    currentSize === size
                      ? 'border-[#3D2B1F] dark:border-[#FAF7F2] bg-[#3D2B1F] text-white dark:bg-[#FAF7F2] dark:text-[#171311] font-semibold'
                      : 'border-[#E8DFD5] dark:border-[#3B3029] text-[#1A1615] dark:text-[#FAF7F2] hover:border-[#A36B40]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Counter & Primary CTAs */}
          <div className="space-y-3 pt-4">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3">
              <div className="flex items-center border border-[#E8DFD5] dark:border-[#3B3029] rounded bg-white dark:bg-[#251F1B]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-3 text-sm text-[#1A1615] dark:text-[#FAF7F2] hover:bg-[#F4EFEA] dark:hover:bg-[#2B2420] cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 py-3 text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-3 text-sm text-[#1A1615] dark:text-[#FAF7F2] hover:bg-[#F4EFEA] dark:hover:bg-[#2B2420] cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Bag or Remove */}
              <button
                onClick={handleToggleBag}
                className={`flex-1 min-w-[170px] py-3.5 px-4 sm:px-5 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-2xs rounded-xs cursor-pointer ${
                  inBag
                    ? 'bg-[#A36B40] text-white hover:bg-[#88542F]'
                    : 'bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E]'
                }`}
              >
                {inBag ? (
                  <>
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">In Bag (Click to Remove)</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">Add to Bag · {formatNaira(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="p-3.5 border border-[#E8DFD5] dark:border-[#3B3029] text-[#1A1615] dark:text-[#FAF7F2] hover:text-[#A36B40] transition-colors rounded-xs cursor-pointer flex-shrink-0"
                title="Save piece"
                aria-label="Save piece to wishlist"
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#A36B40] text-[#A36B40]' : ''}`} />
              </button>
            </div>

            {/* Direct WhatsApp Order CTA */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3.5 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              <span>Order via WhatsApp Concierge</span>
            </button>
          </div>

          {/* Delivery & Dispatch Accordion Information */}
          <div className="pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029] space-y-3 text-xs text-[#6B635B] dark:text-[#B8ADA3]">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-[#A36B40] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A1615] dark:text-[#FAF7F2]">Lagos Express:</strong> Same-day/24h delivery. Nationwide courier takes 2-4 business days.
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#A36B40] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A1615] dark:text-[#FAF7F2]">Direct Maker Guild Guarantee:</strong> Tailored in Nigeria with authentic indigenous textiles.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Craft Story Tabs */}
      <div className="border-t border-[#E8DFD5] dark:border-[#3B3029] pt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mb-3">
            Garment Story & Description
          </h3>
          <p className="text-sm text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed mb-4">
            {product.description}
          </p>
          <div className="text-xs text-[#6B635B] dark:text-[#B8ADA3] space-y-1">
            <p><strong>Primary Fabric:</strong> {product.fabric}</p>
            <p><strong>Fit & Cut:</strong> Contemporary Nigerian Ergonomic Fit ({product.fitType})</p>
            <p><strong>Made In:</strong> {product.vendorLocation}</p>
          </div>
        </div>

        <div>
          <h3 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mb-3">
            Crafting & Textile Integrity
          </h3>
          <ul className="space-y-2.5 text-xs text-[#6B635B] dark:text-[#B8ADA3]">
            {product.craftDetails.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A36B40] flex-shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Complete The Look Section */}
      {completeTheLook.length > 0 && (
        <div className="border-t border-[#E8DFD5] dark:border-[#3B3029] pt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
                Atelier Pairing
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mt-0.5">
                Complete The Look
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('style-lab')}
              className="text-xs font-semibold text-[#A36B40] hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test in AI Style Lab</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {completeTheLook.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5] dark:border-[#3B3029] mb-4">
              <h3 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                Nigerian & International Sizing Standards
              </h3>
              <button 
                onClick={() => setSizeGuideOpen(false)}
                className="text-xs font-semibold uppercase tracking-wider text-[#A36B40]"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mb-4 leading-relaxed">
              Browndilux tailors use relaxed Nigerian ergonomic cuts that allow comfortable airflow in tropical heat. If you fall between sizes or desire bespoke tailoring, our Lagos team can customize exact dimensions via WhatsApp.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-[#1A1615] dark:text-[#FAF7F2]">
                <thead className="bg-[#FAF7F2] dark:bg-[#251F1B] uppercase tracking-wider text-[10px] text-[#6B635B] dark:text-[#B8ADA3]">
                  <tr>
                    <th className="py-2.5 px-3">Size</th>
                    <th className="py-2.5 px-3">Chest (in)</th>
                    <th className="py-2.5 px-3">Shoulder (in)</th>
                    <th className="py-2.5 px-3">Waist (in)</th>
                    <th className="py-2.5 px-3">UK / US</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DFD5] dark:divide-[#3B3029]">
                  <tr>
                    <td className="py-2 px-3 font-semibold">Small (38)</td>
                    <td className="py-2 px-3">38" - 40"</td>
                    <td className="py-2 px-3">17.5"</td>
                    <td className="py-2 px-3">30" - 32"</td>
                    <td className="py-2 px-3">UK 8-10 / US 36-38</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">Medium (40)</td>
                    <td className="py-2 px-3">40" - 42"</td>
                    <td className="py-2 px-3">18.5"</td>
                    <td className="py-2 px-3">32" - 34"</td>
                    <td className="py-2 px-3">UK 12 / US 40</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">Large (42)</td>
                    <td className="py-2 px-3">42" - 44"</td>
                    <td className="py-2 px-3">19.5"</td>
                    <td className="py-2 px-3">34" - 36"</td>
                    <td className="py-2 px-3">UK 14 / US 42</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">XL (44)</td>
                    <td className="py-2 px-3">44" - 46"</td>
                    <td className="py-2 px-3">20.5"</td>
                    <td className="py-2 px-3">38" - 40"</td>
                    <td className="py-2 px-3">UK 16 / US 44</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">2XL (46)</td>
                    <td className="py-2 px-3">48" - 50"</td>
                    <td className="py-2 px-3">21.5"</td>
                    <td className="py-2 px-3">42" - 44"</td>
                    <td className="py-2 px-3">UK 18 / US 46</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029] flex justify-between items-center">
              <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
                Custom bespoke measurements available at no extra charge.
              </span>
              <button
                onClick={() => {
                  setSizeGuideOpen(false);
                  handleWhatsAppOrder();
                }}
                className="py-2 px-4 bg-[#25D366] text-white text-xs font-semibold rounded flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Send Measurements on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
