import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Vendor } from '../types';
import { 
  ShieldCheck, 
  MapPin, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Send,
  MessageCircle,
  Award
} from 'lucide-react';
import { generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

export const VendorsView: React.FC = () => {
  const { vendors, openVendorDetail, showToast } = useShop();

  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [formState, setFormState] = useState({
    brandName: '',
    leadArtisan: '',
    workshopLocation: '',
    specialty: 'Adire Dyeing & Textile Art',
    artisanCount: '5-10 artisans',
    phone: '',
    portfolioLink: '',
    story: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Maker application received! Our Lagos guild officer will inspect your workshop.');
    setTimeout(() => {
      setApplicationModalOpen(false);
      setSubmitted(false);
    }, 2500);
  };

  const handleWhatsAppApply = () => {
    const text = [
      `🇳🇬 *Browndilux Maker Guild Application*`,
      `Brand Name: ${formState.brandName || 'New Artisan'}`,
      `Lead Artisan: ${formState.leadArtisan}`,
      `Location: ${formState.workshopLocation}`,
      `Craft Specialty: ${formState.specialty}`,
      `Artisan Capacity: ${formState.artisanCount}`,
      `Portfolio / Instagram: ${formState.portfolioLink}`,
      ``,
      `Hello! We would like to apply to retail our contemporary Nigerian garments on the Browndilux marketplace.`
    ].join('\n');

    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="border-b border-[#E8DFD5] dark:border-[#3B3029] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
            Authentic Nigerian Artisan Guild
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1">
            Meet Our Verified Master Makers
          </h1>
          <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-1 max-w-xl">
            We physically inspect every workshop, verify stitch tolerances, and champion indigenous Nigerian textile traditions across Ogun, Oyo, Lagos, and Abuja.
          </p>
        </div>

        <button
          onClick={() => setApplicationModalOpen(true)}
          className="py-3 px-6 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 self-start"
        >
          <Award className="w-4 h-4" />
          <span>Apply to Sell As A Maker</span>
        </button>
      </div>

      {/* Vendors Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {vendors.map(vendor => (
          <div
            key={vendor.id}
            className="group bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded overflow-hidden shadow-xs hover:border-[#A36B40]/50 transition-all flex flex-col"
          >
            {/* Cover Banner with Avatar & Name positioned on top of background image */}
            <div 
              className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#F4EFEA] dark:bg-[#251F1B] cursor-pointer"
              onClick={() => openVendorDetail(vendor)}
            >
              {/* Cover Image in background */}
              <img
                src={vendor.coverImage}
                alt={vendor.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Gradient overlay so names and avatar pop with high contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              
              {/* Guild Member Badge */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md py-1 px-2.5 rounded border border-white/20 text-[11px] font-semibold text-[#E8DFD5]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                <span>Verified Guild Member</span>
              </div>

              {/* Full circular Profile Icon & Names on top of the cover image */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3.5">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border-2 border-white object-cover shadow-xl bg-white shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-white group-hover:text-[#F3D7B5] transition-colors drop-shadow-md truncate">
                    {vendor.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#E8DFD5] mt-1 drop-shadow-sm truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#F3D7B5] shrink-0" />
                    <span className="truncate">{vendor.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed line-clamp-3 mb-4">
                  {vendor.bio}
                </p>

                {/* Badges strip - clean unboxed */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E8DFD5] dark:border-[#3B3029] text-[10px] text-[#A36B40] font-semibold uppercase tracking-wider">
                  {vendor.badges.map((b, i) => (
                    <span key={i} className="bg-[#A36B40]/10 px-2 py-0.5 rounded">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics & Actions */}
              <div className="pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029] flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-[#6B635B] dark:text-[#B8ADA3]">
                  <div>
                    <strong className="text-[#1A1615] dark:text-[#FAF7F2]">{vendor.artisanCount}</strong> Artisans
                  </div>
                  <div>
                    <strong className="text-[#1A1615] dark:text-[#FAF7F2]">{vendor.rating} ★</strong> ({vendor.reviewCount})
                  </div>
                </div>

                <button
                  onClick={() => openVendorDetail(vendor)}
                  className="py-1.5 px-3 bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#3D2B1F] hover:text-white dark:hover:bg-[#FAF7F2] dark:hover:text-[#171311] text-xs font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] rounded transition-colors flex items-center gap-1 border border-[#E8DFD5] dark:border-[#3B3029]"
                >
                  <span>Explore Atelier</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Maker Application Modal */}
      {applicationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5] dark:border-[#3B3029] mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#A36B40] font-semibold">Join The Guild</span>
                <h3 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                  Artisan Maker Registration
                </h3>
              </div>
              <button 
                onClick={() => setApplicationModalOpen(false)}
                className="text-xs font-semibold uppercase tracking-wider text-[#6B635B]"
              >
                Close
              </button>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-medium">Application Submitted</h4>
                <p className="text-xs text-[#6B635B] max-w-sm mx-auto">
                  Our guild vetting team will contact your workshop within 48 hours to schedule physical swatch and stitching inspections.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Brand or Studio Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alara Adire Works"
                    value={formState.brandName}
                    onChange={(e) => setFormState({ ...formState, brandName: e.target.value })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                      Lead Artisan / Founder *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Master Folake Ogunlesi"
                      value={formState.leadArtisan}
                      onChange={(e) => setFormState({ ...formState, leadArtisan: e.target.value })}
                      className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                      Workshop Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abeokuta, Ogun State"
                      value={formState.workshopLocation}
                      onChange={(e) => setFormState({ ...formState, workshopLocation: e.target.value })}
                      className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                      Primary Craft Specialty
                    </label>
                    <select
                      value={formState.specialty}
                      onChange={(e) => setFormState({ ...formState, specialty: e.target.value })}
                      className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                    >
                      <option value="Adire Dyeing & Textile Art">Adire Dyeing & Textile Art</option>
                      <option value="Aso-Oke Narrow Loom Weaving">Aso-Oke Narrow Loom Weaving</option>
                      <option value="Modern Senator & Native Tailoring">Modern Senator & Native Tailoring</option>
                      <option value="Artisanal Leather & Brass Casting">Artisanal Leather & Brass Casting</option>
                      <option value="Contemporary Resort Linen">Contemporary Resort Linen</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                      Artisan Workshop Capacity
                    </label>
                    <select
                      value={formState.artisanCount}
                      onChange={(e) => setFormState({ ...formState, artisanCount: e.target.value })}
                      className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                    >
                      <option value="1-4 artisans">1-4 artisans (Boutique atelier)</option>
                      <option value="5-15 artisans">5-15 artisans (Mid studio)</option>
                      <option value="16-50+ artisans">16-50+ artisans (Guild workshop)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 800 000 0000"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Lookbook / Instagram / Catalog Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/yourhandle"
                    value={formState.portfolioLink}
                    onChange={(e) => setFormState({ ...formState, portfolioLink: e.target.value })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] font-semibold uppercase tracking-wider rounded"
                  >
                    Submit Verification Request
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppApply}
                    className="py-3 px-4 bg-[#25D366] text-white font-semibold rounded flex items-center gap-1.5"
                    title="Apply directly on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">WhatsApp Fast-Track</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
