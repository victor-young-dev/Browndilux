import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { NigerianMeasurements } from '../types';
import { 
  ShoppingBag, 
  Ruler, 
  CheckCircle2, 
  Heart, 
  MapPin, 
  MessageCircle, 
  ArrowRight
} from 'lucide-react';
import { formatNaira, generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

export const BuyerPortalView: React.FC = () => {
  const { 
    currentUser, 
    orders, 
    wishlist, 
    products, 
    savedMeasurements, 
    updateMeasurements, 
    openProductDetail,
    addToCart,
    setCurrentView 
  } = useShop();

  const [measurements, setMeasurements] = useState<NigerianMeasurements>(savedMeasurements);
  const [activeTab, setActiveTab] = useState<'orders' | 'measurements' | 'wishlist'>('orders');

  const userOrders = orders;
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleSaveMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    updateMeasurements(measurements);
  };

  const handleTrackWhatsApp = (ref: string) => {
    const text = `Hello Browndilux Concierge, I am inquiring about the live workshop status of my order ${ref}. Please provide the current tailoring stage.`;
    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, text);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Buyer Welcome Banner */}
      <div className="bg-[#F4EFEA] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'}
            alt={currentUser?.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#A36B40] flex-shrink-0"
          />
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
              Patron Account Hub
            </span>
            <h1 className="font-serif text-xl sm:text-3xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-0.5">
              {currentUser?.name || 'Chidi Okonjo'}
            </h1>
            <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] flex items-center gap-1.5 sm:gap-2 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#A36B40] flex-shrink-0" />
              <span>{currentUser?.location || 'Victoria Island, Lagos'}</span>
              <span>·</span>
              <span>Guild Patron</span>
            </p>
          </div>
        </div>

        {/* Tab Buttons - Mobile Responsive Wrap */}
        <div className="flex flex-wrap sm:flex-nowrap bg-white dark:bg-[#251F1B] p-1 rounded border border-[#E8DFD5] dark:border-[#3B3029] gap-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 sm:flex-initial py-1.5 px-3 text-xs tracking-wider uppercase font-medium rounded transition-colors text-center cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#A36B40] text-white'
                : 'text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615]'
            }`}
          >
            Orders ({userOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('measurements')}
            className={`flex-1 sm:flex-initial py-1.5 px-3 text-xs tracking-wider uppercase font-medium rounded transition-colors text-center cursor-pointer ${
              activeTab === 'measurements'
                ? 'bg-[#A36B40] text-white'
                : 'text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615]'
            }`}
          >
            Vault
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 sm:flex-initial py-1.5 px-3 text-xs tracking-wider uppercase font-medium rounded transition-colors text-center cursor-pointer ${
              activeTab === 'wishlist'
                ? 'bg-[#A36B40] text-white'
                : 'text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615]'
            }`}
          >
            Wishlist ({wishlist.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Orders & Real-Time Tracking */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-2xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[#E8DFD5] dark:border-[#3B3029] flex items-center justify-between">
              <h2 className="font-serif text-base sm:text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                Order History & Workshop Tracking
              </h2>
              <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
                {userOrders.length} orders
              </span>
            </div>

            <div className="divide-y divide-[#E8DFD5] dark:divide-[#3B3029]">
              {userOrders.map(order => (
                <div key={order.id} className="p-4 sm:p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-serif font-bold text-sm text-[#1A1615] dark:text-[#FAF7F2]">{order.reference}</span>
                        <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">· {new Date(order.createdAt).toLocaleDateString()}</span>
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                          {order.paymentStatus.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1">
                        Delivering to: {order.shippingAddress} ({order.deliveryState})
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8DFD5]/50">
                      <span className="font-serif text-base font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                        {formatNaira(order.total)}
                      </span>
                      <button
                        onClick={() => handleTrackWhatsApp(order.reference)}
                        className="py-1.5 px-3 bg-[#25D366] text-white hover:bg-[#20ba59] text-xs font-semibold rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Track WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Nigerian Workshop Pipeline Tracker */}
                  <div className="bg-[#FAF7F2] dark:bg-[#251F1B] rounded p-3 sm:p-4 border border-[#E8DFD5] dark:border-[#3B3029]">
                    <span className="text-[10px] uppercase font-bold text-[#A36B40] block mb-2">Live Guild Fulfillment Stage:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2 text-center text-[10px] sm:text-[11px]">
                      {[
                        { id: 'received', label: '1. Received' },
                        { id: 'in-workshop', label: '2. In Workshop' },
                        { id: 'quality-check', label: '3. Quality Check' },
                        { id: 'dispatched', label: '4. Dispatched' },
                        { id: 'delivered', label: '5. Delivered' }
                      ].map((step, idx) => {
                        const stages = ['received', 'in-workshop', 'quality-check', 'dispatched', 'delivered'];
                        const currentStageIdx = stages.indexOf(order.orderStatus);
                        const isComplete = currentStageIdx >= idx;
                        const isCurrent = order.orderStatus === step.id;

                        return (
                          <div
                            key={step.id}
                            className={`p-1.5 sm:p-2 rounded border transition-colors ${
                              isCurrent
                                ? 'bg-[#A36B40] text-white border-[#A36B40] font-bold'
                                : isComplete
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200'
                                : 'bg-transparent text-[#6B635B] dark:text-[#B8ADA3] border-[#E8DFD5] dark:border-[#3B3029]'
                            }`}
                          >
                            {step.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="space-y-1.5 pt-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-[#6B635B] dark:text-[#B8ADA3]">
                        <span>{item.productName} ({item.size}) × {item.quantity}</span>
                        <span className="font-medium text-[#1A1615] dark:text-[#FAF7F2]">{formatNaira(item.totalPrice)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Nigerian Bespoke Measurement Vault */}
      {activeTab === 'measurements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-8 shadow-2xs space-y-6">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#A36B40]" />
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                Your Nigerian Tailoring Vault
              </h2>
            </div>
            <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
              When ordering bespoke Senator tunics or Agbadas, these saved dimensions are automatically forwarded to our master cutters in Abeokuta and Abuja for a zero-slack tailored fit.
            </p>

            <form onSubmit={handleSaveMeasurements} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Chest Circumference (Inches)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={measurements.chest}
                    onChange={(e) => setMeasurements({ ...measurements, chest: Number(e.target.value) })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Shoulder Width (Inches)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={measurements.shoulder}
                    onChange={(e) => setMeasurements({ ...measurements, shoulder: Number(e.target.value) })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Buba Sleeve Length (Inches)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={measurements.bubaSleeveLength}
                    onChange={(e) => setMeasurements({ ...measurements, bubaSleeveLength: Number(e.target.value) })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Sokoto Trouser Waist (Inches)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={measurements.sokotoWaist}
                    onChange={(e) => setMeasurements({ ...measurements, sokotoWaist: Number(e.target.value) })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Trouser Outseam Length (Inches)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={measurements.sokotoLength}
                    onChange={(e) => setMeasurements({ ...measurements, sokotoLength: Number(e.target.value) })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Agbada Wing Span (Inches)
                  </label>
                  <input
                    type="number"
                    step={0.5}
                    value={measurements.agbadaWingSpan || 58}
                    onChange={(e) => setMeasurements({ ...measurements, agbadaWingSpan: Number(e.target.value) })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                  Bespoke Cut Notes & Fit Preferences
                </label>
                <textarea
                  rows={3}
                  value={measurements.notes}
                  onChange={(e) => setMeasurements({ ...measurements, notes: e.target.value })}
                  placeholder="e.g. Slim taper on trouser calves, prefer relaxed armhole for Agbada"
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Save Measurement Profile</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-[#FAF7F2] dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-8 space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
              Bespoke Tailoring Standard
            </span>
            <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
              Why Nigerian Measurements Matter
            </h3>
            <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
              Unlike Western garments, Nigerian traditional formalwear (Agbada, Buba, and Senator) relies on shoulder slope and sleeve drape to fall cleanly without pulling.
            </p>
            <div className="p-4 bg-white dark:bg-[#1E1916] rounded border border-[#E8DFD5] dark:border-[#3B3029] text-xs space-y-2">
              <p className="font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Direct WhatsApp Fitting Service</p>
              <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">
                Need help measuring with a tape at home? Call or video our master tailors on WhatsApp: <strong>+234 813 613 2727</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-8">
              <Heart className="w-10 h-10 text-[#6B635B] mx-auto mb-3 opacity-40" />
              <h3 className="font-serif text-xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                Your Wishlist is Empty
              </h3>
              <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1 mb-4">
                Explore the catalog to save limited-edition Adire and Aso-Oke pieces.
              </p>
              <button
                onClick={() => setCurrentView('shop')}
                className="py-2.5 px-6 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {wishlistProducts.map(prod => (
                <div key={prod.id} className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-4 shadow-2xs space-y-3">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-48 object-cover rounded bg-[#F4EFEA]"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80'; }}
                  />
                  <div>
                    <h4 className="font-serif font-medium text-sm text-[#1A1615] dark:text-[#FAF7F2] line-clamp-1">{prod.name}</h4>
                    <p className="text-xs text-[#A36B40] font-semibold mt-0.5">{formatNaira(prod.price)}</p>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-[#E8DFD5] dark:border-[#3B3029]">
                    <button
                      onClick={() => openProductDetail(prod)}
                      className="flex-1 py-1.5 text-center text-xs font-semibold border border-[#E8DFD5] dark:border-[#3B3029] rounded hover:border-[#A36B40] cursor-pointer"
                    >
                      View Piece
                    </button>
                    <button
                      onClick={() => addToCart(prod, prod.availableSizes[0])}
                      className="py-1.5 px-3 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] rounded text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
