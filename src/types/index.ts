export type ProductCategory = 
  | 'all'
  | 'heritage-traditional'
  | 'corporate-fusion'
  | 'evening-occasion'
  | 'outerwear-jackets'
  | 'artisanal-leather'
  | 'street-everyday';

export type FabricType = 
  | 'Adire Eleko / Batik'
  | 'Aso-Oke'
  | 'Ankara Modern'
  | 'Senator Cashmere / Wool'
  | 'Raw Silk / Satin'
  | 'Nigerian Genuine Leather'
  | 'Linen Blend';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number; // in Naira (NGN)
  compareAtPrice?: number;
  category: ProductCategory;
  fabric: FabricType;
  vendorId: string;
  vendorName: string;
  vendorLocation: string;
  images: string[];
  description: string;
  craftDetails: string[];
  availableSizes: string[];
  stock: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isMadeToOrder?: boolean;
  leadTimeDays?: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  fitType: 'men' | 'women' | 'unisex';
  colorPalette: {
    name: string;
    hex: string;
  }[];
}

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  location: string;
  state: string;
  bio: string;
  story: string;
  specialty: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  verifiedSince: string;
  artisanCount: number;
  whatsappContact: string;
  socialHandle: string;
  badges: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
  customNotes?: string;
}

export interface FilterState {
  category: ProductCategory;
  searchQuery: string;
  priceRange: [number, number];
  fabrics: FabricType[];
  fitType: 'all' | 'men' | 'women' | 'unisex';
  vendorId?: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
}

export interface AvatarConfig {
  gender: 'women' | 'men' | 'unisex';
  skinTone: 'warm-honey' | 'rich-chestnut' | 'deep-bronze' | 'golden-olive' | 'dark-espresso';
  silhouette: 'tailored' | 'athletic' | 'curvy' | 'classic-slim';
  headwear: 'none' | 'gele' | 'fila-cap' | 'fade-clean' | 'locs-braids';
  occasion: 'owambe-wedding' | 'corporate-boardroom' | 'lekki-art-gala' | 'sunday-brunch' | 'everyday-smart';
  selectedTopId?: string;
  selectedBottomId?: string;
  selectedOuterwearId?: string;
  selectedAccessoryId?: string;
}

export interface StylingAdvice {
  score: number; // 1-100
  verdict: string;
  harmonyAnalysis: string;
  occasionAppropriateness: string;
  culturalContext: string;
  suggestedPairs: string[];
  whatsappPitch: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  reference: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryState: 'Lagos' | 'Abuja' | 'Rivers' | 'Oyo' | 'Diaspora' | 'Other States';
  shippingAddress: string;
  shippingOption: 'lagos-express' | 'lagos-standard' | 'nationwide' | 'diaspora-dhl';
  shippingCost: number;
  paymentMethod: 'paystack' | 'bank-transfer' | 'cash-on-delivery';
  paymentStatus: 'paid' | 'pending' | 'verified';
  orderStatus: 'received' | 'in-workshop' | 'quality-check' | 'dispatched' | 'delivered';
  items: OrderItem[];
  subtotal: number;
  total: number;
  createdAt: string;
  whatsappMessage: string;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  whatsappInquiries: number;
  activeVendors: number;
  topCategories: { category: string; share: number; revenue: number }[];
  recentOrders: Order[];
}

export type UserRole = 'buyer' | 'seller' | 'wholesaler' | 'admin';

export interface NigerianMeasurements {
  chest: number; // in inches
  shoulder: number;
  bubaSleeveLength: number;
  sokotoWaist: number;
  sokotoLength: number;
  agbadaWingSpan?: number;
  notes?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  location?: string;
  sellerDetails?: {
    vendorId: string;
    atelierName: string;
    workshopLocation: string;
    artisanCapacity: number;
    pendingPayoutKobo: number;
  };
  wholesalerDetails?: {
    companyName: string;
    tier: 'tier-1' | 'tier-2' | 'tier-3';
    customDiscountRate: number;
    verifiedBusiness: boolean;
  };
  measurementProfile?: NigerianMeasurements;
}

export interface SocialLook {
  id: string;
  userHandle: string;
  userLocation: string;
  avatar: string;
  image: string;
  caption: string;
  taggedProductIds: string[];
  likesCount: number;
  occasionTag: string;
}

export interface WholesaleBatchOrder {
  id: string;
  reference: string;
  clientName: string;
  companyOrSociety: string;
  phone: string;
  fabricType: FabricType;
  colorScheme: string;
  setCount: number;
  unitPrice: number;
  discountPercent: number;
  totalNaira: number;
  deliveryDate: string;
  societyEventName: string;
  status: 'draft' | 'quote-sent' | 'weaving-deposit-paid' | 'in-production' | 'dispatched';
}

export type ViewType = 
  | 'gateway'
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'style-lab' 
  | 'vendors' 
  | 'vendor-detail' 
  | 'private-styling' 
  | 'checkout' 
  | 'dashboard'
  | 'seller-portal'
  | 'wholesaler-portal'
  | 'buyer-portal'
  | 'community-looks';

