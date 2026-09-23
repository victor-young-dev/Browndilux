import { AnalyticsSummary, Order, Product } from '../types';

const STORAGE_KEY_ORDERS = 'browndilux_orders';
const STORAGE_KEY_INVENTORY = 'browndilux_inventory_overrides';

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading orders from storage:', e);
  }

  // Initial seed orders for realistic sales demonstration
  return [
    {
      id: 'ord-1001',
      reference: 'BDL-98421',
      customerName: 'Adebayo Adeleke',
      customerEmail: 'adebayo.a@gmail.com',
      customerPhone: '+234 803 456 7890',
      deliveryState: 'Lagos',
      shippingAddress: '14 Admiralty Way, Lekki Phase 1, Lagos',
      shippingOption: 'lagos-express',
      shippingCost: 3500,
      paymentMethod: 'paystack',
      paymentStatus: 'paid',
      orderStatus: 'in-workshop',
      items: [
        {
          productId: 'prod-senator-deconstructed-sand',
          productName: 'The Alara Deconstructed Senator Tunic',
          size: '42 / L',
          quantity: 1,
          unitPrice: 78000,
          totalPrice: 78000
        },
        {
          productId: 'prod-leather-belt-tan',
          productName: 'Benin Foundry Brass & Full-Grain Leather Belt',
          size: '34-36',
          quantity: 1,
          unitPrice: 8500,
          totalPrice: 8500
        }
      ],
      subtotal: 86500,
      total: 90000,
      createdAt: '2026-09-22T14:30:00.000Z',
      whatsappMessage: 'Order BDL-98421 confirmed via Paystack. Tailoring underway at Danbello Wuse II workshop.'
    },
    {
      id: 'ord-1002',
      reference: 'BDL-98422',
      customerName: 'Chiamaka Nnamani',
      customerEmail: 'chiamaka.n@outlook.com',
      customerPhone: '+234 812 345 6789',
      deliveryState: 'Abuja',
      shippingAddress: 'Plot 412 Maitama Hills, Abuja FCT',
      shippingOption: 'nationwide',
      shippingCost: 6500,
      paymentMethod: 'bank-transfer',
      paymentStatus: 'verified',
      orderStatus: 'quality-check',
      items: [
        {
          productId: 'prod-adire-coord-cocoa',
          productName: 'Osumare Cocoa Adire Co-Ord Set',
          size: 'M',
          quantity: 1,
          unitPrice: 64500,
          totalPrice: 64500
        }
      ],
      subtotal: 64500,
      total: 71000,
      createdAt: '2026-09-21T09:15:00.000Z',
      whatsappMessage: 'Order BDL-98422 bank transfer confirmed. Finished QC at Oduwa Abeokuta studio.'
    },
    {
      id: 'ord-1003',
      reference: 'BDL-98423',
      customerName: 'Tunde Bakare',
      customerEmail: 'tunde.b@diaspora.co.uk',
      customerPhone: '+44 7700 900123',
      deliveryState: 'Diaspora',
      shippingAddress: '42 Kensington High St, London W8 4PE, UK',
      shippingOption: 'diaspora-dhl',
      shippingCost: 35000,
      paymentMethod: 'paystack',
      paymentStatus: 'paid',
      orderStatus: 'dispatched',
      items: [
        {
          productId: 'prod-asooke-bomber-copper',
          productName: 'Iseyin Handwoven Aso-Oke Varsity Bomber',
          size: 'L',
          quantity: 1,
          unitPrice: 128000,
          totalPrice: 128000
        }
      ],
      subtotal: 128000,
      total: 163000,
      createdAt: '2026-09-20T17:45:00.000Z',
      whatsappMessage: 'Order BDL-98423 dispatched via DHL Express. Tracking air waybill sent to WhatsApp.'
    }
  ];
}

export function saveOrder(order: Order): void {
  try {
    const orders = getStoredOrders();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save order to storage:', e);
  }
}

export function updateOrderStatus(orderId: string, status: Order['orderStatus']): void {
  try {
    const orders = getStoredOrders();
    const target = orders.find(o => o.id === orderId);
    if (target) {
      target.orderStatus = status;
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
    }
  } catch (e) {
    console.error('Failed to update order status:', e);
  }
}

export function getInventoryOverrides(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INVENTORY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading inventory overrides:', e);
  }
  return {};
}

export function updateProductStock(productId: string, newStock: number): void {
  try {
    const current = getInventoryOverrides();
    current[productId] = Math.max(0, newStock);
    localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(current));
  } catch (e) {
    console.error('Failed saving inventory override:', e);
  }
}

export function computeAnalytics(products: Product[], orders: Order[]): AnalyticsSummary {
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.paymentStatus !== 'pending' ? ord.total : 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const whatsappInquiries = 246 + totalOrders * 3; // Realistic conversion ratio

  const categoryMap: Record<string, number> = {
    'Adire Renaissance': 42,
    'Deconstructed Senator': 28,
    'Aso-Oke Outerwear': 18,
    'Artisanal Leather': 12
  };

  const topCategories = Object.entries(categoryMap).map(([category, share]) => ({
    category,
    share,
    revenue: Math.round(totalRevenue * (share / 100))
  }));

  return {
    totalRevenue,
    totalOrders,
    avgOrderValue,
    whatsappInquiries,
    activeVendors: 5,
    topCategories,
    recentOrders: orders.slice(0, 10)
  };
}
