import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck, Check } from 'lucide-react';
import { 
  formatNaira, 
  generateWhatsAppUrl, 
  generateProductWhatsAppMessage, 
  generateCartWhatsAppCheckoutMessage,
  BROWNDILUX_WHATSAPP_NUMBER 
} from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartTotal, 
    currentUser,
    setCurrentView 
  } = useShop();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 100000;
  const difference = freeDeliveryThreshold - cartTotal;
  const progressPercent = Math.min(100, Math.round((cartTotal / freeDeliveryThreshold) * 100));

  const handleCheckoutNav = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
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
      cartTotal,
      currentUser?.name
    );
    
    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSingleItemWhatsApp = (item: typeof cart[0]) => {
    const text = generateProductWhatsAppMessage(
      item.product.name,
      item.product.price,
      item.selectedSize,
      item.product.vendorName,
      `BDL-${item.product.id.split('-').pop()}`
    );
    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] dark:bg-[#1A1615] border-l border-[#E8DFD5] dark:border-[#3B3029] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DFD5] dark:border-[#3B3029] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#A36B40]" />
              <h2 className="font-serif text-xl font-medium text-[#1A1615] dark:text-[#F6F2EC]">
                Your Shopping Bag ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615] dark:hover:text-white transition-colors"
              aria-label="Close Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F4EFEA] dark:bg-[#241E1A] p-4 border-b border-[#E8DFD5] dark:border-[#3B3029]">
            <p className="text-xs text-[#1A1615] dark:text-[#F6F2EC] mb-2 font-medium">
              {difference > 0 ? (
                <>
                  Add <strong className="text-[#A36B40] dark:text-[#C68A5E]">{formatNaira(difference)}</strong> more to qualify for <strong>Free Lagos Delivery</strong>
                </>
              ) : (
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  🎉 You have unlocked Free Lagos Delivery!
                </span>
              )}
            </p>
            <div className="w-full bg-[#E8DFD5] dark:bg-[#3B3029] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#A36B40] dark:bg-[#C68A5E] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8DFD5]/60 dark:bg-[#2B2420] flex items-center justify-center text-[#A36B40]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#F6F2EC]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-1 max-w-xs">
                    Explore contemporary Nigerian pieces curated from verified master artisans.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="py-2.5 px-6 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div 
                  key={item.id}
                  className="flex gap-4 p-3 bg-white dark:bg-[#221C18] border border-[#E8DFD5] dark:border-[#3B3029] rounded transition-all"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover object-top rounded bg-[#F4EFEA]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#1A1615] dark:text-[#F6F2EC] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#6B635B] dark:text-[#B8ADA3] hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">
                        Size: {item.selectedSize} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                      </p>
                      <p className="text-[11px] text-[#A36B40] dark:text-[#C68A5E]">
                        Maker: {item.product.vendorName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[#E8DFD5] dark:border-[#3B3029] rounded">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-xs text-[#1A1615] dark:text-[#F6F2EC] hover:bg-[#F4EFEA] dark:hover:bg-[#2B2420]"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-semibold text-[#1A1615] dark:text-[#F6F2EC]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-xs text-[#1A1615] dark:text-[#F6F2EC] hover:bg-[#F4EFEA] dark:hover:bg-[#2B2420]"
                          >
                            +
                          </button>
                        </div>

                        {/* Individual WhatsApp Order Shortcut */}
                        <button
                          onClick={() => handleSingleItemWhatsApp(item)}
                          className="p-1 text-[#25D366] hover:bg-[#25D366]/10 rounded transition-colors"
                          title="Order only this piece on WhatsApp"
                          aria-label="Order only this piece on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-serif text-sm font-semibold text-[#1A1615] dark:text-[#F6F2EC]">
                        {formatNaira(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#E8DFD5] dark:border-[#3B3029] bg-[#FAF7F2] dark:bg-[#1A1615] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6B635B] dark:text-[#B8ADA3]">
                <span>Estimated Subtotal ({cart.length} unique pieces)</span>
                <span className="font-serif text-lg font-semibold text-[#1A1615] dark:text-[#F6F2EC]">
                  {formatNaira(cartTotal)}
                </span>
              </div>
              <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3]">
                Taxes included. Delivery calculated at checkout (Lagos express from ₦2,500).
              </p>

              {/* Prominent WhatsApp Full Bag Checkout Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>Checkout Entire Bag on WhatsApp · {formatNaira(cartTotal)}</span>
              </button>

              <button
                onClick={handleCheckoutNav}
                className="w-full py-2.5 px-4 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] dark:hover:bg-[#C68A5E] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Standard Web Escrow Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] text-[#6B635B] dark:text-[#B8ADA3]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct Lagos Atelier Escrow & Quality Assurance</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
