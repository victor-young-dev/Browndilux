import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MessageCircle, Sparkles, Scissors, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { generatePrivateStylingWhatsAppMessage, generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

export const PrivateStylingView: React.FC = () => {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: 'Owambe Wedding / Society Celebration',
    fabricPreference: 'Authentic Adire Eleko & Botanical Silk',
    budgetRange: '₦80,000 — ₦180,000',
    deliveryDate: '',
    location: 'Lagos Island / Lekki',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Consultation request generated! Opening WhatsApp concierge...');

    const message = generatePrivateStylingWhatsAppMessage({
      name: formData.name,
      occasion: formData.occasion,
      fabricPreference: formData.fabricPreference,
      budgetRange: formData.budgetRange,
      notes: `${formData.notes} | Preferred City: ${formData.location} | Target Date: ${formData.deliveryDate || 'Flexible'}`
    });

    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, message);
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
          <Scissors className="w-3.5 h-3.5" />
          <span>Bespoke Concierge & Wardrobe Curation</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1615] dark:text-[#FAF7F2]">
          Private Nigerian Styling Service
        </h1>

        <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] max-w-lg mx-auto leading-relaxed">
          Planning an Owambe wedding, corporate keynote, or wardrobe renewal? Connect directly with our Lagos & Abuja atelier stylists on WhatsApp for customized swatches and master tailor fitting.
        </p>
      </div>

      {/* Trust Highlights Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded">
          <Clock className="w-5 h-5 text-[#A36B40] mx-auto mb-2" />
          <h4 className="font-serif text-sm font-medium text-[#1A1615] dark:text-[#FAF7F2]">15-Minute Response</h4>
          <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">Quick consultation on WhatsApp</p>
        </div>

        <div className="p-4 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded">
          <Sparkles className="w-5 h-5 text-[#A36B40] mx-auto mb-2" />
          <h4 className="font-serif text-sm font-medium text-[#1A1615] dark:text-[#FAF7F2]">Direct Mill Sourcing</h4>
          <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">Custom Adire & Aso-Oke weaving</p>
        </div>

        <div className="p-4 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded">
          <ShieldCheck className="w-5 h-5 text-[#A36B40] mx-auto mb-2" />
          <h4 className="font-serif text-sm font-medium text-[#1A1615] dark:text-[#FAF7F2]">Lagos & Diaspora Fit</h4>
          <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">In-person Lagos or virtual overseas</p>
        </div>
      </div>

      {/* Lead Form Card */}
      <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 sm:p-10 shadow-sm">
        <form onSubmit={handleFormSubmit} className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Babatunde Adeleke"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+234 803 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                Event Occasion
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full p-3 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
              >
                <option value="Owambe Wedding / Society Celebration">Owambe Wedding / Society Celebration</option>
                <option value="Corporate Executive & Boardroom Native">Corporate Executive & Boardroom Native</option>
                <option value="Red Carpet Gala / Fashion Week">Red Carpet Gala / Fashion Week</option>
                <option value="Diaspora Trip / Lagos Holiday Wardrobe">Diaspora Trip / Lagos Holiday Wardrobe</option>
                <option value="Groom / Bridal Family Aso-Ebi Set">Groom / Bridal Family Aso-Ebi Set</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                Target Budget Range (NGN)
              </label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                className="w-full p-3 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
              >
                <option value="₦50,000 — ₦80,000 (Core Contemporary)">₦50,000 — ₦80,000 (Core Contemporary)</option>
                <option value="₦80,000 — ₦180,000 (Artisan Bespoke)">₦80,000 — ₦180,000 (Artisan Bespoke)</option>
                <option value="₦180,000 — ₦350,000 (Regal Handwoven)">₦180,000 — ₦350,000 (Regal Handwoven)</option>
                <option value="₦350,000+ (Full Luxury Wardrobe / Bridal)">₦350,000+ (Full Luxury Wardrobe / Bridal)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                Fabric Interest
              </label>
              <select
                value={formData.fabricPreference}
                onChange={(e) => setFormData({ ...formData, fabricPreference: e.target.value })}
                className="w-full p-3 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
              >
                <option value="Authentic Adire Eleko & Botanical Silk">Authentic Adire Eleko & Botanical Silk</option>
                <option value="Handwoven Narrow-Loom Aso-Oke">Handwoven Narrow-Loom Aso-Oke</option>
                <option value="Savile Row Senator Cashmere / Tropical Wool">Savile Row Senator Cashmere / Tropical Wool</option>
                <option value="Modern Ankara Geometric Blend">Modern Ankara Geometric Blend</option>
                <option value="Full Grain Nigerian Leather Accessories">Full Grain Nigerian Leather Accessories</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                Your Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-3 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
              >
                <option value="Lagos (Island / Lekki / Ikoyi)">Lagos (Island / Lekki / Ikoyi)</option>
                <option value="Lagos (Mainland / Ikeja / Yaba)">Lagos (Mainland / Ikeja / Yaba)</option>
                <option value="Abuja FCT">Abuja FCT</option>
                <option value="Port Harcourt / Rivers">Port Harcourt / Rivers</option>
                <option value="Diaspora (United Kingdom)">Diaspora (United Kingdom)</option>
                <option value="Diaspora (United States / Canada)">Diaspora (United States / Canada)</option>
                <option value="Other International">Other International</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
              Styling Notes / Measurements / Desired Silhouette
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about color preferences, collar choices (mandarin vs classic), or specific dates you need the garment delivered..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-3 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open WhatsApp Consultation (+234 813 613 2727)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
