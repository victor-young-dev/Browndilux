export const BROWNDILUX_WHATSAPP_NUMBER = '2348136132727';

export function formatNaira(amount: number): string {
  if (isNaN(amount)) return '₦0';
  return '₦' + Math.round(amount).toLocaleString('en-NG');
}

export function generateWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export function generateProductWhatsAppMessage(
  productName: string,
  price: number,
  size?: string,
  makerName?: string,
  reference?: string
): string {
  const refCode = reference || `BDL-${Math.floor(1000 + Math.random() * 9000)}`;
  return [
    `Hello Browndilux Concierge! 🇳🇬✨`,
    `I would like to order / inquire about this piece:`,
    `• Product: ${productName}`,
    `• Price: ${formatNaira(price)}`,
    size ? `• Selected Size: ${size}` : '',
    makerName ? `• Artisan Maker: ${makerName}` : '',
    `• Reference: ${refCode}`,
    ``,
    `Please confirm workshop turnaround time and delivery options. Thank you!`
  ].filter(Boolean).join('\n');
}

export function generateOrderReceiptWhatsAppMessage(
  orderRef: string,
  customerName: string,
  items: { name: string; size: string; qty: number; price: number }[],
  total: number,
  paymentMethod: string,
  deliveryState: string
): string {
  const itemList = items.map(i => `  • ${i.name} (${i.size}) x${i.qty} - ${formatNaira(i.price)}`).join('\n');
  return [
    `🇳🇬 *Browndilux Order Confirmation* [${orderRef}]`,
    `Customer: ${customerName}`,
    `Delivery Region: ${deliveryState}`,
    `Payment Method: ${paymentMethod.toUpperCase()}`,
    ``,
    `*Items:*`,
    itemList,
    ``,
    `*Total Paid / Due:* ${formatNaira(total)}`,
    ``,
    `Please confirm reception and notify me when dispatch begins. Thank you!`
  ].join('\n');
}

export function generatePrivateStylingWhatsAppMessage(data: {
  name: string;
  occasion: string;
  fabricPreference: string;
  budgetRange: string;
  notes?: string;
}): string {
  return [
    `✨ *Browndilux Bespoke Private Styling Request*`,
    `Name: ${data.name}`,
    `Occasion: ${data.occasion}`,
    `Fabric Interest: ${data.fabricPreference}`,
    `Budget Target: ${data.budgetRange}`,
    data.notes ? `Client Notes: ${data.notes}` : '',
    ``,
    `Looking forward to meeting my dedicated Browndilux stylist for fabric sourcing and tailor allocation!`
  ].filter(Boolean).join('\n');
}

export function generateCatalogInquiryWhatsAppMessage(category?: string): string {
  return [
    `🇳🇬 *Browndilux Full Catalog & Artisan Collection Inquiry*`,
    `Hello Browndilux Atelier!`,
    `I am browsing your artisan marketplace${category && category !== 'all' ? ` (specifically looking at ${category})` : ''}.`,
    ``,
    `Could you please share:`,
    `1. Your latest full collection catalog & lookbook (PDF)`,
    `2. Current custom bespoke measurement slots`,
    `3. Available textile swatches (Aso-Oke, Adire, Senator wools)`,
    ``,
    `I would like to place an order directly with the workshop. Thank you!`
  ].join('\n');
}

export function generateCartWhatsAppCheckoutMessage(
  items: { productName: string; size: string; color?: string; quantity: number; unitPrice: number; vendorName?: string }[],
  total: number,
  customerName?: string
): string {
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const formattedItems = items.map((item, idx) => {
    const lineTotal = item.unitPrice * item.quantity;
    return `${idx + 1}. *${item.productName}*\n   • Size: ${item.size}${item.color ? ` | Color: ${item.color}` : ''}\n   • Qty: ${item.quantity} × ${formatNaira(item.unitPrice)} = *${formatNaira(lineTotal)}*\n   • Maker: ${item.vendorName || 'Artisan Workshop'}`;
  }).join('\n\n');

  return [
    `🇳🇬 *BROWNDILUX ATELIER — SHOPPING BAG ORDER*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    customerName ? `*Patron:* ${customerName}` : `*Order Date:* ${dateStr}`,
    `*Order Date:* ${dateStr}`,
    ``,
    `*Selected Items (${items.length}):*`,
    formattedItems,
    ``,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `*Bag Subtotal:* ${formatNaira(total)}`,
    `*Estimated Nationwide Courier:* ~₦3,500 (Free in Lagos above ₦100k)`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `Hello Browndilux Concierge! I have selected these items from the store. Please confirm workshop availability, delivery timeline, and send payment/bank transfer details to finalize my order.`
  ].join('\n');
}
