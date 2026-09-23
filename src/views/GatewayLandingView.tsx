import React from 'react';
import { useShop } from '../context/ShopContext';
import { UserRole } from '../types';
import { 
  ShoppingBag, 
  Scissors, 
  Package, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Users, 
  Award,
  Globe2,
  Lock
} from 'lucide-react';

export const GatewayLandingView: React.FC = () => {
  const { setCurrentView, loginAsDemo, setIsAuthModalOpen } = useShop();

  const handleEnterRole = (role: UserRole) => {
    loginAsDemo(role);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Gateway Hero Section */}
      <section className="relative overflow-hidden bg-[#F4EFEA] dark:bg-[#1A1615] border-b border-[#E8DFD5] dark:border-[#3B3029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-[#FAF7F2] dark:bg-[#251F1B] rounded-full border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A36B40] dark:text-[#C68A5E] shadow-2xs">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Contemporary African Fashion Ecosystem</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1A1615] dark:text-[#FAF7F2] tracking-tight text-balance">
              The Gateway for <br className="hidden sm:inline" />
              <span className="italic text-[#A36B40] dark:text-[#C68A5E]">Contemporary Nigerian</span> Fashion
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed max-w-2xl mx-auto font-normal text-balance">
              Connecting patrons, master ateliers, society wedding wholesalers, and curators across Nigeria and the global African diaspora.
            </p>

            {/* Direct Guest Entry */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setCurrentView('home')}
                className="py-3 px-6 sm:py-3.5 sm:px-8 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm rounded-xs cursor-pointer"
              >
                <span>Explore Storefront</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="py-3 px-6 sm:py-3.5 sm:px-7 border border-[#3D2B1F]/30 dark:border-[#E8DFD5]/30 hover:border-[#A36B40] text-[#1A1615] dark:text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 rounded-xs cursor-pointer bg-white/50 dark:bg-[#221C18]/50"
              >
                <Users className="w-4 h-4 text-[#A36B40]" />
                <span>Sign In / Select Role</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Stakeholder Portals Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
            Tailored Workflows
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1">
            Choose Your Entry Portal
          </h2>
          <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1">
            Instant 1-click access to test each stakeholder dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Retail Buyer */}
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 shadow-2xs flex flex-col justify-between hover:border-[#A36B40] transition-all duration-300 hover:-translate-y-1 space-y-6">
            <div>
              <div className="w-11 h-11 rounded bg-[#FAF7F2] dark:bg-[#2B2420] text-[#A36B40] flex items-center justify-center mb-4 border border-[#E8DFD5]/60 dark:border-[#3B3029]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-[#A36B40] tracking-wider block">Stakeholder 01</span>
              <h3 className="font-serif text-xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mt-1">
                Patron & Buyer
              </h3>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-2 leading-relaxed">
                Discover curated garments from verified Nigerian ateliers. Try looks with AI Avatar virtual styling, save bespoke body measurements, and track orders.
              </p>

              <ul className="mt-4 space-y-2 text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>AI Avatar Virtual Try-On</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Door-to-door express delivery</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Bespoke Measurement Vault</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
              <button
                onClick={() => handleEnterRole('buyer')}
                className="w-full py-2.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enter as Patron</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  handleEnterRole('buyer');
                  setCurrentView('buyer-portal');
                }}
                className="w-full py-2 border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] font-semibold text-[#1A1615] dark:text-[#FAF7F2] hover:border-[#A36B40] rounded text-center transition-colors cursor-pointer"
              >
                View Measurement Vault
              </button>
            </div>
          </div>

          {/* 2. Artisan Maker / Seller */}
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 shadow-2xs flex flex-col justify-between hover:border-[#A36B40] transition-all duration-300 hover:-translate-y-1 space-y-6">
            <div>
              <div className="w-11 h-11 rounded bg-[#FAF7F2] dark:bg-[#2B2420] text-[#A36B40] flex items-center justify-center mb-4 border border-[#E8DFD5]/60 dark:border-[#3B3029]">
                <Scissors className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-[#A36B40] tracking-wider block">Stakeholder 02</span>
              <h3 className="font-serif text-xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mt-1">
                Artisan Maker & Atelier
              </h3>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-2 leading-relaxed">
                Dedicated workshop hub for local tailors and textile guilds. Publish new collection pieces, track cutting stages, and receive direct bank disbursements.
              </p>

              <ul className="mt-4 space-y-2 text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Direct catalog garment publishing</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Workshop cutting & stitch tracker</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Direct Nigerian bank payouts</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
              <button
                onClick={() => handleEnterRole('seller')}
                className="w-full py-2.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enter Maker Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  handleEnterRole('seller');
                  setCurrentView('seller-portal');
                }}
                className="w-full py-2 border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] font-semibold text-[#1A1615] dark:text-[#FAF7F2] hover:border-[#A36B40] rounded text-center transition-colors cursor-pointer"
              >
                Manage Atelier Inventory
              </button>
            </div>
          </div>

          {/* 3. Wholesaler & Aso-Ebi */}
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 shadow-2xs flex flex-col justify-between hover:border-[#A36B40] transition-all duration-300 hover:-translate-y-1 space-y-6">
            <div>
              <div className="w-11 h-11 rounded bg-[#FAF7F2] dark:bg-[#2B2420] text-[#A36B40] flex items-center justify-center mb-4 border border-[#E8DFD5]/60 dark:border-[#3B3029]">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-[#A36B40] tracking-wider block">Stakeholder 03</span>
              <h3 className="font-serif text-xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mt-1">
                Wholesaler & B2B
              </h3>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-2 leading-relaxed">
                For wedding planners, diaspora boutique stockists, and corporate clients. Order Aso-Ebi batches with tiered volume discounts and proforma invoices.
              </p>

              <ul className="mt-4 space-y-2 text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Volume discounts up to 45% off</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Aso-Ebi wedding batch calculator</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Direct loom capacity reservations</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
              <button
                onClick={() => handleEnterRole('wholesaler')}
                className="w-full py-2.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enter B2B Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  handleEnterRole('wholesaler');
                  setCurrentView('wholesaler-portal');
                }}
                className="w-full py-2 border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] font-semibold text-[#1A1615] dark:text-[#FAF7F2] hover:border-[#A36B40] rounded text-center transition-colors cursor-pointer"
              >
                Build Society Aso-Ebi Batch
              </button>
            </div>
          </div>

          {/* 4. Guild Admin */}
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 shadow-2xs flex flex-col justify-between hover:border-[#A36B40] transition-all duration-300 hover:-translate-y-1 space-y-6">
            <div>
              <div className="w-11 h-11 rounded bg-[#FAF7F2] dark:bg-[#2B2420] text-[#A36B40] flex items-center justify-center mb-4 border border-[#E8DFD5]/60 dark:border-[#3B3029]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold text-[#A36B40] tracking-wider block">Stakeholder 04</span>
              <h3 className="font-serif text-xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mt-1">
                Guild Administrator
              </h3>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-2 leading-relaxed">
                Platform control tower for guild stewards. Review artisan certifications, manage escrow transactions, audit inventory, and maintain marketplace integrity.
              </p>

              <ul className="mt-4 space-y-2 text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Ecosystem GMV & order analytics</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Artisan certification approvals</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Escrow & settlement management</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
              <button
                onClick={() => handleEnterRole('admin')}
                className="w-full py-2.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Access Control Tower</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  handleEnterRole('admin');
                  setCurrentView('dashboard');
                }}
                className="w-full py-2 border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] font-semibold text-[#1A1615] dark:text-[#FAF7F2] hover:border-[#A36B40] rounded text-center transition-colors cursor-pointer"
              >
                Platform Operations & Health
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Craft Standards Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start text-[#A36B40]">
                <Award className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#A36B40]">5 Certified Guilds</span>
              </div>
              <p className="text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Verified Workshops</p>
              <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">Abeokuta, Ibadan, Lagos, Abuja, Kano</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start text-[#A36B40]">
                <Sparkles className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#A36B40]">100% Authentic</span>
              </div>
              <p className="text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Genuine Craftsmanship</p>
              <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">Botanical Adire, Aso-Oke, Full-Grain Leather</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start text-[#A36B40]">
                <Globe2 className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#A36B40]">Global Dispatch</span>
              </div>
              <p className="text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Express Door-to-Door</p>
              <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">Fast Lagos dispatch, Nationwide & DHL Worldwide</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start text-[#A36B40]">
                <Lock className="w-5 h-5" />
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#A36B40]">Escrow Protected</span>
              </div>
              <p className="text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Secure Transactions</p>
              <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">Artisan payouts disbursed upon confirmed delivery</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
