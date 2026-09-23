import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, FabricType } from '../types';
import { 
  Sparkles, 
  RotateCw, 
  ShoppingBag, 
  MessageCircle, 
  Heart, 
  Check, 
  Search, 
  Sliders, 
  Maximize2, 
  Info, 
  Layers, 
  Sun, 
  Moon, 
  Crown, 
  Shirt, 
  Scissors,
  CheckCircle2,
  X,
  Eye,
  RefreshCw,
  Share2
} from 'lucide-react';
import { formatNaira, generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

// Avatar Configuration Types
export type AvatarGender = 'male' | 'female';
export type AfricanSkinTone = 'warm-honey' | 'radiant-amber' | 'rich-cocoa' | 'deep-ebony';
export type MaleHairstyle = 'taper-fade' | 'high-top' | 'waves' | 'dreads' | 'buzz-cut';
export type FemaleHairstyle = 'fulani-braids' | 'high-topknot' | 'afro-puff' | 'twa-curls';
export type BodyStature = 'athletic' | 'slender' | 'regal';
export type ShowGlassLighting = 'sunlight' | 'spotlight' | 'owambe-glow' | 'minimal';

interface AvatarState {
  gender: AvatarGender;
  skinTone: AfricanSkinTone;
  maleHair: MaleHairstyle;
  femaleHair: FemaleHairstyle;
  stature: BodyStature;
  hasBeard: boolean;
}

const SKIN_TONE_CONFIG: Record<AfricanSkinTone, { name: string; hex: string; desc: string; shadowHex: string }> = {
  'warm-honey': {
    name: 'Warm Golden Honey',
    hex: '#C08552',
    shadowHex: '#9E6235',
    desc: 'Golden warm undertone typical of coastal and savannah regions'
  },
  'radiant-amber': {
    name: 'Radiant Amber',
    hex: '#9E633B',
    shadowHex: '#7E4723',
    desc: 'Warm rich amber with copper highlights'
  },
  'rich-cocoa': {
    name: 'Rich Cocoa Bronze',
    hex: '#734226',
    shadowHex: '#522C17',
    desc: 'Deep velvety bronze complexion with warm earth tones'
  },
  'deep-ebony': {
    name: 'Deep Ebony Espresso',
    hex: '#422416',
    shadowHex: '#2C1409',
    desc: 'Regal deep espresso tone with flawless cool-warm depth'
  }
};

export const StyleLabView: React.FC = () => {
  const { products, wishlist, addToCart, showToast, openProductDetail } = useShop();

  // Avatar Customizer State
  const [avatar, setAvatar] = useState<AvatarState>({
    gender: 'male',
    skinTone: 'radiant-amber',
    maleHair: 'taper-fade',
    femaleHair: 'fulani-braids',
    stature: 'athletic',
    hasBeard: true
  });

  // Wardrobe Outfit Layers currently worn on the Avatar
  const [equippedHeadwearId, setEquippedHeadwearId] = useState<string>('prod-aso-oke-cap-fila');
  const [equippedTopId, setEquippedTopId] = useState<string>('prod-modern-agbada-sage');
  const [equippedBottomId, setEquippedBottomId] = useState<string>('');
  const [equippedAccessoryId, setEquippedAccessoryId] = useState<string>('prod-leather-belt-tan');

  // Studio Display State
  const [showGlassActive, setShowGlassActive] = useState<boolean>(true);
  const [lighting, setLighting] = useState<ShowGlassLighting>('spotlight');
  const [turntableAngle, setTurntableAngle] = useState<number>(0); // 0, 45, 90, 180
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [activeWardrobeTab, setActiveWardrobeTab] = useState<'starred' | 'caps' | 'tops' | 'bottoms' | 'accessories'>('tops');
  const [wardrobeSearch, setWardrobeSearch] = useState<string>('');
  const [isCustomizingAvatar, setIsCustomizingAvatar] = useState<boolean>(false);

  // Lookups for currently equipped items
  const equippedHeadwear = products.find(p => p.id === equippedHeadwearId);
  const equippedTop = products.find(p => p.id === equippedTopId);
  const equippedBottom = products.find(p => p.id === equippedBottomId);
  const equippedAccessory = products.find(p => p.id === equippedAccessoryId);

  // Wishlist products
  const starredProducts = products.filter(p => wishlist.includes(p.id));

  // Filtered wardrobe list based on active tab and search
  const filteredWardrobe = useMemo(() => {
    let list: Product[] = [];

    if (activeWardrobeTab === 'starred') {
      list = starredProducts;
    } else if (activeWardrobeTab === 'caps') {
      list = products.filter(p => 
        p.id === 'prod-aso-oke-cap-fila' || 
        p.tags.includes('Headwear') || 
        p.tags.includes('Fila') || 
        p.category === 'artisanal-leather' && p.name.toLowerCase().includes('fila')
      );
    } else if (activeWardrobeTab === 'tops') {
      list = products.filter(p => 
        p.id === 'prod-modern-agbada-sage' ||
        p.id === 'prod-senator-deconstructed-sand' ||
        p.id === 'prod-adire-coord-cocoa' ||
        p.id === 'prod-adire-corset-gown' ||
        p.id === 'prod-asooke-bomber-copper' ||
        p.id === 'prod-ankara-trench-blazer' ||
        p.id === 'prod-linen-safari-jacket'
      );
    } else if (activeWardrobeTab === 'bottoms') {
      list = products.filter(p => 
        p.id === 'prod-adire-wideleg-trouser' ||
        p.tags.includes('Trousers') ||
        p.tags.includes('Co-ord')
      );
    } else if (activeWardrobeTab === 'accessories') {
      list = products.filter(p => 
        p.id === 'prod-leather-belt-tan' ||
        p.id === 'prod-leather-cuff-wallet' ||
        p.id === 'prod-leather-holdall-weekender' ||
        p.category === 'artisanal-leather'
      );
    }

    if (wardrobeSearch.trim()) {
      const q = wardrobeSearch.toLowerCase();
      return list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.fabric.toLowerCase().includes(q) ||
        p.vendorName.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeWardrobeTab, wardrobeSearch, products, starredProducts]);

  // Outfit Pricing
  const totalOutfitPrice = useMemo(() => {
    let sum = 0;
    if (equippedHeadwear) sum += equippedHeadwear.price;
    if (equippedTop) sum += equippedTop.price;
    if (equippedBottom) sum += equippedBottom.price;
    if (equippedAccessory) sum += equippedAccessory.price;
    return sum;
  }, [equippedHeadwear, equippedTop, equippedBottom, equippedAccessory]);

  // AI Harmony Engine Computations
  const stylingAnalysis = useMemo(() => {
    let score = 88;
    const notes: string[] = [];
    let recommendedCap = 'prod-aso-oke-cap-fila';
    let recommendedAccessory = 'prod-leather-belt-tan';
    let occasionRating = {
      owambe: 96,
      corporate: 92,
      artGallery: 94,
      resort: 80
    };

    if (equippedTop?.id === 'prod-modern-agbada-sage') {
      score = 98;
      occasionRating = { owambe: 99, corporate: 88, artGallery: 92, resort: 60 };
      notes.push('The Sage Green Agbada sets a regal traditional tone. The Gobi Fila folded forward or to the left confers coronation dignity.');
      notes.push('Benin lost-wax brass buckle anchors the waistline without disrupting the kaftan drape.');
    } else if (equippedTop?.id === 'prod-adire-corset-gown') {
      score = 97;
      occasionRating = { owambe: 99, corporate: 75, artGallery: 98, resort: 70 };
      notes.push('Moremi Adire silk evening drape has high drama. Ideal with swept-up Fulani braids or elevated royal Gele.');
      notes.push('Warm terracotta and indigo dye harmonizes with brass jewellery and deep bronze skin.');
    } else if (equippedTop?.id === 'prod-senator-deconstructed-sand') {
      score = 95;
      occasionRating = { owambe: 86, corporate: 99, artGallery: 92, resort: 78 };
      notes.push('Almond sand tropical wool provides razor-sharp boardroom authority.');
      notes.push('Pair with the full-grain leather belt and minimal leather cardholder for complete executive presence.');
    } else if (equippedTop?.id === 'prod-asooke-bomber-copper') {
      score = 94;
      occasionRating = { owambe: 84, corporate: 70, artGallery: 99, resort: 85 };
      notes.push('Iseyin metallic narrow-loom weave delivers contemporary avant-garde energy.');
    } else if (equippedTop?.id === 'prod-adire-coord-cocoa') {
      score = 92;
      occasionRating = { owambe: 80, corporate: 82, artGallery: 95, resort: 98 };
      notes.push('Cocoa and sage botanical resist is the definitive modern Lagos luxury resort aesthetic.');
    }

    return {
      harmonyScore: score,
      notes,
      occasionRating,
      recommendedCap,
      recommendedAccessory
    };
  }, [equippedTop, equippedHeadwear, equippedAccessory]);

  // Handle Equipping Items
  const handleToggleEquip = (product: Product) => {
    if (product.id === 'prod-aso-oke-cap-fila' || product.tags.includes('Headwear') || product.tags.includes('Fila')) {
      setEquippedHeadwearId(prev => prev === product.id ? '' : product.id);
      showToast(equippedHeadwearId === product.id ? 'Removed cap from avatar' : `Dressed avatar in ${product.name}`);
    } else if (
      product.id === 'prod-adire-wideleg-trouser' || 
      product.tags.includes('Trousers') || 
      product.tags.includes('Palazzo')
    ) {
      setEquippedBottomId(prev => prev === product.id ? '' : product.id);
      showToast(equippedBottomId === product.id ? 'Removed trousers' : `Equipped ${product.name}`);
    } else if (
      product.category === 'artisanal-leather' || 
      product.tags.includes('Belt') || 
      product.tags.includes('Wallet') ||
      product.tags.includes('Luggage')
    ) {
      setEquippedAccessoryId(prev => prev === product.id ? '' : product.id);
      showToast(equippedAccessoryId === product.id ? 'Removed accessory' : `Equipped ${product.name}`);
    } else {
      // Default to Top / Main garment
      setEquippedTopId(prev => prev === product.id ? '' : product.id);
      showToast(equippedTopId === product.id ? 'Removed garment' : `Dressed avatar in ${product.name}`);
    }
  };

  // Quick Action: Add all worn garments to Bag
  const handleAddFullOutfitToBag = () => {
    const items = [equippedHeadwear, equippedTop, equippedBottom, equippedAccessory].filter(Boolean) as Product[];
    if (items.length === 0) {
      showToast('Select garments on your avatar first');
      return;
    }
    items.forEach(item => {
      addToCart(item, item.availableSizes[0] || 'Standard');
    });
    showToast(`Added full look (${items.length} pieces) to your bag!`);
  };

  // WhatsApp Concierge Consultation
  const handleOrderLookOnWhatsApp = () => {
    const items = [equippedHeadwear, equippedTop, equippedBottom, equippedAccessory].filter(Boolean) as Product[];
    const garmentList = items.map(i => `• ${i.name} (${formatNaira(i.price)})`).join('\n');
    const text = `*BROWNDILUX BESPOKE AVATAR STYLING ORDER*
━━━━━━━━━━━━━━━━━━━━━━━━
*Avatar Profile:* ${avatar.gender.toUpperCase()} · ${SKIN_TONE_CONFIG[avatar.skinTone].name}
*Stature:* ${avatar.stature}

*Equipped Ensemble:*
${garmentList}

*Ensemble Total:* ${formatNaira(totalOutfitPrice)}
*Occasion Target:* Owambe Nuptials / VIP Native Gala
━━━━━━━━━━━━━━━━━━━━━━━━
Requesting direct workshop reservation with artisan cutters.`;

    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, text);
    window.open(url, '_blank');
  };

  // Apply AI Smart Suggestion
  const handleApplyAiSuggestion = (prodId: string) => {
    const p = products.find(prod => prod.id === prodId);
    if (!p) return;
    if (p.tags.includes('Headwear') || p.id.includes('fila') || p.id.includes('cap')) {
      setEquippedHeadwearId(p.id);
    } else if (p.category === 'artisanal-leather') {
      setEquippedAccessoryId(p.id);
    } else {
      setEquippedTopId(p.id);
    }
    showToast(`Applied AI styling match: ${p.name}`);
  };

  const skin = SKIN_TONE_CONFIG[avatar.skinTone];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 animate-in fade-in duration-200">
      {/* Studio Header */}
      <div className="bg-[#F4EFEA] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
            <Sparkles className="w-4 h-4 text-[#A36B40]" />
            <span>Interactive Snapchat-Style Human Avatar Studio</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1 text-balance">
            Human Avatar Builder & 3D Styling Atelier
          </h1>
          <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-1 max-w-2xl text-balance">
            Create your authentic African avatar (male or female), customize hair, skin undertones and demeanor. Try on handwoven Fila caps, Agbada robes, Adire gowns, or pieces from your wishlist with live AI color harmony.
          </p>
        </div>

        {/* Prototype Transparency Badge */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="p-3 bg-white dark:bg-[#251F1B] rounded border border-[#E8DFD5] dark:border-[#3B3029] text-xs">
            <span className="text-[10px] uppercase font-bold text-[#A36B40] block">Interactive Prototype Mode</span>
            <p className="font-semibold text-[#1A1615] dark:text-[#FAF7F2]">3D Show Glass Simulation</p>
            <p className="text-[11px] text-emerald-600">Real-time Mannequin Fit</p>
          </div>
          <button
            onClick={() => setIsCustomizingAvatar(!isCustomizingAvatar)}
            className="py-2.5 px-4 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Sliders className="w-4 h-4" />
            <span>{isCustomizingAvatar ? 'Close Avatar Settings' : 'Customize Avatar'}</span>
          </button>
        </div>
      </div>

      {/* Avatar Customization Drawer (Snapchat-style bitmoji controls) */}
      {isCustomizingAvatar && (
        <div className="bg-white dark:bg-[#1E1916] border border-[#A36B40]/40 rounded p-6 shadow-sm space-y-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#3B3029] pb-3">
            <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
              Customize Your African Avatar Persona
            </h3>
            <button
              onClick={() => setIsCustomizingAvatar(false)}
              className="text-[#6B635B] hover:text-[#1A1615] dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
            {/* 1. Gender */}
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-[#A36B40] block">
                Avatar Base (Gender)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAvatar({ ...avatar, gender: 'male' })}
                  className={`py-2 px-3 rounded border text-center font-medium cursor-pointer transition-colors ${
                    avatar.gender === 'male'
                      ? 'bg-[#A36B40] text-white border-[#A36B40]'
                      : 'border-[#E8DFD5] dark:border-[#3B3029] hover:border-[#A36B40]'
                  }`}
                >
                  Ọkùnrin (Male)
                </button>
                <button
                  onClick={() => setAvatar({ ...avatar, gender: 'female' })}
                  className={`py-2 px-3 rounded border text-center font-medium cursor-pointer transition-colors ${
                    avatar.gender === 'female'
                      ? 'bg-[#A36B40] text-white border-[#A36B40]'
                      : 'border-[#E8DFD5] dark:border-[#3B3029] hover:border-[#A36B40]'
                  }`}
                >
                  Obìnrin (Female)
                </button>
              </div>
            </div>

            {/* 2. African Skin Tone */}
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-[#A36B40] block">
                African Melanin Undertone
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(SKIN_TONE_CONFIG) as AfricanSkinTone[]).map(toneKey => {
                  const t = SKIN_TONE_CONFIG[toneKey];
                  const isSel = avatar.skinTone === toneKey;
                  return (
                    <button
                      key={toneKey}
                      onClick={() => setAvatar({ ...avatar, skinTone: toneKey })}
                      className={`p-2 rounded border flex items-center gap-2 text-left cursor-pointer transition-all ${
                        isSel ? 'border-[#A36B40] bg-[#FAF7F2] dark:bg-[#251F1B] ring-1 ring-[#A36B40]' : 'border-[#E8DFD5] dark:border-[#3B3029]'
                      }`}
                    >
                      <span 
                        className="w-4 h-4 rounded-full border border-black/20 flex-shrink-0"
                        style={{ backgroundColor: t.hex }}
                      />
                      <span className="text-[11px] font-medium truncate">{t.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Hair & Facial Grooming */}
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-[#A36B40] block">
                {avatar.gender === 'male' ? 'Grooming & Hair' : 'Hairstyle & Curls'}
              </label>
              {avatar.gender === 'male' ? (
                <div className="space-y-2">
                  <select
                    value={avatar.maleHair}
                    onChange={(e) => setAvatar({ ...avatar, maleHair: e.target.value as MaleHairstyle })}
                    className="w-full p-2 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                  >
                    <option value="taper-fade">Sharp Taper Fade</option>
                    <option value="high-top">High Top Sponge Twist</option>
                    <option value="waves">360 Deep Waves</option>
                    <option value="dreads">Sculpted Dreadlock Bun</option>
                    <option value="buzz-cut">Clean Line-up Buzz</option>
                  </select>
                  <label className="flex items-center gap-2 text-[11px] cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={avatar.hasBeard}
                      onChange={(e) => setAvatar({ ...avatar, hasBeard: e.target.checked })}
                      className="accent-[#A36B40]"
                    />
                    <span>Full Tailored Beard & Moustache</span>
                  </label>
                </div>
              ) : (
                <div className="space-y-2">
                  <select
                    value={avatar.femaleHair}
                    onChange={(e) => setAvatar({ ...avatar, femaleHair: e.target.value as FemaleHairstyle })}
                    className="w-full p-2 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                  >
                    <option value="fulani-braids">Fulani Knotless Braids with Cowries</option>
                    <option value="high-topknot">Sleek High Topknot Bun</option>
                    <option value="afro-puff">Sculpted Natural Afro Puff</option>
                    <option value="twa-curls">Short TWA Defined Coil Curls</option>
                  </select>
                </div>
              )}
            </div>

            {/* 4. Body Stature */}
            <div className="space-y-2">
              <label className="font-bold uppercase tracking-wider text-[#A36B40] block">
                Tailored Stature Profile
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'athletic', label: 'Athletic Cut' },
                  { id: 'slender', label: 'Slender Runway' },
                  { id: 'regal', label: 'Regal Full Drape' }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setAvatar({ ...avatar, stature: s.id as BodyStature })}
                    className={`flex-1 py-2 px-1 text-center rounded border text-[11px] font-medium cursor-pointer transition-colors ${
                      avatar.stature === s.id 
                        ? 'bg-[#A36B40] text-white border-[#A36B40]'
                        : 'border-[#E8DFD5] dark:border-[#3B3029]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Interactive Stage & Wardrobe Try-On Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left/Center: Avatar Mannequin & 3D Physical Show Glass Replica */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-4 sm:p-6 shadow-2xs relative overflow-hidden">
            
            {/* Top Stage Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E8DFD5] dark:border-[#3B3029]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGlassActive(!showGlassActive)}
                  className={`py-1.5 px-3 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    showGlassActive 
                      ? 'bg-[#A36B40] text-white' 
                      : 'border border-[#E8DFD5] dark:border-[#3B3029] text-[#6B635B] dark:text-[#B8ADA3]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>3D Show Glass Vitrine: {showGlassActive ? 'ON' : 'OFF'}</span>
                </button>

                <div className="flex items-center bg-[#FAF7F2] dark:bg-[#251F1B] rounded border border-[#E8DFD5] dark:border-[#3B3029] p-0.5">
                  <button
                    onClick={() => setLighting('spotlight')}
                    title="Warm Atelier Spotlight"
                    className={`p-1.5 rounded text-xs cursor-pointer ${lighting === 'spotlight' ? 'bg-[#A36B40] text-white' : 'text-[#6B635B]'}`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLighting('sunlight')}
                    title="Lagos Sunlight"
                    className={`p-1.5 rounded text-xs cursor-pointer ${lighting === 'sunlight' ? 'bg-[#A36B40] text-white' : 'text-[#6B635B]'}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLighting('owambe-glow')}
                    title="Owambe Night Glow"
                    className={`p-1.5 rounded text-xs cursor-pointer ${lighting === 'owambe-glow' ? 'bg-[#A36B40] text-white' : 'text-[#6B635B]'}`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Turntable Rotation */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-[#6B635B] dark:text-[#B8ADA3]">View Angle:</span>
                <div className="flex gap-1">
                  {[0, 45, 90].map(angle => (
                    <button
                      key={angle}
                      onClick={() => setTurntableAngle(angle)}
                      className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
                        turntableAngle === angle 
                          ? 'bg-[#3D2B1F] text-white dark:bg-[#FAF7F2] dark:text-[#171311]' 
                          : 'border border-[#E8DFD5] dark:border-[#3B3029] text-[#6B635B]'
                      }`}
                    >
                      {angle === 0 ? 'Front' : angle === 45 ? '45° Turn' : 'Profile'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* The Visual Mannequin Stage */}
            <div 
              className={`relative h-[480px] sm:h-[540px] rounded flex items-center justify-center transition-all duration-500 overflow-hidden ${
                lighting === 'owambe-glow' 
                  ? 'bg-gradient-to-b from-[#1C1410] via-[#2A1D15] to-[#120E0C]'
                  : lighting === 'sunlight'
                  ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF4ED] to-[#EFE7DE]'
                  : 'bg-gradient-to-b from-[#F7F3EE] via-[#EFE8DF] to-[#DFD6CA]'
              }`}
            >
              {/* Virtual Physical Show Glass Vitrine Replica Frame */}
              {showGlassActive && (
                <div className="absolute inset-2 border-2 border-[#D8C7B5]/60 dark:border-[#52443A]/60 rounded pointer-events-none z-30 shadow-[inset_0_0_30px_rgba(255,255,255,0.25)]">
                  {/* Glass Highlights / Reflection Lines */}
                  <div className="absolute top-0 left-8 w-24 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12" />
                  <div className="absolute top-3 left-3 text-[9px] uppercase tracking-widest font-mono text-[#A36B40] bg-white/80 dark:bg-black/80 px-2 py-0.5 rounded border border-[#E8DFD5] dark:border-[#3B3029]">
                    BROWNDILUX ATELIER · 3D PHYSICAL VITRINE REPLICA
                  </div>
                  <div className="absolute bottom-3 right-3 text-[9px] uppercase tracking-widest font-mono text-[#6B635B] bg-white/80 dark:bg-black/80 px-2 py-0.5 rounded border border-[#E8DFD5] dark:border-[#3B3029]">
                    LOOM DIRECT · VERIFIED GUILD
                  </div>
                </div>
              )}

              {/* Pedestal Platform */}
              <div className="absolute bottom-4 w-64 h-12 bg-gradient-to-r from-[#D0C2B2] via-[#E5DACD] to-[#C8B8A6] dark:from-[#2C231E] dark:via-[#3E322B] dark:to-[#221B17] rounded-full shadow-lg border border-[#BFAFA0] dark:border-[#4A3C34] flex items-center justify-center z-10">
                <span className="text-[10px] tracking-widest uppercase font-serif text-[#786658] dark:text-[#A8988B] font-bold">
                  Bespoke Artisan Pedestal
                </span>
              </div>

              {/* Dynamic Interactive African Avatar Mannequin Illustration */}
              <div 
                className="relative z-20 transition-transform duration-300 flex flex-col items-center justify-center"
                style={{
                  transform: turntableAngle === 45 
                    ? 'rotateY(18deg) scale(0.98)' 
                    : turntableAngle === 90 
                    ? 'rotateY(42deg) scale(0.96)' 
                    : 'rotateY(0deg) scale(1)'
                }}
              >
                {/* 1. HEAD & HEADWEAR (Fila / Gele / Natural Hair) */}
                <div className="relative flex flex-col items-center">
                  {/* Headwear: Oyo Handwoven Gobi Fila */}
                  {equippedHeadwearId === 'prod-aso-oke-cap-fila' ? (
                    <div className="relative -mb-3 z-30 transform hover:scale-105 transition-transform cursor-pointer" title="Oyo Handwoven Gobi Fila">
                      {/* Fila Silhouette with metallic woven pattern */}
                      <div className="w-24 h-14 bg-gradient-to-r from-[#A36B40] via-[#C98B58] to-[#8C522B] rounded-t-xl rounded-b-sm shadow-md border-b-2 border-[#583318] flex items-center justify-center relative overflow-hidden transform -rotate-3">
                        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#FFE4B5_1px,transparent_1px)] [background-size:6px_6px]" />
                        <span className="text-[9px] uppercase tracking-wider font-bold text-amber-100 drop-shadow-xs">
                          Oyo Fila
                        </span>
                      </div>
                      {/* Fold accent */}
                      <div className="w-8 h-3 bg-[#78431F] rounded-full absolute -bottom-1 right-2" />
                    </div>
                  ) : avatar.gender === 'female' ? (
                    /* Female Hairstyle */
                    <div className="w-20 h-10 bg-[#1A1412] rounded-t-full relative z-20 shadow-xs flex items-center justify-center">
                      <span className="text-[8px] text-amber-200/80 font-mono">
                        {avatar.femaleHair === 'fulani-braids' ? 'Fulani Braids' : 'High Topknot'}
                      </span>
                    </div>
                  ) : (
                    /* Male Hairstyle */
                    <div className="w-20 h-8 bg-[#181311] rounded-t-xl relative z-20 shadow-xs flex items-center justify-center">
                      <span className="text-[8px] text-amber-100/70 font-mono">
                        {avatar.maleHair === 'taper-fade' ? 'Taper Fade' : 'Afro Waves'}
                      </span>
                    </div>
                  )}

                  {/* Human Face & African Complexion */}
                  <div 
                    className="w-16 h-20 rounded-2xl shadow-md relative z-10 flex flex-col items-center justify-center border border-black/10 transition-colors"
                    style={{ backgroundColor: skin.hex }}
                  >
                    {/* Eyebrows */}
                    <div className="w-10 flex justify-between mt-2">
                      <div className="w-3.5 h-0.5 bg-[#25160E] rounded-full transform -rotate-6" />
                      <div className="w-3.5 h-0.5 bg-[#25160E] rounded-full transform rotate-6" />
                    </div>
                    {/* Eyes */}
                    <div className="w-9 flex justify-between mt-1">
                      <div className="w-2.5 h-1.5 bg-[#1F120B] rounded-full border-t border-black" />
                      <div className="w-2.5 h-1.5 bg-[#1F120B] rounded-full border-t border-black" />
                    </div>
                    {/* Sculpted Nose */}
                    <div className="w-2 h-4 rounded-b-md mt-0.5 opacity-40" style={{ backgroundColor: skin.shadowHex }} />
                    {/* Lips */}
                    <div className="w-5 h-1.5 bg-[#663520] rounded-full mt-1 border-t border-[#461F10]" />
                    {/* Beard (if male) */}
                    {avatar.gender === 'male' && avatar.hasBeard && (
                      <div className="w-11 h-4 bg-[#1F1612] rounded-b-xl absolute bottom-0 opacity-90" />
                    )}
                  </div>

                  {/* Neck & Coral Beads */}
                  <div 
                    className="w-7 h-4 -mt-1 relative z-0 flex items-center justify-center"
                    style={{ backgroundColor: skin.shadowHex }}
                  >
                    {/* Optional Traditional Coral Choker */}
                    {equippedTopId === 'prod-modern-agbada-sage' && (
                      <div className="w-8 h-1.5 bg-[#C04020] rounded-full border border-amber-300 shadow-xs" title="Benin Royal Coral Beads" />
                    )}
                  </div>
                </div>

                {/* 2. TORSO & GARMENT LAYER */}
                <div className="relative -mt-1 flex flex-col items-center z-10">
                  {equippedTopId === 'prod-modern-agbada-sage' ? (
                    /* Agbada Regal Silhouette */
                    <div className="relative flex flex-col items-center">
                      <div className="w-60 h-44 bg-gradient-to-b from-[#6D7D67] via-[#5D6B57] to-[#485343] rounded-t-3xl rounded-b-lg shadow-xl border-t-2 border-[#8E9F87] relative overflow-hidden flex flex-col items-center pt-2">
                        {/* Breastplate Embroidery */}
                        <div className="w-16 h-20 border-2 border-amber-300/60 rounded-b-xl bg-[#4D5848] flex flex-col items-center justify-center p-1">
                          <div className="w-8 h-8 border border-amber-300/50 rounded-full flex items-center justify-center">
                            <Crown className="w-4 h-4 text-amber-200" />
                          </div>
                          <span className="text-[7px] font-mono text-amber-200 uppercase mt-1">Oba Sage</span>
                        </div>
                        {/* Agbada Drapery Pleats */}
                        <div className="absolute left-4 top-4 w-12 h-36 border-r border-[#3E473A]/40 transform -rotate-12" />
                        <div className="absolute right-4 top-4 w-12 h-36 border-l border-[#3E473A]/40 transform rotate-12" />
                      </div>
                    </div>
                  ) : equippedTopId === 'prod-adire-corset-gown' ? (
                    /* Moremi Silk Corset & Evening Gown */
                    <div className="relative flex flex-col items-center">
                      {/* Sculpted Corset Bodice */}
                      <div className="w-36 h-28 bg-gradient-to-b from-[#A34E32] via-[#863D24] to-[#3B284A] rounded-t-2xl shadow-lg border border-[#C56F52] flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FFE4B5_1px,transparent_1px)] [background-size:8px_8px]" />
                        <div className="w-20 h-0.5 bg-amber-200/50 my-1" />
                        <span className="text-[8px] uppercase tracking-wider font-bold text-amber-100">
                          Moremi Adire Silk
                        </span>
                        <div className="w-16 h-0.5 bg-amber-200/50 my-1" />
                      </div>
                      {/* Cascading Draped Silk Skirt */}
                      <div className="w-44 h-40 bg-gradient-to-b from-[#3B284A] via-[#2A1C36] to-[#1E1327] rounded-b-xl shadow-xl flex items-center justify-center">
                        <span className="text-[8px] text-amber-200/60 uppercase">Liquid Silk Column Drape</span>
                      </div>
                    </div>
                  ) : equippedTopId === 'prod-senator-deconstructed-sand' ? (
                    /* Senator Tunic */
                    <div className="w-40 h-44 bg-gradient-to-b from-[#D4C3B1] via-[#C5B3A0] to-[#B3A08D] rounded-t-xl rounded-b-sm shadow-lg border-t-2 border-[#E5D7C7] relative flex flex-col items-center pt-2">
                      {/* Concealed Placket */}
                      <div className="w-4 h-full bg-[#A99784] border-l border-r border-[#8F7E6D]/40 flex flex-col items-center py-2 gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-100" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-100" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-100" />
                      </div>
                    </div>
                  ) : equippedTopId === 'prod-asooke-bomber-copper' ? (
                    /* Aso-Oke Bomber */
                    <div className="w-44 h-36 bg-gradient-to-b from-[#B86E3C] via-[#985324] to-[#6A3513] rounded-t-2xl rounded-b-md shadow-xl border-t border-amber-200/40 relative flex flex-col items-center justify-center">
                      <span className="text-[9px] uppercase tracking-widest font-serif font-bold text-amber-100">
                        Iseyin Metallic Aso-Oke
                      </span>
                    </div>
                  ) : (
                    /* Default Relaxed Adire Co-Ord Shirt */
                    <div className="w-40 h-36 bg-gradient-to-b from-[#6D4936] via-[#5A3B2A] to-[#432A1D] rounded-t-xl rounded-b-sm shadow-lg relative flex flex-col items-center justify-center">
                      <span className="text-[8px] uppercase tracking-wider font-bold text-amber-100">
                        Osumare Adire Batik
                      </span>
                    </div>
                  )}

                  {/* 3. BELT & WAIST ACCESSORY */}
                  {equippedAccessoryId === 'prod-leather-belt-tan' && (
                    <div className="w-38 h-4 bg-[#7A4B27] border-t border-b border-[#522F15] shadow-xs flex items-center justify-center z-20 -mt-1">
                      {/* Lost-wax cast brass buckle */}
                      <div className="w-5 h-5 bg-gradient-to-tr from-[#D4AF37] via-[#FFDF73] to-[#AA8010] rounded-xs border border-[#785908] flex items-center justify-center shadow-xs">
                        <div className="w-2.5 h-2.5 border border-[#543E06] rounded-xs" />
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. TROUSERS & FOOTWEAR (If not a full-length gown) */}
                {equippedTopId !== 'prod-adire-corset-gown' && (
                  <div className="relative flex flex-col items-center">
                    {/* Trousers Legs */}
                    <div className="flex gap-2">
                      <div className="w-12 h-32 bg-gradient-to-b from-[#4A5546] to-[#343C31] rounded-b-sm shadow-md border-t border-black/10" />
                      <div className="w-12 h-32 bg-gradient-to-b from-[#4A5546] to-[#343C31] rounded-b-sm shadow-md border-t border-black/10" />
                    </div>

                    {/* Handcrafted Leather Footwear */}
                    <div className="flex gap-3 -mt-1 z-10">
                      <div className="w-10 h-4 bg-[#3B2519] rounded-md shadow-xs border-t border-[#68432F]" title="Kano Leather Loafer" />
                      <div className="w-10 h-4 bg-[#3B2519] rounded-md shadow-xs border-t border-[#68432F]" title="Kano Leather Loafer" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Currently Wearing Chip Bar */}
            <div className="mt-4 pt-3 border-t border-[#E8DFD5] dark:border-[#3B3029] flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] uppercase font-bold text-[#6B635B] dark:text-[#B8ADA3] mr-1">Wearing:</span>
                {equippedHeadwear && (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-[#FAF7F2] dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] px-2 py-0.5 rounded">
                    👑 {equippedHeadwear.name.split(' ')[0]}
                    <button onClick={() => setEquippedHeadwearId('')} className="text-[#6B635B] hover:text-red-500 ml-1 cursor-pointer">×</button>
                  </span>
                )}
                {equippedTop && (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-[#FAF7F2] dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] px-2 py-0.5 rounded font-medium">
                    👘 {equippedTop.name.split(' ').slice(0, 3).join(' ')}
                    <button onClick={() => setEquippedTopId('')} className="text-[#6B635B] hover:text-red-500 ml-1 cursor-pointer">×</button>
                  </span>
                )}
                {equippedAccessory && (
                  <span className="inline-flex items-center gap-1 text-[11px] bg-[#FAF7F2] dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] px-2 py-0.5 rounded">
                    👜 {equippedAccessory.name.split(' ')[0]}
                    <button onClick={() => setEquippedAccessoryId('')} className="text-[#6B635B] hover:text-red-500 ml-1 cursor-pointer">×</button>
                  </span>
                )}
              </div>

              <div className="font-serif font-bold text-sm text-[#A36B40] dark:text-[#C68A5E]">
                Total Look: {formatNaira(totalOutfitPrice)}
              </div>
            </div>
          </div>

          {/* Real-Time AI Styling Intelligence Panel */}
          <div className="bg-[#FAF7F2] dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] dark:border-[#3B3029] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A36B40]" />
                <h3 className="font-serif text-base sm:text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                  Live AI Styling & Color Harmony Engine
                </h3>
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#1E1916] px-2.5 py-1 rounded border border-[#E8DFD5] dark:border-[#3B3029]">
                <span className="text-[10px] uppercase font-bold text-[#6B635B] dark:text-[#B8ADA3]">Harmony:</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {stylingAnalysis.harmonyScore}% Match
                </span>
              </div>
            </div>

            {/* Cultural & Occasion Suitability Matrix */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#A36B40] block">
                Occasion Appropriateness Breakdown:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-white dark:bg-[#1E1916] rounded border border-[#E8DFD5] dark:border-[#3B3029]">
                  <span className="text-[10px] text-[#6B635B] dark:text-[#B8ADA3] block">Owambe Nuptials</span>
                  <span className="font-serif font-bold text-emerald-600 text-sm">
                    {stylingAnalysis.occasionRating.owambe}%
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-[#1E1916] rounded border border-[#E8DFD5] dark:border-[#3B3029]">
                  <span className="text-[10px] text-[#6B635B] dark:text-[#B8ADA3] block">Executive Native</span>
                  <span className="font-serif font-bold text-emerald-600 text-sm">
                    {stylingAnalysis.occasionRating.corporate}%
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-[#1E1916] rounded border border-[#E8DFD5] dark:border-[#3B3029]">
                  <span className="text-[10px] text-[#6B635B] dark:text-[#B8ADA3] block">Art Soirée</span>
                  <span className="font-serif font-bold text-emerald-600 text-sm">
                    {stylingAnalysis.occasionRating.artGallery}%
                  </span>
                </div>
                <div className="p-2 bg-white dark:bg-[#1E1916] rounded border border-[#E8DFD5] dark:border-[#3B3029]">
                  <span className="text-[10px] text-[#6B635B] dark:text-[#B8ADA3] block">Resort & Leisure</span>
                  <span className="font-serif font-bold text-emerald-600 text-sm">
                    {stylingAnalysis.occasionRating.resort}%
                  </span>
                </div>
              </div>
            </div>

            {/* Stylist Notes */}
            <div className="space-y-1.5 text-xs text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
              {stylingAnalysis.notes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A36B40] flex-shrink-0 mt-0.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>

            {/* Smart Matching Suggestion Chips */}
            <div className="p-3 bg-white dark:bg-[#1E1916] rounded border border-[#E8DFD5] dark:border-[#3B3029] space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#A36B40] block">
                AI Suggested Pairing to Complete Look:
              </span>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="text-xs">
                  <span className="font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                    Oyo Handwoven Gobi Fila (Copper & Bronze)
                  </span>
                  <span className="text-[11px] text-[#6B635B] block">
                    Coordinates with metallic threading and creates regal height.
                  </span>
                </div>
                <button
                  onClick={() => handleApplyAiSuggestion('prod-aso-oke-cap-fila')}
                  className="py-1 px-3 bg-[#A36B40] text-white hover:bg-[#8C522B] text-[11px] font-semibold uppercase tracking-wider rounded transition-colors flex-shrink-0 cursor-pointer"
                >
                  Apply to Avatar
                </button>
              </div>
            </div>

            {/* Full Look Purchase & WhatsApp Order Bar */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddFullOutfitToBag}
                className="flex-1 py-3 px-4 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                <span>Add Full Look to Bag · {formatNaira(totalOutfitPrice)}</span>
              </button>

              <button
                onClick={handleOrderLookOnWhatsApp}
                className="flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>Order via WhatsApp Concierge</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Wardrobe & Starred Try-On Drawer */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-6 shadow-2xs space-y-5">
            
            {/* Header & Search */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#A36B40]">Artisan Closet</span>
                  <h2 className="font-serif text-lg sm:text-xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                    Wardrobe & Starred Try-On
                  </h2>
                </div>
                <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
                  {filteredWardrobe.length} items
                </span>
              </div>

              {/* Live Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B635B]" />
                <input
                  type="text"
                  placeholder="Search caps, agbada, gowns, belts, adire..."
                  value={wardrobeSearch}
                  onChange={(e) => setWardrobeSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                />
              </div>
            </div>

            {/* Wardrobe Filter Tabs */}
            <div className="flex flex-wrap gap-1 border-b border-[#E8DFD5] dark:border-[#3B3029] pb-2">
              <button
                onClick={() => setActiveWardrobeTab('tops')}
                className={`py-1.5 px-3 rounded text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                  activeWardrobeTab === 'tops'
                    ? 'bg-[#A36B40] text-white'
                    : 'text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615]'
                }`}
              >
                Tops & Robes
              </button>
              <button
                onClick={() => setActiveWardrobeTab('caps')}
                className={`py-1.5 px-3 rounded text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                  activeWardrobeTab === 'caps'
                    ? 'bg-[#A36B40] text-white'
                    : 'text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615]'
                }`}
              >
                👑 Caps & Fila
              </button>
              <button
                onClick={() => setActiveWardrobeTab('bottoms')}
                className={`py-1.5 px-3 rounded text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                  activeWardrobeTab === 'bottoms'
                    ? 'bg-[#A36B40] text-white'
                    : 'text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615]'
                }`}
              >
                Trousers
              </button>
              <button
                onClick={() => setActiveWardrobeTab('accessories')}
                className={`py-1.5 px-3 rounded text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors ${
                  activeWardrobeTab === 'accessories'
                    ? 'bg-[#A36B40] text-white'
                    : 'text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615]'
                }`}
              >
                Accessories
              </button>
              <button
                onClick={() => setActiveWardrobeTab('starred')}
                className={`py-1.5 px-3 rounded text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors flex items-center gap-1 ${
                  activeWardrobeTab === 'starred'
                    ? 'bg-[#A36B40] text-white'
                    : 'text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615]'
                }`}
              >
                <Heart className="w-3 h-3 fill-current" />
                <span>Starred ({starredProducts.length})</span>
              </button>
            </div>

            {/* Wardrobe Items Grid */}
            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
              {filteredWardrobe.length === 0 ? (
                <div className="text-center py-12 text-[#6B635B] space-y-2">
                  <p className="text-xs">No items found matching your filter or search.</p>
                  {activeWardrobeTab === 'starred' && (
                    <p className="text-[11px]">Click the heart icon on any piece in the shop to star it for 1-click try-on!</p>
                  )}
                </div>
              ) : (
                filteredWardrobe.map(prod => {
                  const isWorn = 
                    equippedHeadwearId === prod.id || 
                    equippedTopId === prod.id || 
                    equippedBottomId === prod.id || 
                    equippedAccessoryId === prod.id;

                  return (
                    <div 
                      key={prod.id}
                      className={`p-3 rounded border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        isWorn 
                          ? 'border-[#A36B40] bg-[#FAF7F2] dark:bg-[#251F1B] ring-1 ring-[#A36B40]' 
                          : 'border-[#E8DFD5] dark:border-[#3B3029] bg-white dark:bg-[#1E1916] hover:border-[#A36B40]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-16 h-16 object-cover rounded bg-[#F4EFEA] flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif font-medium text-xs sm:text-sm text-[#1A1615] dark:text-[#FAF7F2]">
                              {prod.name}
                            </h4>
                            {isWorn && (
                              <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[#A36B40] text-white rounded">
                                Wearing
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] line-clamp-1">
                            {prod.vendorName} · {prod.fabric}
                          </p>
                          <p className="text-xs font-semibold text-[#A36B40] mt-0.5">
                            {formatNaira(prod.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8DFD5]/40">
                        <button
                          onClick={() => openProductDetail(prod)}
                          className="p-2 border border-[#E8DFD5] dark:border-[#3B3029] rounded text-[11px] text-[#6B635B] hover:text-[#1A1615] cursor-pointer"
                          title="View Piece Details"
                        >
                          Details
                        </button>

                        <button
                          onClick={() => handleToggleEquip(prod)}
                          className={`py-2 px-3.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isWorn
                              ? 'bg-rose-700 text-white hover:bg-rose-800'
                              : 'bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40]'
                          }`}
                        >
                          {isWorn ? (
                            <>
                              <X className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </>
                          ) : (
                            <>
                              <Shirt className="w-3.5 h-3.5" />
                              <span>Try On</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
