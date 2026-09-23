import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MessageCircle, 
  Scissors, 
  Award,
  Compass,
  CheckCircle2,
  Eye,
  RotateCw,
  Sun,
  Moon,
  Layers,
  Crown,
  ShoppingBag
} from 'lucide-react';
import { formatNaira, generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

export const HomeView: React.FC = () => {
  const { products, setCurrentView, openProductDetail, setFilters } = useShop();

  // 3D Physical Show Glass Replica State
  const [vitrinePiece, setVitrinePiece] = useState<'agbada' | 'gown'>('agbada');
  const [vitrineLighting, setVitrineLighting] = useState<'spotlight' | 'daylight' | 'night'>('spotlight');
  const [vitrineAngle, setVitrineAngle] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>('embroidery');

  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const accessibleGems = products.filter(p => p.price <= 20000).slice(0, 3);

  const heroWhatsApp = generateWhatsAppUrl(
    BROWNDILUX_WHATSAPP_NUMBER,
    'Hello Browndilux! 🇳🇬 I would like to explore bespoke contemporary Nigerian outfits for an upcoming event.'
  );

  const categories = [
    {
      title: 'Adire Renaissance',
      subtitle: 'Botanical cassava resist & modern co-ords',
      image: '/images/adire_coord_model.jpg',
      categoryKey: 'heritage-traditional' as const
    },
    {
      title: 'Corporate Native',
      subtitle: 'Deconstructed Senators & sharp plackets',
      image: '/images/senator_tunic_model.jpg',
      categoryKey: 'corporate-fusion' as const
    },
    {
      title: 'Handwoven Aso-Oke',
      subtitle: 'Narrow-loom statement bombers & vests',
      image: '/images/asooke_bomber_model.jpg',
      categoryKey: 'outerwear-jackets' as const
    },
    {
      title: 'Artisanal Leather',
      subtitle: 'Benin brass hardware & full-grain belts',
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=85',
      categoryKey: 'artisanal-leather' as const
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden bg-[#F4EFEA] dark:bg-[#1A1615] border-b border-[#E8DFD5] dark:border-[#3B3029]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 py-1 px-3 bg-[#FAF7F2] dark:bg-[#251F1B] rounded-full border border-[#E8DFD5] dark:border-[#3B3029] text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A36B40] dark:text-[#C68A5E]">
                <Scissors className="w-3.5 h-3.5" />
                <span>Contemporary Nigerian Multi-Vendor Guild</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#1A1615] dark:text-[#FAF7F2] tracking-tight text-balance">
                Heritage Meets <br className="hidden sm:inline" />
                <span className="italic text-[#A36B40] dark:text-[#C68A5E]">Modern African</span> Style
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed max-w-xl font-normal text-balance">
                Handcrafted garments from master ateliers in Abeokuta, Ibadan, Lagos, and Abuja. From botanical Adire co-ords to architectural Senator tailoring and brass-buckled leathercraft.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="py-3 px-6 sm:py-3.5 sm:px-7 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shadow-sm rounded-xs cursor-pointer"
                >
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('style-lab')}
                  className="py-3 px-5 sm:py-3.5 sm:px-6 border border-[#3D2B1F]/30 dark:border-[#E8DFD5]/30 hover:border-[#A36B40] text-[#1A1615] dark:text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 rounded-xs cursor-pointer bg-white/40 dark:bg-[#251F1B]/40"
                >
                  <Sparkles className="w-4 h-4 text-[#A36B40]" />
                  <span>AI Avatar Style Lab</span>
                </button>
              </div>

              {/* Highlights */}
              <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#6B635B] dark:text-[#B8ADA3]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#A36B40]" />
                  <span>100% Authentic Nigerian Craft</span>
                </div>
                <span className="hidden sm:inline opacity-40">·</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#A36B40]" />
                  <span>Direct WhatsApp Concierge</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Composition */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] rounded overflow-hidden shadow-xl border border-[#E8DFD5] dark:border-[#3B3029]">
                  <img
                    src="/images/adire_coord_model.jpg"
                    alt="Nigerian contemporary fashion model in Adire Co-Ord"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85';
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  {/* Floating Card inside hero image */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-3.5 sm:p-4 bg-[#FAF7F2]/95 dark:bg-[#1A1615]/95 backdrop-blur-md rounded border border-[#E8DFD5] dark:border-[#3B3029] text-[#1A1615] dark:text-[#FAF7F2] shadow-lg animate-float">
                    <div className="text-[10px] uppercase tracking-wider text-[#A36B40] font-bold mb-0.5">
                      Artisan Spotlight · Abeokuta
                    </div>
                    <div className="font-serif text-base sm:text-lg font-medium">Osumare Cocoa Adire Co-Ord</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-serif text-sm sm:text-base font-semibold">{formatNaira(64500)}</span>
                      <button
                        onClick={() => {
                          const p = products.find(prod => prod.id === 'prod-adire-coord-cocoa');
                          if (p) openProductDetail(p);
                        }}
                        className="text-xs text-[#A36B40] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Piece</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continuous Animated Guild Ticker Ribbon */}
        <div className="border-t border-[#E8DFD5] dark:border-[#3B3029] bg-[#FAF7F2] dark:bg-[#151110] py-2.5 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex gap-8 text-[11px] uppercase tracking-[0.22em] font-semibold text-[#A36B40] dark:text-[#C68A5E]">
            <span>✦ Abeokuta Botanical Adire</span>
            <span>✦ Iseyin Narrow-Loom Aso-Oke</span>
            <span>✦ Abuja Architectural Senator Tailoring</span>
            <span>✦ Benin Foundry Lost-Wax Brass</span>
            <span>✦ Yaba Full-Grain Nigerian Leather</span>
            <span>✦ Pan-African Artisan Network</span>
            <span>✦ Free Lagos Delivery &gt; ₦100,000</span>
            <span>✦ DHL Express Worldwide Shipping</span>
            <span>✦ Abeokuta Botanical Adire</span>
            <span>✦ Iseyin Narrow-Loom Aso-Oke</span>
            <span>✦ Abuja Architectural Senator Tailoring</span>
            <span>✦ Benin Foundry Lost-Wax Brass</span>
            <span>✦ Yaba Full-Grain Nigerian Leather</span>
            <span>✦ Pan-African Artisan Network</span>
            <span>✦ Free Lagos Delivery &gt; ₦100,000</span>
            <span>✦ DHL Express Worldwide Shipping</span>
          </div>
        </div>
      </section>

      {/* Stakeholder Gateway Quick Entry Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
                Ecosystem Portals
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mt-0.5">
                Stakeholder & Business Gateways
              </h3>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">
                Tailored workflows for artisan tailors, B2B wholesale buyers, and society wedding planners.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('gateway')}
              className="py-2.5 px-4 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
            >
              <span>Universal Gateway</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <button
              onClick={() => setCurrentView('seller-portal')}
              className="p-4 sm:p-5 text-left bg-white dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] hover:border-[#A36B40] rounded transition-all duration-200 space-y-1.5 group cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-[#A36B40]">🧵 Artisan Atelier Hub</span>
                <ArrowRight className="w-4 h-4 text-[#6B635B] group-hover:text-[#A36B40] group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Workshop & Bank Payouts</p>
              <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">Publish garments to live catalog, track cutting and stitching stages.</p>
            </button>

            <button
              onClick={() => setCurrentView('wholesaler-portal')}
              className="p-4 sm:p-5 text-left bg-white dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] hover:border-[#A36B40] rounded transition-all duration-200 space-y-1.5 group cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-[#A36B40]">📦 Wholesaler & B2B</span>
                <ArrowRight className="w-4 h-4 text-[#6B635B] group-hover:text-[#A36B40] group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Aso-Ebi Batches & Volume Tiers</p>
              <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">Up to 45% volume discounts, direct loom booking and proforma invoices.</p>
            </button>

            <button
              onClick={() => setCurrentView('community-looks')}
              className="p-4 sm:p-5 text-left bg-white dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] hover:border-[#A36B40] rounded transition-all duration-200 space-y-1.5 group cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-[#A36B40]">📸 Styled By Nigeria</span>
                <ArrowRight className="w-4 h-4 text-[#6B635B] group-hover:text-[#A36B40] group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Social Commerce Lookbook</p>
              <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">Real patrons in Lagos & diaspora wearing artisan garments. Shop looks directly.</p>
            </button>
          </div>
        </div>
      </section>

      {/* Curated Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
              Craft Renaissance
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1">
              Curated Craft Categories
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="mt-3 md:mt-0 text-xs font-semibold uppercase tracking-wider text-[#A36B40] dark:text-[#C68A5E] hover:underline flex items-center gap-1 self-start cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                setFilters(prev => ({ ...prev, category: cat.categoryKey }));
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative aspect-[3/4] overflow-hidden rounded cursor-pointer border border-[#E8DFD5] dark:border-[#3B3029] bg-[#F4EFEA]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85';
                }}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 text-white">
                <h3 className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/80 mt-1 line-clamp-1">
                  {cat.subtitle}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E8DFD5] mt-2 group-hover:text-white group-hover:translate-x-1 transition-all">
                  Shop Category <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D Physical Show Glass Replica Section (Interactive Vitrine) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1714] text-[#FAF7F2] rounded-lg border border-[#A36B40]/40 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#3B3029] pb-6">
            <div>
              <div className="inline-flex items-center gap-2 py-1 px-3 bg-[#A36B40]/25 rounded text-xs font-semibold text-[#E8DFD5] uppercase tracking-wider border border-[#A36B40]/40">
                <Eye className="w-3.5 h-3.5 text-[#A36B40]" />
                <span>Atelier Innovation · 3D Physical Show Glass Replica</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal mt-2 text-balance">
                Virtual Vitrine & 360° Showroom Mannequin
              </h2>
              <p className="text-xs sm:text-sm text-[#B8ADA3] mt-1 max-w-2xl text-balance">
                Experience an authentic replica of our luxury Victoria Island boutique display case. Inspect master embroidery under adjustable gallery spotlights or transfer directly to the Avatar Studio.
              </p>
            </div>

            {/* Prototype Transparency Notice */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                Interactive Demo Prototype
              </span>
              <button
                onClick={() => setCurrentView('style-lab')}
                className="py-2.5 px-4 bg-[#A36B40] hover:bg-[#8C522B] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Avatar Studio</span>
              </button>
            </div>
          </div>

          {/* Vitrine Exhibition Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Glass Case Box */}
            <div className="lg:col-span-7">
              <div 
                className={`relative h-[420px] sm:h-[480px] rounded border-2 border-[#A36B40]/40 overflow-hidden flex items-center justify-center transition-all duration-700 ${
                  vitrineLighting === 'spotlight'
                    ? 'bg-gradient-to-b from-[#2A1E17] via-[#1F1510] to-[#120D0A]'
                    : vitrineLighting === 'daylight'
                    ? 'bg-gradient-to-b from-[#4A3728] via-[#2F2117] to-[#17100B]'
                    : 'bg-gradient-to-b from-[#140F0D] via-[#0E0A08] to-[#050403]'
                }`}
              >
                {/* Physical Glass Reflection & Highlights */}
                <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_40px_rgba(255,255,255,0.12)]">
                  <div className="absolute top-0 left-12 w-28 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12" />
                  <div className="absolute top-4 left-4 text-[9px] uppercase tracking-widest font-mono text-[#E8DFD5]/90 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    BROWNDILUX FLAGSHIP VITRINE · REPLICA 01
                  </div>
                  <div className="absolute bottom-4 right-4 text-[9px] uppercase tracking-widest font-mono text-[#A36B40] bg-black/60 px-2 py-0.5 rounded border border-[#A36B40]/30">
                    ROTATION: {vitrineAngle}°
                  </div>
                </div>

                {/* Pedestal with solid brass look */}
                <div className="absolute bottom-4 w-72 h-14 bg-gradient-to-r from-[#5E4A35] via-[#8C6F4F] to-[#4F3E2B] rounded-full shadow-2xl border border-amber-400/40 flex items-center justify-center z-10">
                  <span className="text-[10px] tracking-widest uppercase font-serif text-amber-200/90 font-bold">
                    Master Atelier Exhibition Case
                  </span>
                </div>

                {/* Mannequin in Vitrine with interactive angle */}
                <div 
                  className="relative z-20 transition-transform duration-500 flex flex-col items-center"
                  style={{
                    transform: vitrineAngle === 45 
                      ? 'rotateY(18deg) scale(0.98)' 
                      : vitrineAngle === 90 
                      ? 'rotateY(40deg) scale(0.95)' 
                      : 'rotateY(0deg) scale(1)'
                  }}
                >
                  {vitrinePiece === 'agbada' ? (
                    <div className="flex flex-col items-center">
                      {/* Fila Crown */}
                      <div className="w-20 h-10 bg-gradient-to-r from-[#A36B40] via-[#C98B58] to-[#8C522B] rounded-t-lg shadow-md border-b-2 border-[#583318] flex items-center justify-center relative overflow-hidden -mb-1 z-10">
                        <span className="text-[8px] font-bold text-amber-100 uppercase">Oyo Fila</span>
                      </div>
                      {/* Mannequin Torso with Oba Agbada */}
                      <div className="w-56 h-60 bg-gradient-to-b from-[#6D7D67] via-[#5D6B57] to-[#485343] rounded-t-3xl rounded-b-lg shadow-2xl border-t-2 border-[#8E9F87] relative overflow-hidden flex flex-col items-center pt-3">
                        <div className="w-16 h-24 border-2 border-amber-300/70 rounded-b-xl bg-[#4D5848] flex flex-col items-center justify-center p-1 relative">
                          <Crown className="w-5 h-5 text-amber-200" />
                          <span className="text-[7px] font-mono text-amber-200 uppercase mt-1">Oba Sage</span>
                          
                          {/* Hotspot 1 */}
                          <div 
                            onClick={() => setActiveHotspot('embroidery')}
                            className="absolute -right-2 top-2 w-5 h-5 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center cursor-pointer animate-ping shadow-xs"
                            title="Inspect Embroidery"
                          >
                            +
                          </div>
                        </div>
                        {/* Agbada wings */}
                        <div className="absolute left-3 top-6 w-10 h-44 border-r border-[#3E473A]/40 transform -rotate-12" />
                        <div className="absolute right-3 top-6 w-10 h-44 border-l border-[#3E473A]/40 transform rotate-12" />
                      </div>
                      {/* Pedestal Stand */}
                      <div className="w-4 h-16 bg-[#1A1513] border-l border-r border-amber-400/20" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {/* Moremi Silk Evening Column */}
                      <div className="w-36 h-32 bg-gradient-to-b from-[#A34E32] via-[#863D24] to-[#3B284A] rounded-t-2xl shadow-lg border border-[#C56F52] flex flex-col items-center justify-center relative overflow-hidden">
                        <span className="text-[8px] uppercase tracking-wider font-bold text-amber-100">
                          Moremi Corset
                        </span>
                        {/* Hotspot 2 */}
                        <div 
                          onClick={() => setActiveHotspot('silk')}
                          className="absolute right-2 top-4 w-5 h-5 rounded-full bg-amber-400 text-black font-bold text-[10px] flex items-center justify-center cursor-pointer animate-ping shadow-xs"
                          title="Inspect Adire Silk Resist"
                        >
                          +
                        </div>
                      </div>
                      <div className="w-44 h-48 bg-gradient-to-b from-[#3B284A] via-[#2A1C36] to-[#1E1327] rounded-b-xl shadow-2xl flex items-center justify-center">
                        <span className="text-[8px] text-amber-200/60 uppercase">Adire Eleko Draped Column</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Vitrine Control Bar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs bg-[#251F1B] p-3 rounded border border-[#3B3029]">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#B8ADA3]">Exhibition Piece:</span>
                  <button
                    onClick={() => setVitrinePiece('agbada')}
                    className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${
                      vitrinePiece === 'agbada' ? 'bg-[#A36B40] text-white' : 'text-[#B8ADA3] hover:text-white'
                    }`}
                  >
                    Oba Agbada
                  </button>
                  <button
                    onClick={() => setVitrinePiece('gown')}
                    className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${
                      vitrinePiece === 'gown' ? 'bg-[#A36B40] text-white' : 'text-[#B8ADA3] hover:text-white'
                    }`}
                  >
                    Moremi Gown
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-[#B8ADA3]">Lighting:</span>
                  <button
                    onClick={() => setVitrineLighting('spotlight')}
                    className={`p-1 rounded cursor-pointer ${vitrineLighting === 'spotlight' ? 'text-[#A36B40]' : 'text-[#B8ADA3]'}`}
                    title="Warm Spotlight"
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setVitrineLighting('daylight')}
                    className={`p-1 rounded cursor-pointer ${vitrineLighting === 'daylight' ? 'text-[#A36B40]' : 'text-[#B8ADA3]'}`}
                    title="Lagos Sunlight"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setVitrineLighting('night')}
                    className={`p-1 rounded cursor-pointer ${vitrineLighting === 'night' ? 'text-[#A36B40]' : 'text-[#B8ADA3]'}`}
                    title="Owambe Night"
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] uppercase font-bold text-[#B8ADA3]">Angle:</span>
                  {[0, 45, 90].map(a => (
                    <button
                      key={a}
                      onClick={() => setVitrineAngle(a)}
                      className={`px-2 py-0.5 rounded font-mono text-[11px] cursor-pointer ${
                        vitrineAngle === a ? 'bg-white text-black' : 'text-[#B8ADA3] border border-white/10'
                      }`}
                    >
                      {a}°
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vitrine Craft Details & Direct Actions */}
            <div className="lg:col-span-5 space-y-5 text-left">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A36B40]">
                  {vitrinePiece === 'agbada' ? 'Danbello Bespoke · Wuse II Abuja' : 'Oduwa Heritage · Abeokuta'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium mt-1">
                  {vitrinePiece === 'agbada' 
                    ? 'The Oba Modular Slim Agbada Set' 
                    : 'Moremi Draped Silk & Adire Evening Column'}
                </h3>
                <p className="text-xs text-[#B8ADA3] mt-2 leading-relaxed">
                  {vitrinePiece === 'agbada'
                    ? 'Deconstructed three-piece royal ensemble engineered with feather-light tropical wool-linen. Machine-assisted precision breastplate embroidery that folds naturally without slip.'
                    : 'Mulberry silk infused with hand-resist botanical cassava paste techniques. 14-point flexi-boning internal corset for sculpted Owambe gala posture.'}
                </p>
              </div>

              {/* Hotspot Inspection Box */}
              <div className="p-3.5 bg-[#251F1B] rounded border border-[#3B3029] space-y-1.5 text-xs">
                <span className="text-[10px] uppercase font-bold text-amber-300 block">
                  🔍 Craft Inspection Note:
                </span>
                <p className="text-[#E8DFD5] leading-relaxed">
                  {vitrinePiece === 'agbada'
                    ? 'Precision breastplate threadwork inspired by ancient Benin court regalia, calibrated with cooling underarm mesh vents for outdoor afternoon ceremonies.'
                    : 'Natural cassava starch resist dyed in cold botanical indigo vats, ensuring non-abrasive contact with skin and zero bleed.'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-[#B8ADA3] uppercase">Atelier Piece Price:</span>
                  <div className="font-serif text-xl font-bold text-amber-300">
                    {formatNaira(vitrinePiece === 'agbada' ? 135000 : 115000)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const p = products.find(prod => prod.id === (vitrinePiece === 'agbada' ? 'prod-modern-agbada-sage' : 'prod-adire-corset-gown'));
                      if (p) openProductDetail(p);
                    }}
                    className="py-2.5 px-3.5 border border-[#A36B40]/60 hover:border-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                  >
                    Specs
                  </button>

                  <button
                    onClick={() => setCurrentView('style-lab')}
                    className="py-2.5 px-4 bg-[#A36B40] hover:bg-[#8C522B] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Try On Avatar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
              Fresh Off The Loom & Needle
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1">
              New Season Arrivals
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-semibold uppercase tracking-wider text-[#A36B40] dark:text-[#C68A5E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>See All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Accessible Luxury Strip */}
      <section className="bg-[#FAF7F2] dark:bg-[#1A1615] border-y border-[#E8DFD5] dark:border-[#3B3029] py-12 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-left">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
                Accessible Luxury
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mt-1">
                Authentic Craftsmanship from ₦8,500
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-2 leading-relaxed">
                Handcrafted fashion rooted in transparent maker pricing. From vegetable-tanned Nigerian leather accessories to statement Aso-Oke pieces, Browndilux pairs authentic materials with lasting durability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full lg:w-auto">
              {accessibleGems.map(gem => (
                <div
                  key={gem.id}
                  onClick={() => openProductDetail(gem)}
                  className="p-3 bg-white dark:bg-[#221C18] border border-[#E8DFD5] dark:border-[#3B3029] rounded flex items-center gap-3 cursor-pointer hover:border-[#A36B40] transition-colors"
                >
                  <img 
                    src={gem.images[0]} 
                    alt={gem.name} 
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=200&q=80';
                    }}
                    className="w-14 h-14 object-cover rounded bg-[#F4EFEA] flex-shrink-0" 
                  />
                  <div>
                    <h4 className="font-serif text-xs font-semibold line-clamp-1 text-[#1A1615] dark:text-[#FAF7F2]">{gem.name}</h4>
                    <p className="text-xs font-bold text-[#A36B40] mt-0.5">{formatNaira(gem.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Style Lab Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded overflow-hidden bg-gradient-to-br from-[#3D2B1F] via-[#2B1D15] to-[#1A1615] text-[#FAF7F2] p-6 sm:p-12 lg:p-14 border border-[#A36B40]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 py-1 px-3 bg-[#A36B40]/25 rounded text-xs font-semibold text-[#E8DFD5] uppercase tracking-wider border border-[#A36B40]/40">
                <Sparkles className="w-4 h-4 text-[#A36B40]" />
                <span>Feature Spotlight · AI Style Lab</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                Customize & Test Outfits on Your Digital Avatar
              </h2>

              <p className="text-xs sm:text-sm lg:text-base text-[#E8DFD5]/90 max-w-xl leading-relaxed">
                Tune African undertones (Warm Honey to Dark Espresso), select silhouettes, and mix-and-match authentic artisan garments. Powered by Gemini AI styling advice to evaluate occasion harmony for Owambe, boardrooms, and art galas.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={() => setCurrentView('style-lab')}
                  className="py-3 px-6 bg-[#FAF7F2] text-[#171311] hover:bg-[#A36B40] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 rounded-xs cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch AI Style Lab</span>
                </button>

                <button
                  onClick={() => setCurrentView('private-styling')}
                  className="py-3 px-6 border border-[#E8DFD5]/40 hover:border-white text-white text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs cursor-pointer"
                >
                  WhatsApp Bespoke Session
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-52 sm:w-56 h-64 sm:h-72 rounded border border-[#A36B40]/40 bg-black/40 backdrop-blur-md p-4 flex flex-col justify-between items-center text-center shadow-lg">
                <div className="text-[11px] uppercase tracking-wider text-[#A36B40] font-semibold">Virtual Try-On Simulation</div>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#A36B40] p-1 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#82532F] flex items-center justify-center text-white text-xl sm:text-2xl font-serif">
                    98%
                  </div>
                </div>
                <div className="text-xs text-[#E8DFD5]">
                  Color Harmony Score: <strong>Excellent</strong><br />
                  <span className="opacity-70 text-[10px]">Occasion: Owambe Gala</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
              Nigerian Wardrobe Classics
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1">
              Top Rated by Patrons
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-semibold uppercase tracking-wider text-[#A36B40] dark:text-[#C68A5E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* WhatsApp Concierge Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] p-6 sm:p-10 rounded flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-left">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1b7e3e] dark:text-[#4ade80]">
              <MessageCircle className="w-4 h-4" />
              <span>Direct WhatsApp Concierge Service</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
              Need Help With Custom Sizing or Owambe Fabric Matching?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
              Our Lagos atelier stylists respond within minutes. Share your chest, shoulder, or waist measurements, or get advice on coordinating family Aso-Ebi looks.
            </p>
          </div>

          <a
            href={heroWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-6 sm:py-3.5 sm:px-7 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2 shadow-sm flex-shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat: +234 813 613 2727</span>
          </a>
        </div>
      </section>
    </div>
  );
};
