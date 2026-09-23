import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ViewType, UserRole } from '../types';
import { 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Sparkles, 
  Sun, 
  Moon, 
  MessageCircle, 
  Search,
  Compass,
  Users,
  ChevronDown,
  Package,
  Scissors,
  ShieldCheck,
  Check
} from 'lucide-react';
import { BROWNDILUX_WHATSAPP_NUMBER, generateWhatsAppUrl } from '../utils/formatters';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    cartCount, 
    setIsCartOpen, 
    wishlist, 
    isDarkMode, 
    toggleDarkMode,
    filters,
    setFilters,
    currentUser,
    activeRole,
    setIsAuthModalOpen,
    loginAsDemo
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cookieNoticeDismissed, setCookieNoticeDismissed] = useState<boolean>(() => {
    return localStorage.getItem('bdl_cookie_accepted') === 'true';
  });

  const handleAcceptCookies = () => {
    localStorage.setItem('bdl_cookie_accepted', 'true');
    setCookieNoticeDismissed(true);
  };

  const navLinks: { label: string; view: ViewType; badge?: string; icon?: React.ReactNode }[] = [
    { 
      label: 'Gateway', 
      view: 'gateway',
      icon: <Compass className="w-3.5 h-3.5 text-[#A36B40]" />
    },
    { label: 'Storefront', view: 'home' },
    { label: 'Marketplace', view: 'shop' },
    { 
      label: 'AI Style Lab', 
      view: 'style-lab', 
      badge: 'Avatar Try-On',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#A36B40] dark:text-[#C68A5E]" />
    },
    { label: 'Makers Guild', view: 'vendors' },
    { label: 'Styled By Nigeria', view: 'community-looks' },
    { label: 'B2B Aso-Ebi', view: 'wholesaler-portal' }
  ];

  const handleNav = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentView('shop');
    setSearchOpen(false);
  };

  const whatsappInquiryUrl = generateWhatsAppUrl(
    BROWNDILUX_WHATSAPP_NUMBER,
    'Hello Browndilux Concierge! 🇳🇬 I would like personal assistance selecting a contemporary Nigerian piece today.'
  );

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'seller': return { label: 'Artisan Atelier', icon: Scissors };
      case 'wholesaler': return { label: 'Wholesale B2B', icon: Package };
      case 'admin': return { label: 'Guild Admin', icon: ShieldCheck };
      default: return { label: 'Patron', icon: Users };
    }
  };

  const roleInfo = getRoleBadge(activeRole);
  const RoleIcon = roleInfo.icon;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 dark:bg-[#171311]/95 backdrop-blur-md border-b border-[#E8DFD5] dark:border-[#3B3029] transition-colors duration-200">
      {/* Top Editorial Ticker Bar */}
      <div className="bg-[#3D2B1F] dark:bg-[#0D0B0A] text-[#FAF7F2] text-xs py-1.5 px-3 sm:px-4 font-normal tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Announcement */}
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-[11px] sm:text-xs">
            <span className="font-medium text-[#FAF7F2]">
              🇳🇬 Heritage Meets Modern Nigerian Craft
            </span>
            <span className="opacity-40 hidden md:inline">·</span>
            <span className="text-[#E8DFD5] hidden md:inline">
              Express Lagos Delivery &gt; ₦100k · Worldwide DHL Shipping
            </span>
          </div>

          {/* Persona Switcher & WhatsApp Link */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 py-0.5 px-2 bg-white/10 hover:bg-white/20 rounded text-[11px] font-medium transition-colors cursor-pointer"
                title="Switch Stakeholder Persona"
              >
                <RoleIcon className="w-3 h-3 text-[#E8DFD5]" />
                <span className="hidden xs:inline">{currentUser ? currentUser.name.split(' ')[0] : 'Guest'} · </span>
                <span className="text-[#E8DFD5] font-semibold">{roleInfo.label}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-64 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xl py-2 z-50 text-left text-xs text-[#1A1615] dark:text-[#FAF7F2]">
                  <div className="px-3 py-1.5 border-b border-[#E8DFD5] dark:border-[#3B3029]">
                    <span className="text-[10px] uppercase font-bold text-[#A36B40] block">Active Persona:</span>
                    <p className="font-semibold text-xs truncate">{currentUser?.name}</p>
                    <p className="text-[10px] text-[#6B635B] dark:text-[#B8ADA3]">{currentUser?.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNav(
                        activeRole === 'seller' ? 'seller-portal' :
                        activeRole === 'wholesaler' ? 'wholesaler-portal' :
                        activeRole === 'admin' ? 'dashboard' : 'buyer-portal'
                      )}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#FAF7F2] dark:hover:bg-[#251F1B] font-medium cursor-pointer"
                    >
                      Open My Portal Dashboard
                    </button>
                    <button
                      onClick={() => handleNav('gateway')}
                      className="w-full text-left px-3 py-1.5 hover:bg-[#FAF7F2] dark:hover:bg-[#251F1B] cursor-pointer"
                    >
                      All Stakeholder Gateways
                    </button>
                  </div>

                  <div className="border-t border-[#E8DFD5] dark:border-[#3B3029] pt-1.5 px-3">
                    <span className="text-[10px] uppercase font-bold text-[#6B635B] dark:text-[#B8ADA3] block mb-1">
                      Quick Switch Persona:
                    </span>
                    <div className="grid grid-cols-2 gap-1 pb-1">
                      <button
                        onClick={() => { loginAsDemo('buyer'); setUserDropdownOpen(false); }}
                        className={`p-1.5 rounded text-[10px] font-semibold text-center transition-colors cursor-pointer ${
                          activeRole === 'buyer' 
                            ? 'bg-[#A36B40] text-white' 
                            : 'bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#A36B40]/20'
                        }`}
                      >
                        🛍️ Patron
                      </button>
                      <button
                        onClick={() => { loginAsDemo('seller'); setUserDropdownOpen(false); }}
                        className={`p-1.5 rounded text-[10px] font-semibold text-center transition-colors cursor-pointer ${
                          activeRole === 'seller' 
                            ? 'bg-[#A36B40] text-white' 
                            : 'bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#A36B40]/20'
                        }`}
                      >
                        🧵 Atelier
                      </button>
                      <button
                        onClick={() => { loginAsDemo('wholesaler'); setUserDropdownOpen(false); }}
                        className={`p-1.5 rounded text-[10px] font-semibold text-center transition-colors cursor-pointer ${
                          activeRole === 'wholesaler' 
                            ? 'bg-[#A36B40] text-white' 
                            : 'bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#A36B40]/20'
                        }`}
                      >
                        📦 B2B Batches
                      </button>
                      <button
                        onClick={() => { loginAsDemo('admin'); setUserDropdownOpen(false); }}
                        className={`p-1.5 rounded text-[10px] font-semibold text-center transition-colors cursor-pointer ${
                          activeRole === 'admin' 
                            ? 'bg-[#A36B40] text-white' 
                            : 'bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#A36B40]/20'
                        }`}
                      >
                        🛡️ Admin
                      </button>
                    </div>

                    <button
                      onClick={() => { setIsAuthModalOpen(true); setUserDropdownOpen(false); }}
                      className="w-full py-1 mt-1 text-center text-[10px] text-[#A36B40] hover:underline cursor-pointer"
                    >
                      Sign In with Custom Account →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a 
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs text-[#E8DFD5] hover:text-white transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#4ade80]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Cookie & Atelier Experience Notice */}
      {!cookieNoticeDismissed && (
        <div className="bg-[#FAF4ED] dark:bg-[#201A17] border-b border-[#E8DFD5] dark:border-[#3B3029] py-2 px-3 sm:px-4 text-[11px] text-[#6B635B] dark:text-[#B8ADA3] transition-all">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <span className="text-sm">🍪</span>
              <span className="leading-snug">
                <strong className="text-[#1A1615] dark:text-[#FAF7F2] font-semibold">Cookie & Experience Notice:</strong> We use cookies & local storage to remember your bespoke styling selections, shopping bag pieces, and currency preferences.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAcceptCookies}
                className="py-1 px-3 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] font-semibold text-[10px] uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Accept Cookies
              </button>
              <button
                onClick={() => setCookieNoticeDismissed(true)}
                className="p-1 text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615] dark:hover:text-white transition-colors cursor-pointer"
                title="Dismiss notice"
                aria-label="Close cookie notice"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 -ml-1.5 text-[#1A1615] dark:text-[#F6F2EC] hover:text-[#A36B40] focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNav('home')} 
              className="group text-left focus:outline-none cursor-pointer"
            >
              <span className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold tracking-wider text-[#1A1615] dark:text-[#F6F2EC] group-hover:text-[#A36B40] transition-colors">
                BROWNDILUX
              </span>
              <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.24em] text-[#6B635B] dark:text-[#B8ADA3] -mt-0.5 sm:-mt-1 font-medium">
                Contemporary African Fashion Guild
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map(link => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNav(link.view)}
                  className={`text-xs uppercase tracking-wider font-semibold py-2 transition-colors relative flex items-center gap-1.5 cursor-pointer ${
                    isActive 
                      ? 'text-[#A36B40] dark:text-[#C68A5E]' 
                      : 'text-[#1A1615] dark:text-[#F6F2EC] hover:text-[#A36B40] dark:hover:text-[#C68A5E]'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 text-[9px] font-bold px-1.5 py-0.5 bg-[#A36B40]/15 text-[#A36B40] dark:text-[#C68A5E] rounded-full border border-[#A36B40]/30 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A36B40] dark:bg-[#C68A5E]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#1A1615] dark:text-[#F6F2EC] hover:text-[#A36B40] dark:hover:text-[#C68A5E] transition-colors cursor-pointer"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Dark Mode Switcher with Visual Indication */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-[#1A1615] dark:text-[#F6F2EC] hover:text-[#A36B40] dark:hover:text-[#C68A5E] transition-transform active:scale-90 cursor-pointer rounded-full"
              aria-label="Toggle Dark Mode"
              title={isDarkMode ? 'Switch to Warm Cream Mode' : 'Switch to Dark Espresso Mode'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 rotate-0 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#3D2B1F] rotate-0 transition-transform duration-300" />
              )}
            </button>

            {/* Saved Wishlist */}
            <button
              onClick={() => handleNav('buyer-portal')}
              className="relative p-2 text-[#1A1615] dark:text-[#F6F2EC] hover:text-[#A36B40] dark:hover:text-[#C68A5E] transition-colors hidden sm:block cursor-pointer"
              aria-label="Saved Items"
              title="Saved Items"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#A36B40] text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 bg-[#3D2B1F] dark:bg-[#F6F2EC] text-white dark:text-[#171311] rounded hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] transition-colors flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-xs"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold tracking-wider hidden sm:inline">BAG</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 bg-[#A36B40] dark:bg-[#3D2B1F] text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Search Bar */}
        {searchOpen && (
          <div className="py-2.5 pb-4 border-t border-[#E8DFD5] dark:border-[#3B3029] animate-in fade-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#6B635B] dark:text-[#B8ADA3]" />
                <input
                  type="text"
                  placeholder="Search Adire co-ords, Senator tunics, Aso-Oke bombers, brass belts..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#221C18] border border-[#E8DFD5] dark:border-[#3B3029] text-xs sm:text-sm text-[#1A1615] dark:text-[#F6F2EC] rounded focus:outline-none focus:border-[#A36B40]"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#A36B40] hover:bg-[#82532F] text-white text-xs sm:text-sm font-medium rounded transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD5] dark:border-[#3B3029] bg-[#FAF7F2] dark:bg-[#171311] px-4 pt-3 pb-6 space-y-3">
          {/* Stakeholder Demo Fast Switch on Mobile */}
          <div className="p-3 bg-white dark:bg-[#221C18] rounded border border-[#E8DFD5] dark:border-[#3B3029] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#A36B40] tracking-wider">
                Persona: {roleInfo.label}
              </span>
              <button
                onClick={toggleDarkMode}
                className="text-[11px] font-medium text-[#A36B40] flex items-center gap-1 cursor-pointer"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{isDarkMode ? 'Light Cream' : 'Dark Mode'}</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => { loginAsDemo('buyer'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 rounded text-[11px] font-medium text-center cursor-pointer transition-colors ${
                  activeRole === 'buyer' ? 'bg-[#A36B40] text-white' : 'bg-[#FAF7F2] dark:bg-[#2B2420]'
                }`}
              >
                🛍️ Patron
              </button>
              <button
                onClick={() => { loginAsDemo('seller'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 rounded text-[11px] font-medium text-center cursor-pointer transition-colors ${
                  activeRole === 'seller' ? 'bg-[#A36B40] text-white' : 'bg-[#FAF7F2] dark:bg-[#2B2420]'
                }`}
              >
                🧵 Atelier
              </button>
              <button
                onClick={() => { loginAsDemo('wholesaler'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 rounded text-[11px] font-medium text-center cursor-pointer transition-colors ${
                  activeRole === 'wholesaler' ? 'bg-[#A36B40] text-white' : 'bg-[#FAF7F2] dark:bg-[#2B2420]'
                }`}
              >
                📦 B2B Batches
              </button>
              <button
                onClick={() => { loginAsDemo('admin'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 rounded text-[11px] font-medium text-center cursor-pointer transition-colors ${
                  activeRole === 'admin' ? 'bg-[#A36B40] text-white' : 'bg-[#FAF7F2] dark:bg-[#2B2420]'
                }`}
              >
                🛡️ Admin
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            {navLinks.map(link => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNav(link.view)}
                  className={`w-full text-left py-2.5 px-3 rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-between cursor-pointer ${
                    isActive 
                      ? 'bg-[#3D2B1F] text-white dark:bg-[#F6F2EC] dark:text-[#171311]' 
                      : 'text-[#1A1615] dark:text-[#F6F2EC] hover:bg-[#E8DFD5]/50 dark:hover:bg-[#221C18]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.icon}
                    <span>{link.label}</span>
                  </span>
                  {link.badge && (
                    <span className="text-[10px] py-0.5 px-2 bg-[#A36B40] text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Footer Quick Actions */}
          <div className="pt-2 border-t border-[#E8DFD5] dark:border-[#3B3029] space-y-2">
            <button
              onClick={() => handleNav('buyer-portal')}
              className="w-full py-2 text-center text-xs font-semibold text-[#A36B40] dark:text-[#C68A5E] hover:underline cursor-pointer"
            >
              My Nigerian Measurement Vault & Orders →
            </button>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#25D366] text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Atelier Concierge</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
