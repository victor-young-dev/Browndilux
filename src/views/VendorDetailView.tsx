import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { ArrowLeft, MapPin, Users, Award, MessageCircle, ShieldCheck } from 'lucide-react';
import { generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

export const VendorDetailView: React.FC = () => {
  const { activeVendor, products, setCurrentView } = useShop();

  if (!activeVendor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-medium mb-4">No vendor selected</h2>
        <button
          onClick={() => setCurrentView('vendors')}
          className="py-2.5 px-6 bg-[#3D2B1F] text-white text-xs uppercase tracking-wider font-semibold"
        >
          Return to Maker Directory
        </button>
      </div>
    );
  }

  const vendor = activeVendor;
  const vendorProducts = products.filter(p => p.vendorId === vendor.id);

  const contactWhatsApp = generateWhatsAppUrl(
    BROWNDILUX_WHATSAPP_NUMBER,
    `Hello Browndilux Concierge! 🇳🇬 I would like to inquire about bespoke commissions with ${vendor.name} in ${vendor.location}.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('vendors')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#A36B40] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Makers</span>
      </button>

      {/* Hero Banner */}
      <div className="relative rounded overflow-hidden border border-[#E8DFD5] dark:border-[#3B3029] bg-[#F4EFEA]">
        <div className="h-72 sm:h-80 w-full overflow-hidden">
          <img
            src={vendor.coverImage}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
        </div>

        <div className="absolute bottom-5 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <img
              src={vendor.avatar}
              alt={vendor.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white object-cover shadow-lg bg-white shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[#E8DFD5] font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4ade80] shrink-0" />
                <span>Verified Nigerian Artisan Guild</span>
              </div>
              <h1 className="font-serif text-xl sm:text-4xl font-normal text-white">
                {vendor.name}
              </h1>
              <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#F3D7B5] shrink-0" />
                <span>{vendor.location}</span>
              </p>
            </div>
          </div>

          <a
            href={contactWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consult Atelier on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Story & Workshop Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h2 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
            Workshop Heritage & Craft Story
          </h2>
          <p className="text-sm text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
            {vendor.story}
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            {vendor.badges.map((b, i) => (
              <span key={i} className="py-1 px-3 bg-[#A36B40]/10 text-[#A36B40] font-semibold rounded">
                ✦ {b}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 space-y-4">
          <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
            Atelier Specifications
          </h3>
          <div className="space-y-2.5 text-xs text-[#6B635B] dark:text-[#B8ADA3]">
            <p><strong>Primary Specialty:</strong> {vendor.specialty}</p>
            <p><strong>Artisan Guild Size:</strong> {vendor.artisanCount} master craftspeople</p>
            <p><strong>Guild Verified Since:</strong> {vendor.verifiedSince}</p>
            <p><strong>Customer Rating:</strong> {vendor.rating} ★ ({vendor.reviewCount} verified reviews)</p>
            <p><strong>Official Social:</strong> {vendor.socialHandle}</p>
          </div>
        </div>
      </div>

      {/* Vendor's Catalog */}
      <div className="space-y-6 pt-6 border-t border-[#E8DFD5] dark:border-[#3B3029]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
              Atelier Catalog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-0.5">
              Available Pieces from {vendor.name}
            </h2>
          </div>
          <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
            {vendorProducts.length} pieces in stock
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};
