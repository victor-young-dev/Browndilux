import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, Sparkles, MessageCircle, Heart, ArrowUpRight, Download } from 'lucide-react';
import { BROWNDILUX_WHATSAPP_NUMBER, generateWhatsAppUrl } from '../utils/formatters';

export const Footer: React.FC = () => {
  const { setCurrentView } = useShop();

  const whatsappConcierge = generateWhatsAppUrl(
    BROWNDILUX_WHATSAPP_NUMBER,
    'Hello Browndilux Concierge! 🇳🇬 I would like personal assistance selecting a piece today.'
  );

  return (
    <footer className="bg-[#FAF7F2] dark:bg-[#120F0E] text-[#1A1615] dark:text-[#F6F2EC] border-t border-[#E8DFD5] dark:border-[#3B3029] pt-16 pb-12 transition-colors duration-200">
      {/* Trust Badges Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#E8DFD5] dark:border-[#3B3029]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-[#A36B40]/10 flex items-center justify-center flex-shrink-0 text-[#A36B40]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-[#3D2B1F] dark:text-[#FAF7F2]">100% Verified Makers</h4>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1 leading-relaxed">
                Directly authenticated artisan guild in Abeokuta, Ibadan, Lagos & Abuja.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-[#A36B40]/10 flex items-center justify-center flex-shrink-0 text-[#A36B40]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-[#3D2B1F] dark:text-[#FAF7F2]">Lagos & Diaspora Dispatch</h4>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1 leading-relaxed">
                Same-day Lagos delivery & express DHL tracked shipping to UK, US, and Canada.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-[#A36B40]/10 flex items-center justify-center flex-shrink-0 text-[#A36B40]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-[#3D2B1F] dark:text-[#FAF7F2]">AI Style Lab</h4>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1 leading-relaxed">
                Test outfits virtually with customizable African skin tones and occasion harmony.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded bg-[#A36B40]/10 flex items-center justify-center flex-shrink-0 text-[#A36B40]">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-medium text-[#3D2B1F] dark:text-[#FAF7F2]">WhatsApp-First Care</h4>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1 leading-relaxed">
                Direct custom sizing consultation with our Lagos atelier team on +234 813 613 2727.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-serif text-3xl font-semibold tracking-wider text-[#3D2B1F] dark:text-[#FAF7F2]">
              BROWNDILUX
            </span>
            <p className="text-sm text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed max-w-sm">
              Contemporary Nigerian fashion marketplace and social-commerce hybrid. Uniting verified master makers of Adire, Aso-Oke, Senator tailoring, and artisanal leather under one curated roof.
            </p>
            <div className="pt-2">
              <a
                href={whatsappConcierge}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#A36B40] dark:text-[#C68A5E] font-medium hover:underline"
              >
                <span>Chat with Lagos Atelier on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-xs uppercase tracking-widest font-semibold text-[#3D2B1F] dark:text-[#FAF7F2] mb-4">
              Explore Collections
            </h5>
            <ul className="space-y-2 text-sm text-[#6B635B] dark:text-[#B8ADA3]">
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-[#A36B40] transition-colors">
                  All Marketplace Pieces
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-[#A36B40] transition-colors">
                  Adire Renaissance Co-Ords
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-[#A36B40] transition-colors">
                  Deconstructed Senator Suits
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-[#A36B40] transition-colors">
                  Handwoven Aso-Oke Outerwear
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('shop')} className="hover:text-[#A36B40] transition-colors">
                  Full-Grain Leather Belts & Bags
                </button>
              </li>
            </ul>
          </div>

          {/* Experience & Stakeholder Portals */}
          <div>
            <h5 className="text-xs uppercase tracking-widest font-semibold text-[#3D2B1F] dark:text-[#FAF7F2] mb-4">
              Portals & Stakeholders
            </h5>
            <ul className="space-y-2 text-sm text-[#6B635B] dark:text-[#B8ADA3]">
              <li>
                <button onClick={() => setCurrentView('gateway')} className="hover:text-[#A36B40] transition-colors">
                  Universal Stakeholder Gateway
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('seller-portal')} className="hover:text-[#A36B40] transition-colors">
                  Artisan Maker & Workshop Hub
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('wholesaler-portal')} className="hover:text-[#A36B40] transition-colors">
                  Wholesaler & Aso-Ebi B2B Batches
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('buyer-portal')} className="hover:text-[#A36B40] transition-colors">
                  Patron Orders & Measurement Vault
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('community-looks')} className="hover:text-[#A36B40] transition-colors">
                  Styled by Nigeria (Social Lookbook)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('style-lab')} className="hover:text-[#A36B40] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#A36B40]" />
                  <span>AI Avatar Style Lab</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hubs & Dispatch */}
          <div>
            <h5 className="text-xs uppercase tracking-widest font-semibold text-[#3D2B1F] dark:text-[#FAF7F2] mb-4">
              Workshop Hubs
            </h5>
            <div className="space-y-2.5 text-xs text-[#6B635B] dark:text-[#B8ADA3]">
              <p><strong>Lagos Atelier:</strong> Victoria Island & Yaba Creative District</p>
              <p><strong>Dyeing Guild:</strong> Itoku Art Quarter, Abeokuta</p>
              <p><strong>Loom Guild:</strong> Bodija & Oyo Town, Oyo State</p>
              <p><strong>Bespoke Tailoring:</strong> Wuse II, Abuja</p>
              <p className="pt-2 text-[11px] text-[#A36B40] dark:text-[#C68A5E]">
                Official WhatsApp: +234 813 613 2727
              </p>
            </div>
          </div>
        </div>

        {/* Guild Verification & Atelier Guarantee Callout */}
        <div className="mt-10 p-4 rounded bg-[#F4EFEA] dark:bg-[#1A1615] border border-[#E8DFD5] dark:border-[#3B3029] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-0.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 font-bold text-[#A36B40] uppercase tracking-wider text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Certified Nigerian Guild Standards</span>
            </div>
            <p className="text-[#6B635B] dark:text-[#B8ADA3]">
              Every piece is handcrafted by master artisans across Lagos, Ibadan, and Abeokuta. Guaranteed authentic African textiles, escrow protection, and direct WhatsApp concierge support.
            </p>
          </div>
          <a
            href={whatsappConcierge}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded uppercase tracking-wider flex items-center gap-2 transition-colors flex-shrink-0 cursor-pointer shadow-2xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Atelier Concierge</span>
          </a>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 mt-6 border-t border-[#E8DFD5] dark:border-[#3B3029] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B635B] dark:text-[#B8ADA3] gap-4">
          <p>© {new Date().getFullYear()} Browndilux Ltd. All Rights Reserved. Contemporary African Multi-Vendor Guild.</p>
          <div className="flex items-center gap-6">
            <span>Prices displayed in Nigerian Naira (₦)</span>
            <span>·</span>
            <span>Secured with Paystack & Flutterwave</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
