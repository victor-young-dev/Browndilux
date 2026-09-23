import { describe, it, expect } from 'vitest';
import { 
  formatNaira, 
  generateWhatsAppUrl, 
  generateProductWhatsAppMessage, 
  generateOrderReceiptWhatsAppMessage,
  BROWNDILUX_WHATSAPP_NUMBER 
} from './formatters';

describe('formatters', () => {
  it('correctly formats Nigerian Naira numbers with comma separation', () => {
    expect(formatNaira(8500)).toBe('₦8,500');
    expect(formatNaira(64500)).toBe('₦64,500');
    expect(formatNaira(120000)).toBe('₦120,000');
    expect(formatNaira(0)).toBe('₦0');
  });

  it('generates a valid WhatsApp API url with encoded text', () => {
    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, 'Hello Browndilux!');
    expect(url).toContain('https://wa.me/2348136132727');
    expect(url).toContain('text=Hello%20Browndilux!');
  });

  it('generates product specific WhatsApp inquiry with SKU and size', () => {
    const message = generateProductWhatsAppMessage(
      'Osumare Cocoa Adire Co-Ord',
      64500,
      'Large',
      'Oduwa Abeokuta Atelier',
      'BDL-001'
    );

    expect(message).toContain('Osumare Cocoa Adire Co-Ord');
    expect(message).toContain('₦64,500');
    expect(message).toContain('Large');
    expect(message).toContain('Oduwa Abeokuta Atelier');
    expect(message).toContain('BDL-001');
  });

  it('generates complete order receipt for Lagos delivery', () => {
    const receipt = generateOrderReceiptWhatsAppMessage(
      'BDL-99882',
      'Chidi Okonjo',
      [{ name: 'Osumare Cocoa Adire Co-Ord', size: 'M', qty: 1, price: 64500 }],
      67000,
      'paystack',
      'Lagos'
    );

    expect(receipt).toContain('BDL-99882');
    expect(receipt).toContain('Chidi Okonjo');
    expect(receipt).toContain('₦67,000');
    expect(receipt).toContain('Lagos');
  });
});
