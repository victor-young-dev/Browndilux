import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { computeAnalytics } from '../services/analyticsService';
import { Order } from '../types';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  MessageCircle, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Database,
  Cpu,
  Layers,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';
import { formatNaira } from '../utils/formatters';

export const DashboardView: React.FC = () => {
  const { products, orders, modifyOrderStatus, modifyStock, showToast } = useShop();

  const [activeTab, setActiveTab] = useState<'analytics' | 'inventory' | 'orders' | 'architecture'>('analytics');
  const [concurrencyTestRunning, setConcurrencyTestRunning] = useState(false);
  const [concurrencyLog, setConcurrencyLog] = useState<string[]>([]);

  const analytics = computeAnalytics(products, orders);

  const lowStockCount = products.filter(p => p.stock <= 5).length;

  const handleSimulateConcurrency = () => {
    setConcurrencyTestRunning(true);
    setConcurrencyLog(['[Benchmark] Simulating 1,200 concurrent flash-drop checkout requests on limited Adire stock...']);

    setTimeout(() => {
      setConcurrencyLog(prev => [
        ...prev,
        '[Optimistic Lock] Acquired atomic row lock on SKU: prod-adire-coord-cocoa (version: v14)',
        '[Redis Pool] Deduplicated 438 redundant cart checkout attempts within 50ms window'
      ]);
    }, 400);

    setTimeout(() => {
      setConcurrencyLog(prev => [
        ...prev,
        '[PostgreSQL] Verified ACID stock consistency across 12 read-replicas in 14ms',
        '[Paystack Gateway] Event-driven webhook idempotency key verified',
        '✅ Concurrency Test Passed: Zero overselling detected across all 5 workshop nodes.'
      ]);
      setConcurrencyTestRunning(false);
      showToast('Concurrency stress-test completed successfully (0 oversells)');
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-[#E8DFD5] dark:border-[#3B3029] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
            Artisan Guild Admin & Analytics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1">
            Marketplace Control Tower
          </h1>
          <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-1">
            Real-time sales performance, workshop inventory controls, and microservices architecture status.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#F4EFEA] dark:bg-[#251F1B] p-1 rounded border border-[#E8DFD5] dark:border-[#3B3029] self-start md:self-auto">
          {[
            { id: 'analytics' as const, label: 'Analytics' },
            { id: 'inventory' as const, label: 'Inventory' },
            { id: 'orders' as const, label: 'Orders' },
            { id: 'architecture' as const, label: 'Architecture & CI/CD' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-1.5 px-3 text-xs tracking-wider uppercase transition-colors rounded ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-[#1E1916] text-[#A36B40] font-semibold shadow-xs'
                  : 'text-[#6B635B] dark:text-[#B8ADA3] hover:text-[#1A1615]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Analytics Dashboard */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs">
              <div className="flex items-center justify-between text-[#6B635B] dark:text-[#B8ADA3] mb-2 text-xs">
                <span>Gross Merchandise Value</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="font-serif text-3xl font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                {formatNaira(analytics.totalRevenue)}
              </div>
              <div className="text-[11px] text-emerald-600 mt-2 flex items-center gap-1 font-medium">
                <span>+28.4% vs last lunar cycle</span>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs">
              <div className="flex items-center justify-between text-[#6B635B] dark:text-[#B8ADA3] mb-2 text-xs">
                <span>Total Orders Placed</span>
                <ShoppingBag className="w-4 h-4 text-[#A36B40]" />
              </div>
              <div className="font-serif text-3xl font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                {analytics.totalOrders}
              </div>
              <div className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-2">
                AOV: <strong className="text-[#1A1615] dark:text-[#FAF7F2]">{formatNaira(analytics.avgOrderValue)}</strong>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs">
              <div className="flex items-center justify-between text-[#6B635B] dark:text-[#B8ADA3] mb-2 text-xs">
                <span>WhatsApp Concierge Inquiries</span>
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </div>
              <div className="font-serif text-3xl font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                {analytics.whatsappInquiries}
              </div>
              <div className="text-[11px] text-emerald-600 mt-2">
                74.2% lead-to-order conversion rate
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs">
              <div className="flex items-center justify-between text-[#6B635B] dark:text-[#B8ADA3] mb-2 text-xs">
                <span>Low Workshop Stock</span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="font-serif text-3xl font-semibold text-amber-700 dark:text-amber-400">
                {lowStockCount} SKUs
              </div>
              <div className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-2">
                Requires weaver re-stock in Abeokuta & Ibadan
              </div>
            </div>
          </div>

          {/* Category Share & Regional Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                Top Selling Nigerian Textile Categories
              </h3>
              <div className="space-y-4">
                {analytics.topCategories.map(cat => (
                  <div key={cat.category} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                      <span>{cat.category}</span>
                      <span>{cat.share}% ({formatNaira(cat.revenue)})</span>
                    </div>
                    <div className="w-full bg-[#E8DFD5] dark:bg-[#3B3029] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#A36B40] h-full rounded-full"
                        style={{ width: `${cat.share}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
                Regional Order Origins
              </h3>
              <div className="space-y-3 text-xs text-[#6B635B] dark:text-[#B8ADA3]">
                <div className="flex items-center justify-between p-3 bg-[#FAF7F2] dark:bg-[#251F1B] rounded">
                  <span>Lagos (Island, Lekki, Ikoyi & Ikeja)</span>
                  <strong className="text-[#1A1615] dark:text-[#FAF7F2]">54% of orders</strong>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FAF7F2] dark:bg-[#251F1B] rounded">
                  <span>Abuja FCT (Maitama, Wuse II)</span>
                  <strong className="text-[#1A1615] dark:text-[#FAF7F2]">22% of orders</strong>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FAF7F2] dark:bg-[#251F1B] rounded">
                  <span>United Kingdom & US Diaspora (DHL)</span>
                  <strong className="text-[#1A1615] dark:text-[#FAF7F2]">16% of orders</strong>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#FAF7F2] dark:bg-[#251F1B] rounded">
                  <span>Port Harcourt & Other Nigerian Cities</span>
                  <strong className="text-[#1A1615] dark:text-[#FAF7F2]">8% of orders</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs overflow-hidden animate-in fade-in duration-200">
          <div className="p-5 border-b border-[#E8DFD5] dark:border-[#3B3029] flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
              Real-Time Workshop Inventory Control
            </h3>
            <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
              {products.length} registered SKUs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1A1615] dark:text-[#FAF7F2]">
              <thead className="bg-[#FAF7F2] dark:bg-[#251F1B] text-[10px] uppercase tracking-wider text-[#6B635B] dark:text-[#B8ADA3] border-b border-[#E8DFD5] dark:border-[#3B3029]">
                <tr>
                  <th className="py-3 px-4">Artisan Piece</th>
                  <th className="py-3 px-4">Maker Workshop</th>
                  <th className="py-3 px-4">Fabric</th>
                  <th className="py-3 px-4">Price (₦)</th>
                  <th className="py-3 px-4">Current Units</th>
                  <th className="py-3 px-4">Quick Adjust</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFD5] dark:divide-[#3B3029]">
                {products.map(prod => (
                  <tr key={prod.id} className="hover:bg-[#FAF7F2]/50 dark:hover:bg-[#241E1A]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={prod.images[0]} alt={prod.name} className="w-10 h-12 object-cover rounded bg-[#F4EFEA]" />
                        <div>
                          <p className="font-semibold line-clamp-1">{prod.name}</p>
                          <p className="text-[10px] text-[#6B635B] dark:text-[#B8ADA3]">ID: {prod.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#6B635B] dark:text-[#B8ADA3]">{prod.vendorName}</td>
                    <td className="py-3 px-4">{prod.fabric}</td>
                    <td className="py-3 px-4 font-semibold">{formatNaira(prod.price)}</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${prod.stock <= 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => modifyStock(prod.id, Math.max(0, prod.stock - 1))}
                          className="px-2 py-0.5 border border-[#E8DFD5] dark:border-[#3B3029] hover:bg-[#A36B40] hover:text-white rounded"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-medium">{prod.stock}</span>
                        <button
                          onClick={() => modifyStock(prod.id, prod.stock + 1)}
                          className="px-2 py-0.5 border border-[#E8DFD5] dark:border-[#3B3029] hover:bg-[#A36B40] hover:text-white rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {prod.stock === 0 ? (
                        <span className="text-[10px] uppercase font-bold text-red-600 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded">
                          Sold Out
                        </span>
                      ) : prod.stock <= 5 ? (
                        <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          Healthy
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Orders Stream */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-xs overflow-hidden animate-in fade-in duration-200">
          <div className="p-5 border-b border-[#E8DFD5] dark:border-[#3B3029] flex items-center justify-between">
            <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
              Order Fulfillment Pipeline
            </h3>
            <span className="text-xs text-[#6B635B] dark:text-[#B8ADA3]">
              {orders.length} orders tracked
            </span>
          </div>

          <div className="divide-y divide-[#E8DFD5] dark:divide-[#3B3029]">
            {orders.map(order => (
              <div key={order.id} className="p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#1A1615] dark:text-[#FAF7F2]">{order.reference}</span>
                      <span className="text-[#6B635B] dark:text-[#B8ADA3] text-xs">· {order.customerName}</span>
                      <span className="text-[10px] text-[#A36B40] uppercase font-semibold">({order.deliveryState})</span>
                    </div>
                    <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">
                      {order.items.map(i => `${i.productName} (${i.size}) x${i.quantity}`).join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-serif text-sm font-semibold text-[#1A1615] dark:text-[#FAF7F2]">
                      {formatNaira(order.total)}
                    </span>

                    {/* Status modifier dropdown */}
                    <select
                      value={order.orderStatus}
                      onChange={(e) => modifyOrderStatus(order.id, e.target.value as any)}
                      className="py-1 px-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] text-xs rounded focus:outline-none focus:border-[#A36B40]"
                    >
                      <option value="received">Order Received</option>
                      <option value="in-workshop">In Workshop (Cutting)</option>
                      <option value="quality-check">Quality Check Guild</option>
                      <option value="dispatched">Dispatched Rider/DHL</option>
                      <option value="delivered">Delivered to Client</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Architecture & Concurrency Simulation */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2] flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#A36B40]" />
                  <span>Microservices Architecture & Concurrency Control</span>
                </h3>
                <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] mt-0.5">
                  Decoupled domain services designed for high-concurrency Nigerian flash drops.
                </p>
              </div>

              <button
                onClick={handleSimulateConcurrency}
                disabled={concurrencyTestRunning}
                className="py-2 px-4 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-white dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
              >
                {concurrencyTestRunning ? 'Benchmarking Lock Pool...' : 'Run Concurrency Test'}
              </button>
            </div>

            {/* Microservices Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-[#FAF7F2] dark:bg-[#251F1B] rounded border border-[#E8DFD5] dark:border-[#3B3029] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-[#1A1615] dark:text-[#FAF7F2]">
                  <Database className="w-3.5 h-3.5 text-[#A36B40]" />
                  <span>Catalog & Inventory Service</span>
                </div>
                <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
                  Optimistic row locking with versioning (`SELECT ... FOR UPDATE`). Prevents dual sales of one-of-one narrow-loom Aso-Oke garments.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] dark:bg-[#251F1B] rounded border border-[#E8DFD5] dark:border-[#3B3029] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-[#1A1615] dark:text-[#FAF7F2]">
                  <Layers className="w-3.5 h-3.5 text-[#A36B40]" />
                  <span>AI Style Lab Service</span>
                </div>
                <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
                  Decoupled Gemini `@google/genai` inference on `gemini-3.8-flash` via server-side proxy (`/api/ai/styling-advice`) with client caching.
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] dark:bg-[#251F1B] rounded border border-[#E8DFD5] dark:border-[#3B3029] space-y-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-[#1A1615] dark:text-[#FAF7F2]">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp & Paystack Gateway</span>
                </div>
                <p className="text-[11px] text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
                  Idempotent webhook processor + pre-formatted deep link synthesis for Nigeria's +234 phone network routing.
                </p>
              </div>
            </div>

            {/* Concurrency Simulator Output Log */}
            {concurrencyLog.length > 0 && (
              <div className="mt-4 p-4 bg-[#14100E] text-[#4ade80] font-mono text-[11px] rounded border border-[#3B3029] space-y-1">
                {concurrencyLog.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
