import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { Toast } from './components/Toast';
import { AuthModal } from './components/AuthModal';
import { StakeholderQuickBar } from './components/StakeholderQuickBar';

import { GatewayLandingView } from './views/GatewayLandingView';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { StyleLabView } from './views/StyleLabView';
import { VendorsView } from './views/VendorsView';
import { VendorDetailView } from './views/VendorDetailView';
import { PrivateStylingView } from './views/PrivateStylingView';
import { CheckoutView } from './views/CheckoutView';
import { DashboardView } from './views/DashboardView';
import { SellerPortalView } from './views/SellerPortalView';
import { WholesalerPortalView } from './views/WholesalerPortalView';
import { BuyerPortalView } from './views/BuyerPortalView';
import { CommunityLooksView } from './views/CommunityLooksView';

const AppContent: React.FC = () => {
  const { currentView } = useShop();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-[#151110] text-[#1A1615] dark:text-[#FAF7F2] font-sans transition-colors duration-200">
      <Navbar />
      <StakeholderQuickBar />

      <main className="flex-1">
        {currentView === 'gateway' && <GatewayLandingView />}
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'style-lab' && <StyleLabView />}
        {currentView === 'vendors' && <VendorsView />}
        {currentView === 'vendor-detail' && <VendorDetailView />}
        {currentView === 'private-styling' && <PrivateStylingView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'seller-portal' && <SellerPortalView />}
        {currentView === 'wholesaler-portal' && <WholesalerPortalView />}
        {currentView === 'buyer-portal' && <BuyerPortalView />}
        {currentView === 'community-looks' && <CommunityLooksView />}
      </main>

      <Footer />
      <CartDrawer />
      <QuickViewModal />
      <Toast />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
