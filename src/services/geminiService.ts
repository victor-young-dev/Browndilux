import { AvatarConfig, Product, StylingAdvice } from '../types';

export async function getAiStylingAdvice(
  config: AvatarConfig,
  selectedProducts: {
    top?: Product;
    bottom?: Product;
    outerwear?: Product;
    accessory?: Product;
  }
): Promise<StylingAdvice> {
  try {
    const response = await fetch('/api/ai/styling-advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config, selectedProducts })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.score) {
        return data;
      }
    }
  } catch (err) {
    console.warn('AI styling endpoint fallback active:', err);
  }

  // High-fidelity fallback based on Nigerian styling rules & color harmony
  return generateClientStylingAdvice(config, selectedProducts);
}

export function generateClientStylingAdvice(
  config: AvatarConfig,
  items: {
    top?: Product;
    bottom?: Product;
    outerwear?: Product;
    accessory?: Product;
  }
): StylingAdvice {
  const itemCount = Object.values(items).filter(Boolean).length;
  let baseScore = 75;
  if (itemCount >= 2) baseScore += 12;
  if (itemCount >= 3) baseScore += 8;

  // Occasion analysis
  const occasionTitles: Record<string, string> = {
    'owambe-wedding': 'Owambe Festive Celebration',
    'corporate-boardroom': 'Corporate Boardroom / C-Suite',
    'lekki-art-gala': 'Lekki Art & Fashion Gala',
    'sunday-brunch': 'Sunday Social & Brunch',
    'everyday-smart': 'Everyday Contemporary Smart'
  };

  const skinToneNames: Record<string, string> = {
    'warm-honey': 'Warm Honey / Golden Undertone',
    'rich-chestnut': 'Rich Chestnut / Warm Neutral',
    'deep-bronze': 'Deep Bronze / Radiant Undertone',
    'golden-olive': 'Golden Olive / Balanced Undertone',
    'dark-espresso': 'Deep Espresso / Cool Velvet Undertone'
  };

  const topName = items.top?.name || 'Tonal Base Top';
  const bottomName = items.bottom?.name || 'Complementary Trousers';
  const outerName = items.outerwear ? items.outerwear.name : 'Unlayered';
  const accName = items.accessory ? items.accessory.name : 'Minimal Accents';

  const occasion = config.occasion || 'everyday-smart';
  const occasionLabel = occasionTitles[occasion] || 'Nigerian Contemporary Event';
  const skinLabel = skinToneNames[config.skinTone] || 'Radiant Melanin';

  let verdict = 'Harmonious Heritage Blend';
  let culturalContext = 'Balances indigenous Nigerian fabric heritage with contemporary cosmopolitan ergonomics.';
  
  if (items.outerwear?.fabric === 'Aso-Oke' || items.top?.fabric === 'Aso-Oke') {
    verdict = 'Regal Modern Yoruba Loom Silhouette';
    culturalContext = 'The narrow-loom Aso-Oke geometry pays homage to Western Nigerian heritage while the modern cut keeps it effortlessly wearable.';
    baseScore = Math.min(98, baseScore + 5);
  } else if (items.top?.fabric === 'Adire Eleko / Batik' || items.bottom?.fabric === 'Adire Eleko / Batik') {
    verdict = 'Botanical Adire Renaissance Masterpiece';
    culturalContext = 'Organic cassava resist motifs from Abeokuta invoke sustainable Yoruba textile preservation, perfect for tropical sunlight.';
    baseScore = Math.min(97, baseScore + 4);
  } else if (items.top?.fabric === 'Senator Cashmere / Wool') {
    verdict = 'Sharply Tailored Modern Native Architecture';
    culturalContext = 'Deconstructed senator lines deliver boardroom gravitas without sacrificing cultural identity.';
    baseScore = Math.min(99, baseScore + 5);
  }

  const harmonyAnalysis = `The ${skinLabel} complexions are naturally flattered by the earthy cocoa, copper, and warm tones present in ${topName}. When paired with ${bottomName}, the structural drape creates vertical visual balance.`;

  const occasionAppropriateness = `Ideal for ${occasionLabel}. The combination commands effortless respect without looking overdressed or costume-like.`;

  const suggestedPairs = [
    'Benin Foundry Cast Brass Cuff or Watch',
    'Polished Dark Tan Monkstraps or Minimalist Leather Slides',
    'Folded Gobi Fila in Copper/Espresso Silk'
  ];

  const whatsappPitch = `Hello Browndilux Stylist! I customized this outfit in the AI Style Lab for a ${occasionLabel}: ${topName} + ${bottomName} ${items.outerwear ? `+ ${outerName}` : ''}. Can you advise on sizing and workshop availability?`;

  return {
    score: Math.min(99, Math.max(82, baseScore)),
    verdict,
    harmonyAnalysis,
    occasionAppropriateness,
    culturalContext,
    suggestedPairs,
    whatsappPitch
  };
}

export async function getAiTrendSuggestions(trendQuery: string): Promise<string[]> {
  try {
    const response = await fetch('/api/ai/trend-suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: trendQuery })
    });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.suggestions) && data.suggestions.length > 0) {
        return data.suggestions;
      }
    }
  } catch (err) {
    console.warn('AI trends fallback active:', err);
  }

  return [
    'Adire botanical dyed co-ords in sage and cocoa are leading resort & high-profile weekend wear across Lagos.',
    'Deconstructed modern Senators with mandarin collars are replacing traditional three-piece suits in tech and creative boardrooms.',
    'Narrow-loom Aso-Oke bomber jackets provide striking diaspora statement pieces for cooler climates.',
    'Vegetable-tanned Nigerian leather accessories with brass lost-wax buckles are the fastest rising accessible luxury category.'
  ];
}
