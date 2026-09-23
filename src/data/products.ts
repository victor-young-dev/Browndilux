import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-adire-coord-cocoa',
    name: 'Osumare Cocoa Adire Co-Ord Set',
    subtitle: 'Hand-batik two-piece silk-cotton resort set in warm earth swirl',
    price: 64500,
    compareAtPrice: 72000,
    category: 'heritage-traditional',
    fabric: 'Adire Eleko / Batik',
    vendorId: 'vendor-1',
    vendorName: 'Oduwa Heritage Clothiers',
    vendorLocation: 'Abeokuta, Ogun State',
    images: [
      '/images/adire_coord_model.jpg',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A contemporary masterwork from the Adire renaissance. Individually hand-painted using natural cassava starch resist before immersion into botanical cocoa and sage dye vats in Abeokuta. Features a relaxed cuban-collar short sleeve paired with straight-cut drawstring trousers.',
    craftDetails: [
      '100% breathable organic cotton with silk lustre finish',
      'Hand-dipped botanical dyes from sustainable Ogun tree bark and indigo',
      'French seam construction for lifetime durability in warm climates',
      'Natural coconut shell buttons carved in Badagry'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', '2XL', 'Bespoke Fit'],
    stock: 12,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    tags: ['Adire', 'Co-ord', 'Resort', 'Earth Tones', 'Summer'],
    fitType: 'unisex',
    colorPalette: [
      { name: 'Warm Cocoa & Sage', hex: '#6B4A38' },
      { name: 'Desert Sand', hex: '#D2B48C' }
    ]
  },
  {
    id: 'prod-senator-deconstructed-sand',
    name: 'The Alara Deconstructed Senator Tunic',
    subtitle: 'Slim-line asymmetric modern native with concealed mother-of-pearl placket',
    price: 78000,
    category: 'corporate-fusion',
    fabric: 'Senator Cashmere / Wool',
    vendorId: 'vendor-2',
    vendorName: 'Danbello Bespoke & Senator',
    vendorLocation: 'Wuse II, Abuja',
    images: [
      '/images/senator_tunic_model.jpg',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Redefining corporate African elegance. Tailored for boardroom presentations and seamless transition into private gallery dinners. Cut from crease-resistant tropical wool-cashmere blend featuring a sharp mandarin collar and subtle shoulder welt.',
    craftDetails: [
      'Tropical grade wool-cashmere blend (280gsm) suited for air-conditioned suites and outdoor warmth',
      'Concealed German snap-button closures with hand-stitched bar tacks',
      'Double back vents and reinforced side slits for ergonomic movement',
      'Includes matching tapered trousers with hidden expander waistband'
    ],
    availableSizes: ['38 / S', '40 / M', '42 / L', '44 / XL', '46 / 2XL'],
    stock: 9,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 45,
    tags: ['Senator', 'Corporate Native', 'Modern Traditional', 'Abuja Tailoring'],
    fitType: 'men',
    colorPalette: [
      { name: 'Warm Almond Sand', hex: '#D6C5B3' },
      { name: 'Midnight Charcoal', hex: '#262423' }
    ]
  },
  {
    id: 'prod-asooke-bomber-copper',
    name: 'Iseyin Handwoven Aso-Oke Varsity Bomber',
    subtitle: 'Narrow-loom metallic copper & espresso weave with Italian ribbing',
    price: 128000,
    compareAtPrice: 145000,
    category: 'outerwear-jackets',
    fabric: 'Aso-Oke',
    vendorId: 'vendor-3',
    vendorName: 'Alariwe Aso-Oke Studio',
    vendorLocation: 'Bodija, Ibadan',
    images: [
      '/images/asooke_bomber_model.jpg',
      'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Statement outerwear bringing centuries-old Yoruba loom-craft into contemporary global fashion. Handwoven in strips of Alaari metallic copper threads, painstakingly joined with double-needle reinforcement and lined with cooling cupro.',
    craftDetails: [
      'Authentic narrow-loom handwoven Aso-Oke by master weavers in Iseyin',
      'Breathable cupro lining that glides effortlessly over shirts',
      'Heavy-duty antique brass YKK zip with genuine leather pull tab',
      'Limited small-batch production to preserve textile rarity'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    stock: 4,
    isNewArrival: true,
    isMadeToOrder: false,
    rating: 5.0,
    reviewCount: 22,
    tags: ['Aso-Oke', 'Bomber', 'Statement', 'Heritage Streetwear', 'Collectible'],
    fitType: 'unisex',
    colorPalette: [
      { name: 'Copper & Espresso', hex: '#A36B40' },
      { name: 'Onyx Bronze', hex: '#4A3B32' }
    ]
  },
  {
    id: 'prod-leather-belt-tan',
    name: 'Benin Foundry Brass & Full-Grain Leather Belt',
    subtitle: 'Hand-burnished vegetable tanned cowhide with lost-wax cast buckle',
    price: 8500,
    category: 'artisanal-leather',
    fabric: 'Nigerian Genuine Leather',
    vendorId: 'vendor-4',
    vendorName: 'Eki Artisanal Leathercraft',
    vendorLocation: 'Yaba, Lagos',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Accessible everyday luxury rooted in authentic Nigerian craft. Cut from 3.8mm thick vegetable-tanned hide sourced from Kano tanneries and paired with a solid buckle cast using the historical Benin bronze lost-wax casting technique.',
    craftDetails: [
      '3.8mm thick full-grain cattle leather with natural wax edge sealing',
      'Buckle hand-cast in solid brass by 5th generation Benin foundry artisans',
      'Beeswax-treated heavy linen saddle stitching along the keeper loop',
      'Develops a deep golden patina with everyday wear'
    ],
    availableSizes: ['30-32', '34-36', '38-40', '42-44'],
    stock: 28,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 64,
    tags: ['Leather', 'Belt', 'Brass', 'Everyday', 'Gift Under 10k'],
    fitType: 'unisex',
    colorPalette: [
      { name: 'Ochre Tan', hex: '#A86C3F' },
      { name: 'Rich Umber', hex: '#3B291E' }
    ]
  },
  {
    id: 'prod-leather-cuff-wallet',
    name: 'Idanre Minimalist Card Sleeve & Key Fob Set',
    subtitle: 'Zero-waste upcycled calf leather with debossed heritage monogram',
    price: 12500,
    compareAtPrice: 15000,
    category: 'artisanal-leather',
    fabric: 'Nigerian Genuine Leather',
    vendorId: 'vendor-4',
    vendorName: 'Eki Artisanal Leathercraft',
    vendorLocation: 'Yaba, Lagos',
    images: [
      'https://images.unsplash.com/photo-1606503829068-1eb24b86214d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Designed as a sleek pocket companion for the modern urban professional. Holds up to 6 cards plus folded currency, paired with a matching brass-rivet keychain that ages gracefully.',
    craftDetails: [
      'Crafted utilizing premium workshop offcuts for zero-waste sustainability',
      'Debossed with subtle geometric Nigerian bronze pattern',
      'Waxed edge treatment prevents moisture penetration'
    ],
    availableSizes: ['One Size'],
    stock: 35,
    rating: 4.8,
    reviewCount: 31,
    tags: ['Accessories', 'Wallet', 'Cardholder', 'Under 15k'],
    fitType: 'unisex',
    colorPalette: [
      { name: 'Chestnut Brown', hex: '#583D2A' }
    ]
  },
  {
    id: 'prod-adire-corset-gown',
    name: 'Moremi Draped Silk & Adire Evening Column',
    subtitle: 'Sculpted boned corset bodice with cascading indigo and terracotta silk drape',
    price: 115000,
    category: 'evening-occasion',
    fabric: 'Raw Silk / Satin',
    vendorId: 'vendor-1',
    vendorName: 'Oduwa Heritage Clothiers',
    vendorLocation: 'Abeokuta & Lagos',
    images: [
      '/images/adire_gown_model.jpg',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'A breathtaking showstopper for Owambe celebrations, society nuptials, and red carpets. Features an internal corseted sweetheart bodice hand-dyed in warm terracotta and indigo Adire motifs, flowing into a liquid-silk floor-skimming silhouette with side slit.',
    craftDetails: [
      'Mulberry silk infused with hand-resist botanical dye techniques',
      'Internal 14-point flexi-boning for sculpted support without restrictive stiffness',
      'Invisible back zip with hook-and-eye safety closure',
      'Custom hem length available upon order confirmation via WhatsApp styling concierge'
    ],
    availableSizes: ['UK 8 / S', 'UK 10 / M', 'UK 12 / L', 'UK 14 / XL', 'UK 16 / 2XL', 'Custom Measurement'],
    stock: 5,
    isNewArrival: true,
    isMadeToOrder: true,
    leadTimeDays: 7,
    rating: 5.0,
    reviewCount: 19,
    tags: ['Owambe', 'Evening', 'Adire Silk', 'Corset', 'Wedding Guest'],
    fitType: 'women',
    colorPalette: [
      { name: 'Terracotta & Indigo', hex: '#B85D38' },
      { name: 'Deep Cocoa', hex: '#3E2A1E' }
    ]
  },
  {
    id: 'prod-modern-agbada-sage',
    name: 'The Oba Modular Slim Agbada Set',
    subtitle: 'Three-piece deconstructed kaftan with lightweight detachable cape in sage green',
    price: 135000,
    category: 'heritage-traditional',
    fabric: 'Senator Cashmere / Wool',
    vendorId: 'vendor-2',
    vendorName: 'Danbello Bespoke & Senator',
    vendorLocation: 'Wuse II, Abuja',
    images: [
      '/images/agbada_sage_model.jpg',
      '/images/fila_cap_model.jpg'
    ],
    description: 'The heavyweight, cumbersome Agbadas of the past have been completely reimagined. Danbello uses feather-light tropical wool-linen that folds cleanly over the arms without slipping, complemented by intricate tonal threadwork around the collar.',
    craftDetails: [
      'Three-piece ensemble: inner tunic, tailored trousers, and modular outer wings',
      'Precision machine-assisted hand embroidery on the breastplate',
      'Breathable underarm ventilation for outdoor afternoon celebrations',
      'Wrinkle-recovery weave ensures you arrive crisp at reception'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', '2XL', 'Made to Measure'],
    stock: 6,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 27,
    tags: ['Agbada', 'Traditional', 'Owambe', 'Sage Green', 'Regal'],
    fitType: 'men',
    colorPalette: [
      { name: 'Sage Green', hex: '#7D8C75' },
      { name: 'Warm Putty', hex: '#C7BCAE' }
    ]
  },
  {
    id: 'prod-linen-safari-jacket',
    name: 'Eko Safari Overshirt & Pleated Short Set',
    subtitle: 'Breathable washed Irish-linen blend with patch pockets and horn buttons',
    price: 52000,
    compareAtPrice: 58000,
    category: 'street-everyday',
    fabric: 'Linen Blend',
    vendorId: 'vendor-5',
    vendorName: 'Lush & Linen Lagos',
    vendorLocation: 'Victoria Island, Lagos',
    images: [
      '/images/safari_linen_model.jpg',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Tailored for weekend ease, art pop-ups in Ikoyi, and coastal getaways to Tarkwa Bay. Pre-washed linen that feels soft immediately and drapes naturally without stiff creasing.',
    craftDetails: [
      'Pre-shrunk 60% linen / 40% organic cotton weave',
      'Four gusseted utility patch pockets with button flaps',
      'Drawstring waistband shorts with deep slanted side pockets'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    stock: 14,
    rating: 4.7,
    reviewCount: 29,
    tags: ['Linen', 'Safari', 'Casual', 'Lagos Weekend', 'Earth Tones'],
    fitType: 'unisex',
    colorPalette: [
      { name: 'Warm Khaki', hex: '#B89B72' },
      { name: 'Burnt Clay', hex: '#9E5B40' }
    ]
  },
  {
    id: 'prod-ankara-trench-blazer',
    name: 'Zaria Cutaway Ankara Corporate Blazer',
    subtitle: 'Tailored notched-lapel single breasted jacket in muted geometric Ankara wax',
    price: 68000,
    category: 'corporate-fusion',
    fabric: 'Ankara Modern',
    vendorId: 'vendor-3',
    vendorName: 'Alariwe Aso-Oke Studio',
    vendorLocation: 'Bodija, Ibadan',
    images: [
      '/images/ankara_blazer_model.jpg',
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Brings Nigerian textile heritage directly to the boardroom with sophisticated restraint. Subtle geometric wax prints in warm rust, camel, and deep espresso cut into an empowering structured silhouette.',
    craftDetails: [
      '100% premium wax-treated cotton with matte finish',
      'Canvassed chest piece for crisp structural posture throughout working days',
      'Deep interior pen and card pockets designed for executive women'
    ],
    availableSizes: ['UK 8', 'UK 10', 'UK 12', 'UK 14', 'UK 16'],
    stock: 8,
    rating: 4.8,
    reviewCount: 33,
    tags: ['Blazer', 'Ankara Fusion', 'Corporate Native', 'Workwear'],
    fitType: 'women',
    colorPalette: [
      { name: 'Rust & Camel Geometric', hex: '#A85A32' },
      { name: 'Espresso Earth', hex: '#3C281F' }
    ]
  },
  {
    id: 'prod-leather-holdall-weekender',
    name: 'The Niger Duffle & Travel Holdall',
    subtitle: 'Heirloom travel duffle in oiled saddle leather with antique brass hardware',
    price: 94000,
    compareAtPrice: 110000,
    category: 'artisanal-leather',
    fabric: 'Nigerian Genuine Leather',
    vendorId: 'vendor-4',
    vendorName: 'Eki Artisanal Leathercraft',
    vendorLocation: 'Yaba, Lagos',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'Designed to fit domestic carry-on limits for African airlines and international flights, this heavy-duty duffle is crafted for a lifetime of road journeys and global diaspora travel.',
    craftDetails: [
      'Thick pull-up oil tanned leather that resists scratches and moisture',
      'Solid cast brass hardware with 360-degree swivel shoulder strap clasps',
      'Reinforced base with 6 brass protective studs',
      'Lined in water-resistant olive waxed canvas with dedicated shoe compartment'
    ],
    availableSizes: ['45 Litre Standard'],
    stock: 7,
    rating: 5.0,
    reviewCount: 41,
    tags: ['Luggage', 'Leather', 'Travel', 'Holdall', 'Investment Piece'],
    fitType: 'unisex',
    colorPalette: [
      { name: 'Saddle Cognac', hex: '#8B4513' },
      { name: 'Dark Roast', hex: '#2E1D13' }
    ]
  },
  {
    id: 'prod-adire-wideleg-trouser',
    name: 'Abeokuta High-Waist Adire Palazzo Trousers',
    subtitle: 'Flowing wide-leg trousers in cassava-resist batik with side pockets',
    price: 46000,
    category: 'street-everyday',
    fabric: 'Adire Eleko / Batik',
    vendorId: 'vendor-1',
    vendorName: 'Oduwa Heritage Clothiers',
    vendorLocation: 'Abeokuta, Ogun State',
    images: [
      '/images/adire_coord_model.jpg',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85'
    ],
    description: 'The ultimate versatile wardrobe essential. Pair with a crisp tailored shirt for Monday meetings or an earth-tone bandeau for Saturday art openings. Features an elasticated back waistband for all-day ease.',
    craftDetails: [
      'High-rise waistline with front pleats for an elongated visual silhouette',
      'Extra-deep side pockets that securely hold modern smartphones',
      'Cold-water colorfast treatment ensures no dye transfer onto light upholstery'
    ],
    availableSizes: ['S', 'M', 'L', 'XL', '2XL'],
    stock: 16,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 52,
    tags: ['Adire', 'Trousers', 'Palazzo', 'Comfort', 'Everyday Luxury'],
    fitType: 'women',
    colorPalette: [
      { name: 'Indigo & Earth Terracotta', hex: '#445167' },
      { name: 'Sage Swirl', hex: '#85937F' }
    ]
  },
  {
    id: 'prod-aso-oke-cap-fila',
    name: 'Oyo Handwoven Gobi Fila & Gele Headpiece',
    subtitle: 'Traditional crown headwear in hand-spun metallic weave with soft crown fold',
    price: 18500,
    category: 'artisanal-leather',
    fabric: 'Aso-Oke',
    vendorId: 'vendor-3',
    vendorName: 'Alariwe Aso-Oke Studio',
    vendorLocation: 'Bodija, Ibadan',
    images: [
      '/images/fila_cap_model.jpg',
      '/images/asooke_bomber_model.jpg'
    ],
    description: 'Handwoven on vintage narrow wooden looms in Oyo town. Structured to hold its traditional forward, left, or right slant effortlessly throughout festive celebrations and traditional wedding rites.',
    craftDetails: [
      'Pure organic cotton hand-spun yarn interwoven with gold metallic thread',
      'Lined in soft non-abrasive cotton to protect hair edges',
      'Custom sizing ensures snug fit without headache pressure'
    ],
    availableSizes: ['Small (21.5")', 'Medium (22.5")', 'Large (23.5")'],
    stock: 22,
    rating: 4.9,
    reviewCount: 36,
    tags: ['Fila', 'Headwear', 'Aso-Oke', 'Traditional', 'Owambe'],
    fitType: 'unisex',
    colorPalette: [
      { name: 'Copper & Bronze', hex: '#9C6239' },
      { name: 'Cream & Silver', hex: '#E2DBD0' }
    ]
  }
];
