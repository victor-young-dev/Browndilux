import { describe, it, expect } from 'vitest';
import { computeAnalytics } from './analyticsService';
import { Product, Order } from '../types';

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Item 1',
    subtitle: 'Sub 1',
    price: 10000,
    category: 'heritage-traditional',
    fabric: 'Adire Eleko / Batik',
    fitType: 'unisex',
    vendorId: 'v1',
    vendorName: 'Vendor 1',
    vendorLocation: 'Lagos',
    description: 'Desc',
    craftDetails: ['Detail 1'],
    images: ['img1.jpg'],
    colorPalette: [{ name: 'Earth', hex: '#000' }],
    availableSizes: ['M', 'L'],
    stock: 5,
    rating: 4.8,
    reviewCount: 10,
    tags: ['tag1']
  },
  {
    id: 'p2',
    name: 'Item 2',
    subtitle: 'Sub 2',
    price: 20000,
    category: 'corporate-fusion',
    fabric: 'Senator Cashmere / Wool',
    fitType: 'men',
    vendorId: 'v2',
    vendorName: 'Vendor 2',
    vendorLocation: 'Abuja',
    description: 'Desc 2',
    craftDetails: ['Detail 2'],
    images: ['img2.jpg'],
    colorPalette: [{ name: 'Navy', hex: '#000' }],
    availableSizes: ['L', 'XL'],
    stock: 2,
    rating: 4.9,
    reviewCount: 8,
    tags: ['tag2']
  }
];

const mockOrders: Order[] = [
  {
    id: 'o1',
    reference: 'BDL-001',
    customerName: 'Test Customer',
    customerEmail: 'test@example.com',
    customerPhone: '+2348000000000',
    deliveryState: 'Lagos',
    shippingAddress: '123 Victoria Island',
    shippingOption: 'lagos-standard',
    shippingCost: 2500,
    paymentMethod: 'paystack',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    items: [
      {
        productId: 'p1',
        productName: 'Item 1',
        size: 'M',
        quantity: 2,
        unitPrice: 10000,
        totalPrice: 20000
      }
    ],
    subtotal: 20000,
    total: 22500,
    createdAt: new Date().toISOString(),
    whatsappMessage: 'receipt'
  }
];

describe('analyticsService', () => {
  it('computes sales revenue, orders count, and AOV correctly', () => {
    const analytics = computeAnalytics(mockProducts, mockOrders);
    expect(analytics.totalOrders).toBe(1);
    expect(analytics.totalRevenue).toBe(22500);
    expect(analytics.avgOrderValue).toBe(22500);
  });

  it('computes category share and product counts correctly', () => {
    const analytics = computeAnalytics(mockProducts, mockOrders);
    expect(analytics.topCategories.length).toBeGreaterThan(0);
    const adireCat = analytics.topCategories.find(c => c.category === 'Adire Renaissance');
    expect(adireCat).toBeDefined();
    expect(adireCat?.share).toBe(42);
    expect(adireCat?.revenue).toBeGreaterThan(0);
  });
});
