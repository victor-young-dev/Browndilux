import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Order, OrderItem } from '../types';
import { 
  ShieldCheck, 
  CreditCard, 
  Building2, 
  Truck, 
  CheckCircle2, 
  ArrowLeft, 
  Copy, 
  MessageCircle,
  Lock,
  Sparkles
} from 'lucide-react';
import { 
  formatNaira, 
  generateOrderReceiptWhatsAppMessage, 
  generateCartWhatsAppCheckoutMessage,
  generateWhatsAppUrl, 
  BROWNDILUX_WHATSAPP_NUMBER 
} from '../utils/formatters';

export const CheckoutView: React.FC = () => {
  const { cart, cartTotal, clearCart, createOrder, setCurrentView, showToast } = useShop();

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    state: 'Lagos' as Order['deliveryState'],
    address: ''
  });

  const [shippingOption, setShippingOption] = useState<Order['shippingOption']>('lagos-standard');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Dynamic Shipping Fee Calculation
  let shippingCost = 2500;
  if (customer.state === 'Lagos') {
    if (shippingOption === 'lagos-express') {
      shippingCost = 3500;
    } else {
      // Free Lagos delivery above ₦100,000
      shippingCost = cartTotal >= 100000 ? 0 : 2500;
    }
  } else if (customer.state === 'Diaspora') {
    shippingCost = 35000;
  } else {
    shippingCost = 6500;
  }

  const finalTotal = cartTotal + shippingCost;

  const handleDirectWhatsAppCheckout = () => {
    const formattedItems = cart.map(i => ({
      productName: i.product.name,
      size: i.selectedSize,
      color: i.selectedColor,
      quantity: i.quantity,
      unitPrice: i.product.price,
      vendorName: i.product.vendorName
    }));

    const message = generateCartWhatsAppCheckoutMessage(
      formattedItems,
      finalTotal,
      customer.name || undefined
    );
    
    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (cart.length === 0 && !completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
          Your bag is empty
        </h2>
        <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
          Please select pieces from our marketplace before proceeding to checkout.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="py-2.5 px-6 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] text-xs font-semibold uppercase tracking-wider rounded"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  // Handle Order Placement
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderRef = `BDL-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderItems: OrderItem[] = cart.map(item => ({
      productId: item.productId,
      productName: item.product.name,
      size: item.selectedSize,
      quantity: item.quantity,
      unitPrice: item.product.price,
      totalPrice: item.product.price * item.quantity
    }));

    const whatsappMessage = generateOrderReceiptWhatsAppMessage(
      orderRef,
      customer.name,
      orderItems.map(i => ({ name: i.productName, size: i.size, qty: i.quantity, price: i.totalPrice })),
      finalTotal,
      paymentMethod,
      customer.state
    );

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      reference: orderRef,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      deliveryState: customer.state,
      shippingAddress: customer.address,
      shippingOption,
      shippingCost,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash-on-delivery' ? 'pending' : 'paid',
      orderStatus: 'in-workshop',
      items: orderItems,
      subtotal: cartTotal,
      total: finalTotal,
      createdAt: new Date().toISOString(),
      whatsappMessage
    };

    setTimeout(() => {
      createOrder(newOrder);
      setCompletedOrder(newOrder);
      setIsProcessing(false);
      showToast(`Order ${orderRef} confirmed!`);
    }, 1200);
  };

  // Completed Order View
  if (completedOrder) {
    const whatsappUrl = generateWhatsAppUrl(
      BROWNDILUX_WHATSAPP_NUMBER,
      completedOrder.whatsappMessage
    );

    return (
      <div className="max-w-2xl mx-auto px-4 py-16 space-y-8 animate-in fade-in duration-300">
        <div className="p-8 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-wider text-[#A36B40] font-semibold">
              Payment Confirmed
            </span>
            <h1 className="font-serif text-3xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mt-1">
              Thank You, {completedOrder.customerName}!
            </h1>
            <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1">
              Your order reference is <strong className="text-[#1A1615] dark:text-[#FAF7F2]">{completedOrder.reference}</strong>.
            </p>
          </div>

          {/* Receipt Breakdown */}
          <div className="bg-[#FAF7F2] dark:bg-[#251F1B] p-4 rounded text-left text-xs space-y-2 border border-[#E8DFD5] dark:border-[#3B3029]">
            <div className="flex justify-between font-semibold border-b border-[#E8DFD5] dark:border-[#3B3029] pb-2 text-[#1A1615] dark:text-[#FAF7F2]">
              <span>Ensemble Items ({completedOrder.items.length})</span>
              <span>Total: {formatNaira(completedOrder.total)}</span>
            </div>
            {completedOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-[#6B635B] dark:text-[#B8ADA3]">
                <span>{item.productName} ({item.size}) x{item.quantity}</span>
                <span>{formatNaira(item.totalPrice)}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-[#E8DFD5] dark:border-[#3B3029] flex justify-between text-[#6B635B] dark:text-[#B8ADA3]">
              <span>Delivery to {completedOrder.deliveryState}:</span>
              <span>{completedOrder.shippingCost === 0 ? 'FREE' : formatNaira(completedOrder.shippingCost)}</span>
            </div>
          </div>

          {/* WhatsApp Direct Notification CTA */}
          <div className="pt-2 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Order Confirmation to WhatsApp Atelier</span>
            </a>
            <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">
              Receive live photos of your garment being cut and stitched in our artisan workshop.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs text-[#A36B40] dark:text-[#C68A5E] font-semibold hover:underline"
            >
              Continue Exploring Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <button
        onClick={() => setCurrentView('shop')}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#A36B40] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Marketplace</span>
      </button>

      <div className="border-b border-[#E8DFD5] dark:border-[#3B3029] pb-4">
        <h1 className="font-serif text-3xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
          Secure Checkout
        </h1>
        <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1">
          Paystack 256-bit encryption · Nigerian Virtual Account Transfer · Lagos Cash on Delivery
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Customer Details, Shipping & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Customer Contact */}
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 space-y-4">
            <h2 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] text-xs flex items-center justify-center">1</span>
              <span>Delivery & Contact Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1 text-[#1A1615] dark:text-[#FAF7F2]">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Babatunde Adeleke"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1 text-[#1A1615] dark:text-[#FAF7F2]">WhatsApp Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 803 000 0000"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold uppercase tracking-wider mb-1 text-[#1A1615] dark:text-[#FAF7F2]">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="babatunde@example.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1 text-[#1A1615] dark:text-[#FAF7F2]">State / Region *</label>
                <select
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value as any })}
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                >
                  <option value="Lagos">Lagos State</option>
                  <option value="Abuja">Abuja FCT</option>
                  <option value="Rivers">Rivers / Port Harcourt</option>
                  <option value="Oyo">Oyo State (Ibadan)</option>
                  <option value="Other States">Other Nigerian States</option>
                  <option value="Diaspora">International Diaspora (UK, US, Canada)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider mb-1 text-[#1A1615] dark:text-[#FAF7F2]">Delivery Speed</label>
                <select
                  value={shippingOption}
                  onChange={(e) => setShippingOption(e.target.value as any)}
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                >
                  {customer.state === 'Lagos' ? (
                    <>
                      <option value="lagos-standard">Lagos Standard (1-2 Days) — {cartTotal >= 100000 ? 'FREE' : '₦2,500'}</option>
                      <option value="lagos-express">Lagos Express Same-Day — ₦3,500</option>
                    </>
                  ) : customer.state === 'Diaspora' ? (
                    <option value="diaspora-dhl">DHL Express Diaspora — ₦35,000</option>
                  ) : (
                    <option value="nationwide">Nationwide Courier (2-4 Days) — ₦6,500</option>
                  )}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold uppercase tracking-wider mb-1 text-[#1A1615] dark:text-[#FAF7F2]">Delivery Street Address *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Plot number, street name, estate, landmarks..."
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 space-y-4">
            <h2 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] text-xs flex items-center justify-center">2</span>
              <span>Select Payment Method</span>
            </h2>

            <div className="space-y-3">
              {/* Paystack Card */}
              <label className={`flex items-start gap-3 p-3.5 border rounded cursor-pointer transition-colors ${paymentMethod === 'paystack' ? 'border-[#A36B40] bg-[#FAF7F2] dark:bg-[#251F1B]' : 'border-[#E8DFD5] dark:border-[#3B3029]'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'paystack'}
                  onChange={() => setPaymentMethod('paystack')}
                  className="mt-1 accent-[#A36B40]"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#A36B40]" />
                      <span>Paystack Instant Debit Card / Apple Pay</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">Zero Surcharge</span>
                  </div>
                  <p className="text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">
                    Supports Nigerian Naira MasterCards, Visa, Verve & diaspora international credit cards.
                  </p>
                </div>
              </label>

              {/* Direct Bank Transfer */}
              <label className={`flex items-start gap-3 p-3.5 border rounded cursor-pointer transition-colors ${paymentMethod === 'bank-transfer' ? 'border-[#A36B40] bg-[#FAF7F2] dark:bg-[#251F1B]' : 'border-[#E8DFD5] dark:border-[#3B3029]'}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bank-transfer'}
                  onChange={() => setPaymentMethod('bank-transfer')}
                  className="mt-1 accent-[#A36B40]"
                />
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#A36B40]" />
                      <span>Direct Nigerian Bank Transfer (Virtual Account)</span>
                    </span>
                  </div>
                  <p className="text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">
                    Providus Bank · Account: 9028471928 · Browndilux Guild Escrow.
                  </p>
                </div>
              </label>

              {/* Cash On Delivery (Lagos only) */}
              {customer.state === 'Lagos' && (
                <label className={`flex items-start gap-3 p-3.5 border rounded cursor-pointer transition-colors ${paymentMethod === 'cash-on-delivery' ? 'border-[#A36B40] bg-[#FAF7F2] dark:bg-[#251F1B]' : 'border-[#E8DFD5] dark:border-[#3B3029]'}`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cash-on-delivery'}
                    onChange={() => setPaymentMethod('cash-on-delivery')}
                    className="mt-1 accent-[#A36B40]"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-[#A36B40]" />
                        <span>Pay on Delivery (Lagos Island & Mainland Only)</span>
                      </span>
                    </div>
                    <p className="text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">
                      Inspect stitch quality upon arrival. Pay dispatch rider via POS or transfer.
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Right Summary: Order Items & Pay Button (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2] pb-3 border-b border-[#E8DFD5] dark:border-[#3B3029]">
              Ensemble Summary ({cart.length})
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-16 object-cover rounded bg-[#F4EFEA]"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif font-medium text-[#1A1615] dark:text-[#FAF7F2] line-clamp-1">{item.product.name}</h4>
                    <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">Size: {item.selectedSize}</p>
                    <p className="font-semibold text-[#1A1615] dark:text-[#FAF7F2] mt-1">{formatNaira(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029] space-y-2 text-xs">
              <div className="flex justify-between text-[#6B635B] dark:text-[#B8ADA3]">
                <span>Marketplace Subtotal</span>
                <span>{formatNaira(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-[#6B635B] dark:text-[#B8ADA3]">
                <span>Delivery ({customer.state})</span>
                <span>{shippingCost === 0 ? 'FREE' : formatNaira(shippingCost)}</span>
              </div>
              <div className="pt-2 border-t border-[#E8DFD5] dark:border-[#3B3029] flex justify-between font-serif text-lg font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                <span>Total Amount Due</span>
                <span>{formatNaira(finalTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'Verifying with Paystack...' : `Confirm & Pay ${formatNaira(finalTotal)}`}</span>
            </button>

            {/* Direct WhatsApp Checkout Option */}
            <button
              type="button"
              onClick={handleDirectWhatsAppCheckout}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 flex-shrink-0" />
              <span>Checkout Order on WhatsApp · {formatNaira(finalTotal)}</span>
            </button>

            <div className="text-[11px] text-center text-[#6B635B] dark:text-[#B8ADA3] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Authentic Nigerian Guild Return & Fit Guarantee</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
