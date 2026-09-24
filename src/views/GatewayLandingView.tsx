import React, { useState } from 'react';
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
  Lock,
  PlayCircle,
  Layers,
  Zap,
  Check,
  Building,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const GatewayLandingView: React.FC = () => {
  const { 
    setCurrentView, 
    loginAsDemo, 
    setIsAuthModalOpen,
    enterProductionApp,
    enterDemoApp,
    appMode
  } = useShop();

  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'demo'>('all');

  return (
    <div className="space-y-16 pb-24">
      {/* Gateway Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4EFEA] via-[#FAF7F2] to-[#FAF7F2] dark:from-[#1A1615] dark:via-[#161211] dark:to-[#151110] border-b border-[#E8DFD5] dark:border-[#3B3029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-18 lg:py-20">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-white/80 dark:bg-[#251F1B] rounded-full border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A36B40] dark:text-[#C68A5E] shadow-2xs">
              <Compass className="w-3.5 h-3.5 animate-spin-slow text-[#A36B40]" />
              <span>Contemporary Nigerian Fashion Ecosystem</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1A1615] dark:text-[#FAF7F2] tracking-tight text-balance">
              The Dual Gateway for <br className="hidden sm:inline" />
              <span className="italic text-[#A36B40] dark:text-[#C68A5E]">Luxury Nigerian Craft</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed max-w-2xl mx-auto font-normal text-balance">
              Experience Browndilux either as the <strong>Main Operational App</strong> ready for live stakeholder testing, or launch the <strong>Interactive Demo Sandbox</strong> with guided sample workflows.
            </p>
          </div>

          {/* DUAL GATEWAYS: Big Prominent Choice Cards */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            
            {/* GATEWAY 1: REAL GATEWAY TO THE MAIN ACTUAL APP */}
            <div className="relative group bg-white dark:bg-[#1E1916] rounded-lg border-2 border-[#A36B40] shadow-xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-2xl transition-all duration-300">
              <div className="absolute -top-3.5 left-6 bg-[#3D2B1F] text-[#FAF7F2] dark:bg-[#A36B40] dark:text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Real Gateway · Main Actual App</span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-md bg-[#FAF7F2] dark:bg-[#2B2420] text-[#A36B40] flex items-center justify-center border border-[#E8DFD5] dark:border-[#3B3029]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded border border-emerald-200 dark:border-emerald-800">
                    Live Operational Mode
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                    Main Production Platform
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-2 leading-relaxed">
                    Test the real application as any stakeholder. Publish custom artisan garments directly into the live catalog, manage order cutting stages, calculate Aso-Ebi yardage orders, save bespoke body measurements, and audit platform GMV.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E8DFD5] dark:border-[#3B3029]">
                  <span className="text-[10px] uppercase font-bold text-[#A36B40] tracking-wider block">
                    Test as Any Stakeholder in Live Mode:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <button
                      onClick={() => enterProductionApp('buyer')}
                      className="p-2.5 rounded bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#3D2B1F] hover:text-white dark:hover:bg-[#A36B40] border border-[#E8DFD5] dark:border-[#3B3029] transition-all text-xs font-medium flex items-center gap-2 group/btn cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#A36B40] group-hover/btn:text-white" />
                      <div className="text-left">
                        <p className="font-semibold leading-none">Patron</p>
                        <p className="text-[10px] opacity-70 mt-0.5">Sizing & Orders</p>
                      </div>
                    </button>

                    <button
                      onClick={() => enterProductionApp('seller')}
                      className="p-2.5 rounded bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#3D2B1F] hover:text-white dark:hover:bg-[#A36B40] border border-[#E8DFD5] dark:border-[#3B3029] transition-all text-xs font-medium flex items-center gap-2 group/btn cursor-pointer"
                    >
                      <Scissors className="w-4 h-4 text-[#A36B40] group-hover/btn:text-white" />
                      <div className="text-left">
                        <p className="font-semibold leading-none">Artisan Maker</p>
                        <p className="text-[10px] opacity-70 mt-0.5">Publish & Workshop</p>
                      </div>
                    </button>

                    <button
                      onClick={() => enterProductionApp('wholesaler')}
                      className="p-2.5 rounded bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#3D2B1F] hover:text-white dark:hover:bg-[#A36B40] border border-[#E8DFD5] dark:border-[#3B3029] transition-all text-xs font-medium flex items-center gap-2 group/btn cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-[#A36B40] group-hover/btn:text-white" />
                      <div className="text-left">
                        <p className="font-semibold leading-none">Wholesaler</p>
                        <p className="text-[10px] opacity-70 mt-0.5">Aso-Ebi Batches</p>
                      </div>
                    </button>

                    <button
                      onClick={() => enterProductionApp('admin')}
                      className="p-2.5 rounded bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#3D2B1F] hover:text-white dark:hover:bg-[#A36B40] border border-[#E8DFD5] dark:border-[#3B3029] transition-all text-xs font-medium flex items-center gap-2 group/btn cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-[#A36B40] group-hover/btn:text-white" />
                      <div className="text-left">
                        <p className="font-semibold leading-none">Guild Admin</p>
                        <p className="text-[10px] opacity-70 mt-0.5">GMV & Escrow</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enter Main App Primary Button */}
              <div className="pt-6 mt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
                <button
                  onClick={() => enterProductionApp('buyer')}
                  className="w-full py-3.5 px-6 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Enter Main Actual App (Live Storefront)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* GATEWAY 2: GATEWAY TO THE DEMO */}
            <div className="relative group bg-white/70 dark:bg-[#1A1615]/70 backdrop-blur-xs rounded-lg border border-[#D5CDC5] dark:border-[#3B3029] shadow-md p-6 sm:p-8 flex flex-col justify-between hover:border-[#A36B40] hover:shadow-xl transition-all duration-300">
              <div className="absolute -top-3.5 left-6 bg-[#6B635B] text-[#FAF7F2] dark:bg-[#3B3029] text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Demo Gateway · Prototype Sandbox</span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-md bg-[#FAF7F2] dark:bg-[#251F1B] text-[#8C5D35] flex items-center justify-center border border-[#E8DFD5] dark:border-[#3B3029]">
                    <PlayCircle className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded border border-amber-200 dark:border-amber-800">
                    Interactive Sandbox
                  </span>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                    Interactive Prototype Demo
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-2 leading-relaxed">
                    Test pre-populated scenarios, concurrency stress simulations, AI virtual try-on avatars, sample bridal party orders, and mock warehouse data without changing live records.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E8DFD5] dark:border-[#3B3029]">
                  <span className="text-[10px] uppercase font-bold text-[#6B635B] dark:text-[#B8ADA3] tracking-wider block">
                    Quick Sample Guided Walkthroughs:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <button
                      onClick={() => enterDemoApp('buyer')}
                      className="p-2.5 rounded bg-[#FAF7F2]/60 dark:bg-[#201A17] hover:bg-[#E8DFD5] dark:hover:bg-[#2D2420] border border-[#E8DFD5] dark:border-[#3B3029] transition-all text-xs font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#A36B40]" />
                      <div className="text-left">
                        <p className="font-semibold leading-none">Shopper Demo</p>
                        <p className="text-[10px] opacity-70 mt-0.5">Avatar Try-On</p>
                      </div>
                    </button>

                    <button
                      onClick={() => enterDemoApp('seller')}
                      className="p-2.5 rounded bg-[#FAF7F2]/60 dark:bg-[#201A17] hover:bg-[#E8DFD5] dark:hover:bg-[#2D2420] border border-[#E8DFD5] dark:border-[#3B3029] transition-all text-xs font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Scissors className="w-4 h-4 text-[#A36B40]" />
                      <div className="text-left">
                        <p className="font-semibold leading-none">Tailor Demo</p>
                        <p className="text-[10px] opacity-70 mt-0.5">Sample Orders</p>
                      </div>
                    </button>

                    <button
                      onClick={() => enterDemoApp('wholesaler')}
                      className="p-2.5 rounded bg-[#FAF7F2]/60 dark:bg-[#201A17] hover:bg-[#E8DFD5] dark:hover:bg-[#2D2420] border border-[#E8DFD5] dark:border-[#3B3029] transition-all text-xs font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-[#A36B40]" />
                      <div className="text-left">
                        <p className="font-semibold leading-none">B2B Demo</p>
                        <p className="text-[10px] opacity-70 mt-0.5">Royal Nuptials</p>
                      </div>
                    </button>

                    <button
                      onClick={() => enterDemoApp('admin')}
                      className="p-2.5 rounded bg-[#FAF7F2]/60 dark:bg-[#201A17] hover:bg-[#E8DFD5] dark:hover:bg-[#2D2420] border border-[#E8DFD5] dark:border-[#3B3029] transition-all text-xs font-medium flex items-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-[#A36B40]" />
                      <div className="text-left">
                        <p className="font-semibold leading-none">Stress Test Demo</p>
                        <p className="text-[10px] opacity-70 mt-0.5">Concurrency Run</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enter Demo Button */}
              <div className="pt-6 mt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
                <button
                  onClick={() => enterDemoApp('buyer')}
                  className="w-full py-3.5 px-6 border-2 border-[#3D2B1F] dark:border-[#E8DFD5] text-[#1A1615] dark:text-[#FAF7F2] hover:bg-[#3D2B1F] hover:text-[#FAF7F2] dark:hover:bg-[#FAF7F2] dark:hover:text-[#171311] text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-[#A36B40]" />
                  <span>Launch Interactive Demo Sandbox</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STAKEHOLDER ARCHITECTURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
            All 4 Stakeholder Workflows
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1">
            Choose Your Stakeholder Console
          </h2>
          <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-2">
            Each role has real capabilities in the main app and guided walk-throughs in the demo sandbox.
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
                  <span>Bespoke Measurement Vault</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>NGN, USD, GBP, EUR Checkout</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
              <button
                onClick={() => enterProductionApp('buyer')}
                className="w-full py-2.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enter Live Storefront</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => enterDemoApp('buyer')}
                className="w-full py-2 border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] font-semibold text-[#1A1615] dark:text-[#FAF7F2] hover:border-[#A36B40] rounded text-center transition-colors cursor-pointer"
              >
                Test in Demo Mode
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
                onClick={() => enterProductionApp('seller')}
                className="w-full py-2.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enter Live Atelier Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => enterDemoApp('seller')}
                className="w-full py-2 border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] font-semibold text-[#1A1615] dark:text-[#FAF7F2] hover:border-[#A36B40] rounded text-center transition-colors cursor-pointer"
              >
                Test in Demo Mode
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
                onClick={() => enterProductionApp('wholesaler')}
                className="w-full py-2.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enter Live B2B Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => enterDemoApp('wholesaler')}
                className="w-full py-2 border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] font-semibold text-[#1A1615] dark:text-[#FAF7F2] hover:border-[#A36B40] rounded text-center transition-colors cursor-pointer"
              >
                Test in Demo Mode
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
                onClick={() => enterProductionApp('admin')}
                className="w-full py-2.5 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Enter Live Control Tower</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => enterDemoApp('admin')}
                className="w-full py-2 border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] font-semibold text-[#1A1615] dark:text-[#FAF7F2] hover:border-[#A36B40] rounded text-center transition-colors cursor-pointer"
              >
                Test in Demo Mode
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Craft Standards Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40]">
              Built for Scale & Integrity
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1">
              Nigerian Craftsmanship · Enterprise Reliability
            </h3>
          </div>

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
