import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { UserRole } from '../types';
import { 
  Compass, 
  ShoppingBag, 
  Scissors, 
  Package, 
  ShieldCheck, 
  RefreshCw,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight
} from 'lucide-react';

export const StakeholderQuickBar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    activeRole, 
    appMode, 
    setAppMode, 
    enterProductionApp, 
    enterDemoApp,
    currentUser 
  } = useShop();

  const [isCollapsed, setIsCollapsed] = useState(false);

  // If on the gateway landing view itself, the full dual gateway cards are already on screen
  if (currentView === 'gateway') {
    return null;
  }

  const handleRoleSwitch = (role: UserRole) => {
    if (appMode === 'live') {
      enterProductionApp(role);
    } else {
      enterDemoApp(role);
    }
  };

  const handleToggleMode = () => {
    const nextMode = appMode === 'live' ? 'demo' : 'live';
    setAppMode(nextMode);
  };

  return (
    <aside 
      aria-label="Stakeholder and Environment Bar"
      className="bg-[#241B16] dark:bg-[#0F0D0C] text-[#FAF7F2] border-b border-[#3B3029] py-1.5 px-3 sm:px-6 text-xs transition-all z-30 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Mode Indicator & Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => {
              setCurrentView('gateway');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 py-1 px-2.5 bg-white/10 hover:bg-[#A36B40] rounded text-[11px] font-semibold text-[#FAF7F2] transition-colors cursor-pointer"
            title="Return to Dual Gateway Landing"
          >
            <Compass className="w-3.5 h-3.5 text-[#E8DFD5]" />
            <span className="hidden xs:inline">Dual Gateways</span>
            <span className="xs:hidden">Gateway</span>
          </button>

          <div className="h-4 w-px bg-white/20 hidden sm:block" />

          {/* Current App Mode Tag */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#A36B40] dark:text-[#C68A5E] hidden md:inline">
              Environment:
            </span>
            <div 
              className={`inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                appMode === 'live' 
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50' 
                  : 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${appMode === 'live' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{appMode === 'live' ? 'Main Actual App' : 'Demo Sandbox'}</span>
            </div>

            {/* Toggle Mode Button */}
            <button
              onClick={handleToggleMode}
              className="text-[10px] text-[#E8DFD5] hover:text-white underline underline-offset-2 transition-colors cursor-pointer flex items-center gap-1"
              title={appMode === 'live' ? 'Switch to Demo Sandbox' : 'Switch to Main Actual App'}
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>{appMode === 'live' ? 'Switch to Demo' : 'Switch to Live'}</span>
            </button>
          </div>
        </div>

        {/* Right: Stakeholder Persona Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap ml-auto">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#B8ADA3] hidden lg:inline">
            Test as Stakeholder:
          </span>

          <div className="flex items-center gap-1 bg-black/30 p-0.5 rounded border border-white/10">
            {/* 1. Patron */}
            <button
              onClick={() => handleRoleSwitch('buyer')}
              className={`flex items-center gap-1 py-1 px-2 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                activeRole === 'buyer'
                  ? 'bg-[#A36B40] text-white font-semibold shadow-xs'
                  : 'text-[#D5CDC5] hover:text-white hover:bg-white/10'
              }`}
              title="Test as Patron / Retail Buyer"
            >
              <ShoppingBag className="w-3 h-3" />
              <span className="hidden sm:inline">Patron</span>
            </button>

            {/* 2. Artisan Maker */}
            <button
              onClick={() => handleRoleSwitch('seller')}
              className={`flex items-center gap-1 py-1 px-2 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                activeRole === 'seller'
                  ? 'bg-[#A36B40] text-white font-semibold shadow-xs'
                  : 'text-[#D5CDC5] hover:text-white hover:bg-white/10'
              }`}
              title="Test as Artisan Atelier / Tailor"
            >
              <Scissors className="w-3 h-3" />
              <span className="hidden sm:inline">Artisan Atelier</span>
              <span className="sm:hidden">Artisan</span>
            </button>

            {/* 3. Wholesaler */}
            <button
              onClick={() => handleRoleSwitch('wholesaler')}
              className={`flex items-center gap-1 py-1 px-2 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                activeRole === 'wholesaler'
                  ? 'bg-[#A36B40] text-white font-semibold shadow-xs'
                  : 'text-[#D5CDC5] hover:text-white hover:bg-white/10'
              }`}
              title="Test as B2B Aso-Ebi Wholesaler"
            >
              <Package className="w-3 h-3" />
              <span className="hidden sm:inline">Wholesaler</span>
              <span className="sm:hidden">B2B</span>
            </button>

            {/* 4. Admin */}
            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`flex items-center gap-1 py-1 px-2 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                activeRole === 'admin'
                  ? 'bg-[#A36B40] text-white font-semibold shadow-xs'
                  : 'text-[#D5CDC5] hover:text-white hover:bg-white/10'
              }`}
              title="Test as Guild Administrator"
            >
              <ShieldCheck className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
