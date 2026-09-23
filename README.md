# Browndilux — Contemporary Nigerian Multi-Vendor Fashion Guild

> **"Heritage Meets Modern Nigerian Style"**  
> An accessible-luxury fashion marketplace uniting verified artisan workshops across Abeokuta, Ibadan, Lagos, and Abuja. Featuring botanical Adire Eleko, handwoven narrow-loom Aso-Oke, modern deconstructed Senators, and artisanal Benin brass leathercraft.

---

## 🌟 Key Features

1. **Artisan Multi-Vendor Marketplace**:
   - Curated catalogs from 5 verified Nigerian maker workshops.
   - Transparent provenance tracking (Workshop location, lead master artisan, guild status).
   - Fast faceted filtering by traditional fabric, price in Naira (₦), gender/fit, and maker.
   - High-resolution, lazy-loaded visual lookbooks optimized for low-bandwidth cellular connections.

2. **AI Style Lab & Virtual Avatar Try-On**:
   - Customizable digital avatar with 5 authentic African melanin undertones (*Warm Honey*, *Rich Chestnut*, *Deep Bronze*, *Golden Olive*, *Dark Espresso*).
   - Interactive garment closet: Test tops, trousers, Aso-Oke bombers, and accessories in real time.
   - Powered by **Google Gemini AI** for cultural harmony evaluation, skin-tone matching, and Nigerian occasion suitability (*Owambe Wedding*, *Corporate Boardroom*, *Lekki Art Gala*, etc.).

3. **Nigerian Commerce & WhatsApp Concierge Integration**:
   - Deep WhatsApp integration routing inquiries and direct orders to `+234 813 613 2727`.
   - Automated Nigerian size charts with UK/US equivalencies and bespoke tailoring notes.
   - Multi-option checkout: Paystack card processing, Nigerian direct virtual account bank transfer, and Lagos Cash-On-Delivery.
   - Tiered delivery logic (Lagos Same-Day Express, Lagos Standard Free over ₦100k, Nationwide Courier, DHL International Diaspora).

4. **Marketplace Control Tower & Analytics**:
   - Real-time sales metrics (Gross Merchandise Value, Order count, Average Order Value, WhatsApp inquiry conversion rate).
   - Live workshop inventory management with instant stock adjustment controls.
   - Interactive order fulfillment pipeline (Received → In Workshop → Quality Check → Dispatched → Delivered).

5. **High-Concurrency Architecture & CI/CD**:
   - Production PostgreSQL database schema with optimistic row versioning (`version`) to eliminate overselling during flash drops.
   - Automated GitHub Actions CI/CD pipeline (`lint`, `unit tests`, `build`, bundle integrity verification).
   - Comprehensive test suite powered by Vitest.

---

## 🏗️ Architecture & Microservices Overview

Browndilux follows an event-driven, decoupled microservices model:

```
[ Client Browser / PWA ]
          │
          ├──> [ Storefront Service (React 19 + Tailwind CSS) ]
          │         │
          │         ├──> [ Catalog & Inventory Service ] (PostgreSQL with Row Locking + Redis)
          │         ├──> [ AI Style Lab Engine ] (Google Gemini 2.5/Flash API)
          │         ├──> [ WhatsApp Concierge Gateway ] (Twilio / Meta Graph API / Deep Link)
          │         └──> [ Payment & Escrow Webhook Service ] (Paystack / Flutterwave)
```

### High Concurrency & Inventory Locking
When multiple shoppers attempt to checkout a limited-edition artisan garment (e.g., a one-of-three handwoven Aso-Oke bomber), the catalog service leverages atomic optimistic row locking:
```sql
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE id = :productId AND stock >= 1 AND version = :expectedVersion;
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
# Clone the repository
git clone https://github.com/browndilux/marketplace.git
cd marketplace

# Install dependencies
npm install

# Run unit tests
npm test

# Run development server
npm run dev
```

### Environment Variables
Configure `.env` or set in your hosting platform:
```env
# Gemini API Key (Server side)
GEMINI_API_KEY="your-google-gemini-key"

# WhatsApp Business Concierge
VITE_WHATSAPP_NUMBER="2348136132727"
```

---

## 🧪 Testing

Browndilux includes automated test suites for currency calculation, WhatsApp link generation, and inventory aggregation:
```bash
npm test
```

To run lint checks:
```bash
npm run lint
```

To compile production assets:
```bash
npm run build
```
