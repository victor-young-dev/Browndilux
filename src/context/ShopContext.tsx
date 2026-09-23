import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Vendor, 
  CartItem, 
  FilterState, 
  Order, 
  ViewType, 
  UserRole, 
  UserProfile, 
  NigerianMeasurements, 
  SocialLook, 
  WholesaleBatchOrder 
} from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { INITIAL_VENDORS } from '../data/vendors';
import { INITIAL_SOCIAL_LOOKS } from '../data/socialLooks';
import { getStoredOrders, saveOrder, getInventoryOverrides, updateProductStock, updateOrderStatus } from '../services/analyticsService';

interface ShopContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  products: Product[];
  vendors: Vendor[];
  activeProduct: Product | null;
  setActiveProduct: (product: Product | null) => void;
  openProductDetail: (product: Product) => void;
  activeVendor: Vendor | null;
  openVendorDetail: (vendor: Vendor) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color?: string, qty?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  removeProductFromCart: (productId: string) => void;
  isInCart: (productId: string) => boolean;
  toggleProductInCart: (product: Product, size?: string, color?: string, qty?: number, openDrawer?: boolean) => boolean;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  orders: Order[];
  createOrder: (order: Order) => void;
  modifyOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  modifyStock: (productId: string, newStock: number) => void;
  addNewProduct: (product: Product) => void;
  
  // Stakeholder & Auth State
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginAsDemo: (role: UserRole) => void;
  logoutUser: () => void;

  // Wholesaler B2B
  wholesaleOrders: WholesaleBatchOrder[];
  createWholesaleOrder: (order: WholesaleBatchOrder) => void;

  // Buyer Measurements
  savedMeasurements: NigerianMeasurements;
  updateMeasurements: (measurements: NigerianMeasurements) => void;

  // Social Looks
  socialLooks: SocialLook[];
  toggleLikeSocialLook: (lookId: string) => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_FILTERS: FilterState = {
  category: 'all',
  searchQuery: '',
  priceRange: [0, 200000],
  fabrics: [],
  fitType: 'all',
  sortBy: 'featured',
  inStockOnly: false
};

const DEFAULT_MEASUREMENTS: NigerianMeasurements = {
  chest: 42,
  shoulder: 19.5,
  bubaSleeveLength: 33,
  sokotoWaist: 34,
  sokotoLength: 41,
  agbadaWingSpan: 58,
  notes: 'Prefers slightly loose modern armhole cut with high mandarin neck placket'
};

const DEMO_PROFILES: Record<UserRole, UserProfile> = {
  buyer: {
    id: 'user-buyer-1',
    name: 'Chidi Okonjo',
    email: 'chidi.okonjo@gmail.com',
    phone: '+234 803 762 9911',
    role: 'buyer',
    avatar: '/images/senator_tunic_model.jpg',
    location: 'Victoria Island, Lagos',
    measurementProfile: DEFAULT_MEASUREMENTS
  },
  seller: {
    id: 'user-seller-1',
    name: 'Chief Folasade Oduwa',
    email: 'folasade@oduwaheritage.ng',
    phone: '+234 813 613 2727',
    role: 'seller',
    avatar: '/images/adire_gown_model.jpg',
    location: 'Itoku Art Quarter, Abeokuta',
    sellerDetails: {
      vendorId: 'vendor-1',
      atelierName: 'Oduwa Heritage Clothiers',
      workshopLocation: 'Abeokuta, Ogun State',
      artisanCapacity: 24,
      pendingPayoutKobo: 48500000 // ₦485,000 pending payout
    }
  },
  wholesaler: {
    id: 'user-wholesaler-1',
    name: 'Adeola Balogun',
    email: 'adeola@ekosocietyweddings.com',
    phone: '+234 818 200 4433',
    role: 'wholesaler',
    avatar: '/images/fila_cap_model.jpg',
    location: 'Maitama, Abuja',
    wholesalerDetails: {
      companyName: 'Eko Society & Aso-Ebi Concierge Ltd',
      tier: 'tier-2',
      customDiscountRate: 32,
      verifiedBusiness: true
    }
  },
  admin: {
    id: 'user-admin-1',
    name: 'Guild Operations Controller',
    email: 'admin@browndilux.com',
    phone: '+234 813 613 2727',
    role: 'admin',
    avatar: '/images/ankara_blazer_model.jpg',
    location: 'Lagos Headquarters'
  }
};

const INITIAL_WHOLESALE_ORDERS: WholesaleBatchOrder[] = [
  {
    id: 'wb-101',
    reference: 'WHOLESALE-ASOEBI-901',
    clientName: 'Adeola Balogun',
    companyOrSociety: 'Balogun & Adeleke Royal Nuptials',
    phone: '+234 818 200 4433',
    fabricType: 'Aso-Oke',
    colorScheme: 'Metallic Champagne & Royal Ochre',
    setCount: 35,
    unitPrice: 110000,
    discountPercent: 32,
    totalNaira: 2618000,
    deliveryDate: '2026-11-15',
    societyEventName: 'Balogun Royal Wedding Lekki',
    status: 'weaving-deposit-paid'
  }
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start on Gateway Landing Page so users can experience the stakeholder entry immediately
  const [currentView, setCurrentView] = useState<ViewType>('gateway');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeVendor, setActiveVendor] = useState<Vendor | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Multi-Stakeholder & Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_PROFILES.buyer);
  const [activeRole, setActiveRole] = useState<UserRole>('buyer');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Wholesaler & Measurements & Social Looks
  const [wholesaleOrders, setWholesaleOrders] = useState<WholesaleBatchOrder[]>(INITIAL_WHOLESALE_ORDERS);
  const [savedMeasurements, setSavedMeasurements] = useState<NigerianMeasurements>(DEFAULT_MEASUREMENTS);
  const [socialLooks, setSocialLooks] = useState<SocialLook[]>(INITIAL_SOCIAL_LOOKS);

  // Dark mode - defaults to elegant warm cream theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('browndilux_theme');
      if (saved === 'dark') return true;
      if (saved === 'light') return false;
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('browndilux_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        localStorage.setItem('browndilux_theme', 'light');
      }
    } catch (err) {
      console.warn('Theme storage unavailable', err);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Products with inventory overrides
  const [products, setProducts] = useState<Product[]>(() => {
    const overrides = getInventoryOverrides();
    return INITIAL_PRODUCTS.map(p => ({
      ...p,
      stock: overrides[p.id] !== undefined ? overrides[p.id] : p.stock
    }));
  });

  const [vendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [orders, setOrders] = useState<Order[]>(getStoredOrders);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('browndilux_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('browndilux_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('browndilux_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('browndilux_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const loginAsDemo = (role: UserRole) => {
    const profile = DEMO_PROFILES[role];
    setCurrentUser(profile);
    setActiveRole(role);
    setIsAuthModalOpen(false);
    showToast(`Logged in as ${profile.name} (${role.toUpperCase()})`);

    // Route automatically to their relevant hub
    if (role === 'seller') {
      setCurrentView('seller-portal');
    } else if (role === 'wholesaler') {
      setCurrentView('wholesaler-portal');
    } else if (role === 'admin') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setActiveRole('buyer');
    showToast('Signed out of Browndilux Guild session');
    setCurrentView('gateway');
  };

  const addToCart = (product: Product, size: string, color?: string, qty: number = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.productId === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      }

      return [
        ...prev,
        {
          id: `${product.id}-${size}-${Date.now()}`,
          productId: product.id,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity: qty
        }
      ];
    });

    showToast(`Added ${product.name} (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const isInCart = (productId: string): boolean => {
    return cart.some(item => item.productId === productId);
  };

  const removeProductFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
    showToast('Removed item from shopping bag');
  };

  const toggleProductInCart = (
    product: Product, 
    size?: string, 
    color?: string, 
    qty: number = 1,
    openDrawer: boolean = false
  ): boolean => {
    const alreadyIn = cart.some(item => item.productId === product.id);
    if (alreadyIn) {
      setCart(prev => prev.filter(item => item.productId !== product.id));
      showToast(`Removed "${product.name}" from your bag`);
      return false;
    } else {
      const chosenSize = size || product.availableSizes[0] || 'Standard';
      const chosenColor = color || (product.colorPalette[0]?.name);
      setCart(prev => [
        ...prev,
        {
          id: `${product.id}-${chosenSize}-${Date.now()}`,
          productId: product.id,
          product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity: qty
        }
      ]);
      showToast(`Added "${product.name}" (${chosenSize}) to your bag`);
      if (openDrawer) {
        setIsCartOpen(true);
      }
      return true;
    }
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Removed item from shopping bag');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed piece from saved wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved piece to your personal wishlist');
        return [...prev, productId];
      }
    });
  };

  const openProductDetail = (product: Product) => {
    setActiveProduct(product);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openVendorDetail = (vendor: Vendor) => {
    setActiveVendor(vendor);
    setCurrentView('vendor-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const createOrder = (order: Order) => {
    saveOrder(order);
    setOrders(prev => [order, ...prev]);

    // Decrement stock for purchased items
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        const nextStock = Math.max(0, prod.stock - item.quantity);
        updateProductStock(prod.id, nextStock);
        setProducts(curr =>
          curr.map(p => (p.id === prod.id ? { ...p, stock: nextStock } : p))
        );
      }
    });

    clearCart();
  };

  const modifyOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    updateOrderStatus(orderId, status);
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, orderStatus: status } : ord))
    );
    showToast(`Order status updated to "${status}"`);
  };

  const modifyStock = (productId: string, newStock: number) => {
    updateProductStock(productId, newStock);
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, stock: newStock } : p))
    );
    showToast(`Stock updated to ${newStock} units`);
  };

  const addNewProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
    showToast(`Published "${product.name}" to Browndilux Catalog!`);
  };

  const createWholesaleOrder = (order: WholesaleBatchOrder) => {
    setWholesaleOrders(prev => [order, ...prev]);
    showToast(`Wholesale batch proforma generated for ${order.societyEventName}`);
  };

  const updateMeasurements = (measurements: NigerianMeasurements) => {
    setSavedMeasurements(measurements);
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, measurementProfile: measurements } : null);
    }
    showToast('Nigerian measurement vault updated');
  };

  const toggleLikeSocialLook = (lookId: string) => {
    setSocialLooks(prev =>
      prev.map(look => {
        if (look.id === lookId) {
          return { ...look, likesCount: look.likesCount + 1 };
        }
        return look;
      })
    );
    showToast('Liked community style look');
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        products,
        vendors,
        activeProduct,
        setActiveProduct,
        openProductDetail,
        activeVendor,
        openVendorDetail,
        cart,
        addToCart,
        removeFromCart,
        removeProductFromCart,
        isInCart,
        toggleProductInCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        filters,
        setFilters,
        resetFilters,
        quickViewProduct,
        setQuickViewProduct,
        isDarkMode,
        toggleDarkMode,
        orders,
        createOrder,
        modifyOrderStatus,
        modifyStock,
        addNewProduct,
        currentUser,
        setCurrentUser,
        activeRole,
        setActiveRole,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginAsDemo,
        logoutUser,
        wholesaleOrders,
        createWholesaleOrder,
        savedMeasurements,
        updateMeasurements,
        socialLooks,
        toggleLikeSocialLook,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = (): ShopContextType => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
