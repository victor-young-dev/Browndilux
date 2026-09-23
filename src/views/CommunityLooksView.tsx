import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, MapPin, ShoppingBag, Camera, MessageCircle, Sparkles } from 'lucide-react';
import { formatNaira, generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

export const CommunityLooksView: React.FC = () => {
  const { socialLooks, toggleLikeSocialLook, products, openProductDetail, showToast } = useShop();

  const [selectedTag, setSelectedTag] = useState<string>('all');

  const tags = ['all', 'Owambe Celebration', 'Corporate Executive', 'Art Gallery Pop-Up', 'Diaspora Streetwear'];

  const filteredLooks = selectedTag === 'all'
    ? socialLooks
    : socialLooks.filter(look => look.occasionTag === selectedTag);

  const handleShareLookWhatsApp = () => {
    const text = `Hello Browndilux Guild! I would like to submit my photo wearing my Browndilux artisan piece for the "Styled by Nigeria" social lookbook.`;
    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, text);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
          Social Commerce & Community
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A1615] dark:text-[#FAF7F2]">
          Styled by Nigeria
        </h1>
        <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
          Real patrons, real celebrations. Explore how modern Nigerian style moves through boardrooms in Victoria Island, weddings in Ibadan, and art galleries in London.
        </p>

        {/* Occasion Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 pt-4">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`py-1.5 px-3 rounded text-xs transition-colors capitalize ${
                selectedTag === tag
                  ? 'bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] font-semibold'
                  : 'bg-white dark:bg-[#251F1B] text-[#6B635B] dark:text-[#B8ADA3] border border-[#E8DFD5] dark:border-[#3B3029]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Social Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredLooks.map(look => {
          const taggedPieces = products.filter(p => look.taggedProductIds.includes(p.id));

          return (
            <div
              key={look.id}
              className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded overflow-hidden shadow-xs flex flex-col justify-between"
            >
              {/* Image & Heart */}
              <div className="relative aspect-4/5 overflow-hidden bg-[#F4EFEA]">
                <img
                  src={look.image}
                  alt={look.userHandle}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleLikeSocialLook(look.id)}
                    className="p-2 rounded-full bg-black/40 backdrop-blur-xs text-white hover:text-red-400 transition-colors flex items-center gap-1 text-xs"
                    aria-label="Like look"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{look.likesCount}</span>
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white rounded">
                    {look.occasionTag}
                  </span>
                </div>
              </div>

              {/* User info & caption */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <img
                      src={look.avatar}
                      alt={look.userHandle}
                      className="w-7 h-7 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80';
                      }}
                    />
                    <div>
                      <p className="font-semibold text-xs text-[#1A1615] dark:text-[#FAF7F2]">{look.userHandle}</p>
                      <p className="text-[10px] text-[#6B635B] dark:text-[#B8ADA3] flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5" />
                        <span>{look.userLocation}</span>
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-2 leading-relaxed">
                    "{look.caption}"
                  </p>
                </div>

                {/* Tagged products in this look */}
                {taggedPieces.length > 0 && (
                  <div className="pt-3 border-t border-[#E8DFD5] dark:border-[#3B3029] space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-[#A36B40] tracking-wider block">Shop This Look:</span>
                    {taggedPieces.map(piece => (
                      <button
                        key={piece.id}
                        onClick={() => openProductDetail(piece)}
                        className="w-full text-left p-2 rounded bg-[#FAF7F2] dark:bg-[#251F1B] hover:bg-[#A36B40]/10 flex items-center justify-between text-xs transition-colors"
                      >
                        <span className="font-medium text-[#1A1615] dark:text-[#FAF7F2] line-clamp-1">{piece.name}</span>
                        <span className="text-[#A36B40] font-semibold">{formatNaira(piece.price)}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Look Callout */}
      <div className="bg-[#FAF7F2] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
        <Camera className="w-8 h-8 text-[#A36B40] mx-auto" />
        <h3 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
          Tag Your Look #BrowndiluxStyle
        </h3>
        <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] max-w-lg mx-auto">
          Share your styling on Instagram or send directly via WhatsApp to receive a ₦5,000 credit voucher on your next artisan commission.
        </p>
        <button
          onClick={handleShareLookWhatsApp}
          className="py-3 px-8 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors inline-flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4 text-[#25D366]" />
          <span>Submit Photo via WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
