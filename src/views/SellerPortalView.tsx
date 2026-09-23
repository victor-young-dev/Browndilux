import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory, FabricType } from '../types';
import { 
  Scissors, 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Package, 
  ArrowUpRight, 
  AlertCircle,
  Building,
  CreditCard
} from 'lucide-react';
import { formatNaira } from '../utils/formatters';

export const SellerPortalView: React.FC = () => {
  const { products, orders, addNewProduct, modifyOrderStatus, modifyStock, showToast, currentUser } = useShop();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

  // New product form state
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    category: 'heritage-traditional' as ProductCategory,
    fabric: 'Adire Eleko / Batik' as FabricType,
    price: 45000,
    stock: 8,
    fitType: 'unisex' as 'men' | 'women' | 'unisex',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    availableSizes: ['S', 'M', 'L', 'XL']
  });

  const atelierName = currentUser?.sellerDetails?.atelierName || 'Oduwa Heritage Clothiers';
  const workshopLocation = currentUser?.sellerDetails?.workshopLocation || 'Abeokuta, Ogun State';

  // Products belonging to this atelier
  const atelierProducts = products.filter(
    p => p.vendorName.toLowerCase().includes('oduwa') || p.vendorName === atelierName
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProd: Product = {
      id: `prod-artisan-${Date.now()}`,
      name: formData.name,
      subtitle: formData.subtitle || `${formData.fabric} handcrafted ensemble`,
      price: Number(formData.price),
      category: formData.category,
      fabric: formData.fabric,
      vendorId: 'vendor-1',
      vendorName: atelierName,
      vendorLocation: workshopLocation,
      images: [formData.imageUrl],
      description: formData.description || 'Mastercrafted garment using verified Nigerian artisanal techniques.',
      craftDetails: [
        '100% locally sourced premium cotton/silk',
        'Hand-cut and assembled in Abeokuta workshop',
        'Reinforced bar-tacking and hand-finished seams'
      ],
      availableSizes: formData.availableSizes,
      stock: Number(formData.stock),
      rating: 5.0,
      reviewCount: 1,
      tags: ['New Release', formData.fabric, 'Artisan Guild'],
      fitType: formData.fitType,
      colorPalette: [{ name: 'Artisan Natural', hex: '#6B4A38' }]
    };

    addNewProduct(newProd);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      subtitle: '',
      category: 'heritage-traditional',
      fabric: 'Adire Eleko / Batik',
      price: 45000,
      stock: 8,
      fitType: 'unisex',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      availableSizes: ['S', 'M', 'L', 'XL']
    });
  };

  const handleRequestPayout = () => {
    setIsPayoutModalOpen(false);
    showToast('Payout request for ₦485,000 sent to Providus Bank. Clears in 2 hours via NIBSS.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      {/* Atelier Banner Header */}
      <div className="bg-[#F4EFEA] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
            <Scissors className="w-4 h-4" />
            <span>Artisan Workshop Hub</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1 text-balance">
            {atelierName}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span>{workshopLocation}</span>
            <span>·</span>
            <span className="text-emerald-600 font-medium">Verified Master Guild</span>
            <span>·</span>
            <span>24 Active Weavers & Tailors</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="py-2.5 px-4 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Garment</span>
          </button>

          <button
            onClick={() => setIsPayoutModalOpen(true)}
            className="py-2.5 px-4 border border-[#3D2B1F]/30 dark:border-[#E8DFD5]/30 hover:border-[#A36B40] text-xs font-semibold text-[#1A1615] dark:text-[#FAF7F2] uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CreditCard className="w-4 h-4 text-[#A36B40]" />
            <span>Withdraw ₦485,000</span>
          </button>
        </div>
      </div>

      {/* Workshop Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs">
          <div className="flex items-center justify-between text-[#6B635B] dark:text-[#B8ADA3] mb-2 text-xs">
            <span>Workshop Sales (30 Days)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-3xl font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
            {formatNaira(1240000)}
          </div>
          <p className="text-[11px] text-emerald-600 mt-1 font-medium">+18% vs last lunar batch</p>
        </div>

        <div className="p-6 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs">
          <div className="flex items-center justify-between text-[#6B635B] dark:text-[#B8ADA3] mb-2 text-xs">
            <span>Pending Workshop Tailoring</span>
            <Clock className="w-4 h-4 text-[#A36B40]" />
          </div>
          <div className="font-serif text-3xl font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
            4 Orders
          </div>
          <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-1">2 in cutting · 2 in stitching</p>
        </div>

        <div className="p-6 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs">
          <div className="flex items-center justify-between text-[#6B635B] dark:text-[#B8ADA3] mb-2 text-xs">
            <span>Active Guild Listings</span>
            <Package className="w-4 h-4 text-[#A36B40]" />
          </div>
          <div className="font-serif text-3xl font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
            {atelierProducts.length} SKUs
          </div>
          <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-1">Live on Browndilux storefront</p>
        </div>

        <div className="p-6 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs">
          <div className="flex items-center justify-between text-[#6B635B] dark:text-[#B8ADA3] mb-2 text-xs">
            <span>Pending Escrow Release</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-3xl font-semibold text-emerald-700 dark:text-emerald-400">
            {formatNaira(485000)}
          </div>
          <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-1">Ready for Providus Bank disbursement</p>
        </div>
      </div>

      {/* Workshop Catalog Management */}
      <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E8DFD5] dark:border-[#3B3029] flex items-center justify-between">
          <h2 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
            {atelierName} Active Inventory
          </h2>
          <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
            {atelierProducts.length} live garments
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1A1615] dark:text-[#FAF7F2]">
            <thead className="bg-[#FAF7F2] dark:bg-[#251F1B] text-[10px] uppercase tracking-wider text-[#6B635B] dark:text-[#B8ADA3] border-b border-[#E8DFD5] dark:border-[#3B3029]">
              <tr>
                <th className="py-3 px-4">Garment</th>
                <th className="py-3 px-4">Fabric</th>
                <th className="py-3 px-4">Price (₦)</th>
                <th className="py-3 px-4">Units in Workshop</th>
                <th className="py-3 px-4">Quick Adjust</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD5] dark:divide-[#3B3029]">
              {atelierProducts.map(prod => (
                <tr key={prod.id} className="hover:bg-[#FAF7F2]/50 dark:hover:bg-[#241E1A]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={prod.images[0]} 
                        alt={prod.name} 
                        className="w-10 h-12 object-cover rounded bg-[#F4EFEA]" 
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80'; }}
                      />
                      <div>
                        <p className="font-semibold line-clamp-1">{prod.name}</p>
                        <p className="text-[10px] text-[#6B635B] dark:text-[#B8ADA3]">{prod.availableSizes.join(', ')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{prod.fabric}</td>
                  <td className="py-3 px-4 font-semibold">{formatNaira(prod.price)}</td>
                  <td className="py-3 px-4 font-bold">{prod.stock}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => modifyStock(prod.id, Math.max(0, prod.stock - 1))}
                        className="px-2 py-0.5 border border-[#E8DFD5] dark:border-[#3B3029] hover:bg-[#A36B40] hover:text-white rounded"
                      >
                        -
                      </button>
                      <button
                        onClick={() => modifyStock(prod.id, prod.stock + 1)}
                        className="px-2 py-0.5 border border-[#E8DFD5] dark:border-[#3B3029] hover:bg-[#A36B40] hover:text-white rounded"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {prod.stock > 0 ? (
                      <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">Live & Ready</span>
                    ) : (
                      <span className="text-[10px] text-red-600 font-semibold uppercase tracking-wider">Sold Out</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white dark:bg-[#1A1615] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2] mb-1">
              Publish New Artisan Garment
            </h3>
            <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mb-6">
              Add your newly dyed or woven piece directly to Browndilux for instant shopper discovery.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                  Garment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanyan Bronze Handwoven Overshirt"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Fabric Medium *
                  </label>
                  <select
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value as FabricType })}
                    className="w-full p-2.5 bg-white dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                  >
                    <option value="Adire Eleko / Batik">Adire Eleko / Batik</option>
                    <option value="Aso-Oke">Aso-Oke Handwoven</option>
                    <option value="Senator Cashmere / Wool">Senator Cashmere / Wool</option>
                    <option value="Ankara Modern">Ankara Modern</option>
                    <option value="Raw Silk / Satin">Raw Silk / Satin</option>
                    <option value="Nigerian Genuine Leather">Nigerian Genuine Leather</option>
                    <option value="Linen Blend">Linen Blend</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Price in Naira (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    min={5000}
                    step={500}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Initial Workshop Stock *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                    Fit Silhouette
                  </label>
                  <select
                    value={formData.fitType}
                    onChange={(e) => setFormData({ ...formData, fitType: e.target.value as any })}
                    className="w-full p-2.5 bg-white dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                  >
                    <option value="unisex">Unisex Relaxed</option>
                    <option value="men">Men's Tailored</option>
                    <option value="women">Women's Sculpted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                  Lookbook Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8DFD5] dark:border-[#3B3029]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="py-2 px-4 border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#6B635B] dark:text-[#B8ADA3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-6 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payout Modal */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white dark:bg-[#1A1615] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-2xl p-6 space-y-4">
            <h3 className="font-serif text-xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
              Disburse Workshop Escrow
            </h3>
            <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
              Transfer available cleared sales balance of <strong>₦485,000</strong> to your registered Nigerian commercial bank.
            </p>

            <div className="p-3 bg-[#FAF7F2] dark:bg-[#251F1B] rounded border border-[#E8DFD5] dark:border-[#3B3029] text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#6B635B] dark:text-[#B8ADA3]">Beneficiary:</span>
                <span className="font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Oduwa Heritage Clothiers Ltd</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B635B] dark:text-[#B8ADA3]">Bank:</span>
                <span className="font-semibold text-[#1A1615] dark:text-[#FAF7F2]">Providus Bank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B635B] dark:text-[#B8ADA3]">Account Number:</span>
                <span className="font-mono text-[#1A1615] dark:text-[#FAF7F2]">5400291844</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsPayoutModalOpen(false)}
                className="py-2 px-3 text-xs text-[#6B635B] dark:text-[#B8ADA3]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRequestPayout}
                className="py-2 px-5 bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
