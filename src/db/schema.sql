-- =========================================================================
-- BROWNDILUX NIGERIAN MULTI-VENDOR MARKETPLACE
-- PRODUCTION HIGH-CONCURRENCY DATABASE SCHEMA (POSTGRESQL 16+)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. VENDORS & ARTISAN GUILD TABLE
-- -------------------------------------------------------------------------
CREATE TABLE vendors (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lead_artisan VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    state VARCHAR(64) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    story TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    artisan_count INTEGER NOT NULL DEFAULT 1,
    verified BOOLEAN NOT NULL DEFAULT true,
    rating NUMERIC(3,2) NOT NULL DEFAULT 5.00,
    review_count INTEGER NOT NULL DEFAULT 0,
    phone_whatsapp VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_vendors_state ON vendors(state);
CREATE INDEX idx_vendors_verified ON vendors(verified);

-- -------------------------------------------------------------------------
-- 2. PRODUCTS & INVENTORY WITH OPTIMISTIC CONCURRENCY CONTROL (VERSIONING)
-- -------------------------------------------------------------------------
CREATE TABLE products (
    id VARCHAR(64) PRIMARY KEY,
    vendor_id VARCHAR(64) NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    name VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(64) NOT NULL,
    fabric VARCHAR(128) NOT NULL,
    fit_type VARCHAR(32) NOT NULL,
    price_kobo BIGINT NOT NULL, -- Stored in Kobo (e.g. 64,500 NGN = 6450000 kobo) to prevent rounding errors
    compare_at_price_kobo BIGINT,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    version INTEGER NOT NULL DEFAULT 1, -- Optimistic concurrency lock column
    is_new_arrival BOOLEAN DEFAULT false,
    is_best_seller BOOLEAN DEFAULT false,
    rating NUMERIC(3,2) NOT NULL DEFAULT 5.00,
    review_count INTEGER NOT NULL DEFAULT 0,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    color_palette JSONB NOT NULL DEFAULT '[]'::jsonb,
    available_sizes TEXT[] NOT NULL DEFAULT '{}',
    craft_details TEXT[] NOT NULL DEFAULT '{}',
    tags TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compound indexes for catalog search & filtering
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_fabric ON products(fabric);
CREATE INDEX idx_products_vendor ON products(vendor_id);
CREATE INDEX idx_products_price ON products(price_kobo);
CREATE INDEX idx_products_stock ON products(stock);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- GIN index for fast search queries across tags & full-text
CREATE INDEX idx_products_tags ON products USING GIN(tags);

-- -------------------------------------------------------------------------
-- 3. ORDERS & ESCROW TRANSACTIONS (IDEMPOTENCY ENFORCED)
-- -------------------------------------------------------------------------
CREATE TABLE orders (
    id VARCHAR(64) PRIMARY KEY,
    reference VARCHAR(64) UNIQUE NOT NULL, -- e.g. BDL-84920
    idempotency_key VARCHAR(128) UNIQUE NOT NULL, -- Prevents duplicate charges
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(32) NOT NULL,
    delivery_state VARCHAR(64) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_option VARCHAR(64) NOT NULL,
    shipping_cost_kobo BIGINT NOT NULL,
    subtotal_kobo BIGINT NOT NULL,
    total_kobo BIGINT NOT NULL,
    payment_method VARCHAR(64) NOT NULL, -- 'paystack' | 'bank-transfer' | 'cash-on-delivery'
    payment_status VARCHAR(32) NOT NULL DEFAULT 'pending',
    order_status VARCHAR(32) NOT NULL DEFAULT 'received',
    whatsapp_receipt_sent BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_reference ON orders(reference);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);

-- -------------------------------------------------------------------------
-- 4. ORDER LINE ITEMS
-- -------------------------------------------------------------------------
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(64) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(64) NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    vendor_id VARCHAR(64) NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
    selected_size VARCHAR(32) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price_kobo BIGINT NOT NULL,
    total_price_kobo BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);
CREATE INDEX idx_order_items_vendor ON order_items(vendor_id);

-- -------------------------------------------------------------------------
-- 5. ATOMIC INVENTORY DEDUCTION (STORED PROCEDURE WITH ROW LOCKING)
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION deduct_product_inventory(
    p_product_id VARCHAR,
    p_quantity INTEGER,
    p_expected_version INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
    v_rows_updated INTEGER;
BEGIN
    -- Atomic decrement checking stock availability and optimistic version lock
    UPDATE products
    SET 
        stock = stock - p_quantity,
        version = version + 1,
        updated_at = NOW()
    WHERE 
        id = p_product_id 
        AND stock >= p_quantity
        AND version = p_expected_version;

    GET DIAGNOSTICS v_rows_updated = ROW_COUNT;

    IF v_rows_updated = 1 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;
