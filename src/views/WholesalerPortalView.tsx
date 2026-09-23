import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FabricType, WholesaleBatchOrder } from '../types';
import { 
  Package, 
  FileText, 
  MessageCircle, 
  CheckCircle2, 
  Calculator,
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';
import { formatNaira, generateWhatsAppUrl, BROWNDILUX_WHATSAPP_NUMBER } from '../utils/formatters';

export const WholesalerPortalView: React.FC = () => {
  const { wholesaleOrders, createWholesaleOrder, showToast, currentUser } = useShop();

  const [societyEventName, setSocietyEventName] = useState('Adeleke & Balogun Royal Nuptials');
  const [clientName, setClientName] = useState(currentUser?.name || 'Adeola Balogun');
  const [phone, setPhone] = useState(currentUser?.phone || '+234 818 200 4433');
  const [fabricType, setFabricType] = useState<FabricType>('Aso-Oke');
  const [colorScheme, setColorScheme] = useState('Champagne Gold & Metallic Copper');
  const [setCount, setSetCount] = useState<number>(30);
  const [deliveryDate, setDeliveryDate] = useState('2026-11-20');

  // Pricing calculation
  const basePrices: Record<FabricType, number> = {
    'Aso-Oke': 110000,
    'Adire Eleko / Batik': 58000,
    'Senator Cashmere / Wool': 75000,
    'Ankara Modern': 48000,
    'Raw Silk / Satin': 95000,
    'Nigerian Genuine Leather': 22000,
    'Linen Blend': 46000
  };

  const unitBasePrice = basePrices[fabricType] || 75000;

  // Determine volume tier discount
  let discountPercent = 15;
  if (setCount >= 50) {
    discountPercent = 45;
  } else if (setCount >= 25) {
    discountPercent = 32;
  } else if (setCount >= 10) {
    discountPercent = 20;
  }

  const grossTotal = unitBasePrice * setCount;
  const discountAmount = Math.round(grossTotal * (discountPercent / 100));
  const netTotal = grossTotal - discountAmount;
  const depositRequired = Math.round(netTotal * 0.5);

  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: WholesaleBatchOrder = {
      id: `wb-${Date.now()}`,
      reference: `WHOLESALE-${Date.now().toString().slice(-5)}`,
      clientName,
      companyOrSociety: societyEventName,
      phone,
      fabricType,
      colorScheme,
      setCount,
      unitPrice: unitBasePrice,
      discountPercent,
      totalNaira: netTotal,
      deliveryDate,
      societyEventName,
      status: 'quote-sent'
    };

    createWholesaleOrder(newOrder);
    showToast(`Proforma Invoice ${newOrder.reference} generated!`);
  };

  const handleSendWhatsAppCommission = () => {
    const text = `*BROWNDILUX B2B WHOLESALE & ASO-EBI INQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━
*Society Event:* ${societyEventName}
*Client:* ${clientName} (${phone})
*Fabric Selection:* ${fabricType}
*Colorway Palette:* ${colorScheme}
*Total Sets:* ${setCount} units
*Tier Discount:* ${discountPercent}% off
*Estimated Net Total:* ${formatNaira(netTotal)}
*50% Loom Weaving Deposit:* ${formatNaira(depositRequired)}
*Required Delivery Date:* ${deliveryDate}
━━━━━━━━━━━━━━━━━━━━━━━━
Requesting loom reservation and artisan workshop assignment.`;

    const url = generateWhatsAppUrl(BROWNDILUX_WHATSAPP_NUMBER, text);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10 animate-in fade-in duration-200">
      {/* Wholesaler Header */}
      <div className="bg-[#F4EFEA] dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
            <Package className="w-4 h-4" />
            <span>Corporate & Aso-Ebi B2B Portal</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1A1615] dark:text-[#FAF7F2] mt-1 text-balance">
            Society Wedding Batches & Wholesale Tiering
          </h1>
          <p className="text-xs sm:text-sm text-[#6B635B] dark:text-[#B8ADA3] mt-1 text-balance">
            Reserve dedicated artisan loom capacity in Iseyin, Abeokuta, and Abuja for uniform event collections.
          </p>
        </div>

        <div className="p-3 bg-white dark:bg-[#251F1B] rounded border border-[#E8DFD5] dark:border-[#3B3029] text-xs flex-shrink-0">
          <span className="text-[10px] uppercase font-bold text-[#A36B40] block">Your B2B Status</span>
          <p className="font-semibold text-[#1A1615] dark:text-[#FAF7F2] mt-0.5">Society Account (Up to 32% Off)</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Direct Loom Reservation Active</p>
        </div>
      </div>

      {/* Volume Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-6 shadow-2xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A36B40]">Tier 1 · Family Batch</span>
            <span className="text-xs font-bold px-2 py-0.5 bg-[#FAF7F2] dark:bg-[#251F1B] text-[#A36B40] rounded">20% Off</span>
          </div>
          <div className="text-lg sm:text-xl font-serif font-semibold text-[#1A1615] dark:text-[#FAF7F2]">10 - 24 Outfits</div>
          <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
            Ideal for immediate bridal entourage and groomsmen. Includes direct fabric swatch preview sent to your address.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1E1916] border-2 border-[#A36B40] rounded p-5 sm:p-6 shadow-xs space-y-2 relative">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A36B40]">Tier 2 · Society Nuptials</span>
            <span className="text-xs font-bold px-2 py-0.5 bg-[#A36B40] text-white rounded">32% Off</span>
          </div>
          <div className="text-lg sm:text-xl font-serif font-semibold text-[#1A1615] dark:text-[#FAF7F2]">25 - 49 Outfits</div>
          <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
            High-volume custom dye batches with dedicated lead artisan supervisor and priority loom scheduling.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-6 shadow-2xs space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A36B40]">Tier 3 · Royal State Gala</span>
            <span className="text-xs font-bold px-2 py-0.5 bg-[#FAF7F2] dark:bg-[#251F1B] text-[#A36B40] rounded">45% Off</span>
          </div>
          <div className="text-lg sm:text-xl font-serif font-semibold text-[#1A1615] dark:text-[#FAF7F2]">50+ Outfits</div>
          <p className="text-xs text-[#6B635B] dark:text-[#B8ADA3] leading-relaxed">
            Full workshop reservation across guilds, custom woven monograms, and express door-to-door courier dispatch.
          </p>
        </div>
      </div>

      {/* Interactive Aso-Ebi Calculator & Commission Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#A36B40]" />
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-[#1A1615] dark:text-[#FAF7F2]">
              Aso-Ebi & Batch Order Calculator
            </h2>
          </div>

          <form onSubmit={handleGenerateInvoice} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                Society Event / Celebrant Name *
              </label>
              <input
                type="text"
                required
                value={societyEventName}
                onChange={(e) => setSocietyEventName(e.target.value)}
                className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-sm text-[#1A1615] dark:text-[#FAF7F2] focus:outline-none focus:border-[#A36B40]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                  Primary Fabric Selection *
                </label>
                <select
                  value={fabricType}
                  onChange={(e) => setFabricType(e.target.value as FabricType)}
                  className="w-full p-2.5 bg-white dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                >
                  <option value="Aso-Oke">Aso-Oke Handwoven (Loom Direct)</option>
                  <option value="Adire Eleko / Batik">Adire Eleko / Botanical Resist Silk</option>
                  <option value="Senator Cashmere / Wool">Senator Tropical Wool / Cashmere</option>
                  <option value="Ankara Modern">Ankara Modern Premium Wax</option>
                  <option value="Raw Silk / Satin">Mulberry Raw Silk / Satin</option>
                  <option value="Nigerian Genuine Leather">Benin Cast Leather Accessories</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                  Event Colorway Palette *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emerald Green & Metallic Copper"
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value)}
                  className="w-full p-2.5 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                  Quantity of Outfits / Sets *
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={setCount}
                    onChange={(e) => setSetCount(Number(e.target.value))}
                    className="flex-1 accent-[#A36B40] cursor-pointer"
                  />
                  <span className="font-serif font-bold text-sm sm:text-base w-14 text-right flex-shrink-0 text-[#A36B40]">{setCount} sets</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#1A1615] dark:text-[#FAF7F2] mb-1">
                  Required Target Delivery Date *
                </label>
                <input
                  type="date"
                  required
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-2 bg-transparent border border-[#E8DFD5] dark:border-[#3B3029] rounded text-xs text-[#1A1615] dark:text-[#FAF7F2]"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] hover:bg-[#A36B40] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Save Proforma Invoice</span>
              </button>

              <button
                type="button"
                onClick={handleSendWhatsAppCommission}
                className="w-full sm:w-auto py-3 px-6 bg-[#25D366] text-white hover:bg-[#20ba59] text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Submit to Loom WhatsApp Concierge</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Quotation Summary Card */}
        <div className="lg:col-span-5 bg-[#FAF7F2] dark:bg-[#251F1B] border border-[#E8DFD5] dark:border-[#3B3029] rounded p-5 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#A36B40] dark:text-[#C68A5E]">
              Live Batch Cost Breakdown
            </span>
            <div className="text-sm font-semibold text-[#1A1615] dark:text-[#FAF7F2] text-balance">
              {societyEventName}
            </div>

            <div className="space-y-2 text-xs border-t border-b border-[#E8DFD5] dark:border-[#3B3029] py-4">
              <div className="flex justify-between">
                <span className="text-[#6B635B] dark:text-[#B8ADA3]">Fabric Base Price:</span>
                <span>{formatNaira(unitBasePrice)} / set</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B635B] dark:text-[#B8ADA3]">Units Commissioned:</span>
                <span>{setCount} full outfits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B635B] dark:text-[#B8ADA3]">Gross Catalog Value:</span>
                <span className="line-through text-[#6B635B]">{formatNaira(grossTotal)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Tier Volume Discount ({discountPercent}%):</span>
                <span>-{formatNaira(discountAmount)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-[#1A1615] dark:text-[#FAF7F2] pt-2 border-t border-[#E8DFD5] dark:border-[#3B3029]">
                <span>Wholesale Net Total:</span>
                <span className="text-[#A36B40] dark:text-[#C68A5E]">{formatNaira(netTotal)}</span>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-[#1E1916] rounded border border-[#E8DFD5] dark:border-[#3B3029] text-xs space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span>50% Loom Weaving Deposit:</span>
                <span className="text-emerald-600">{formatNaira(depositRequired)}</span>
              </div>
              <p className="text-[10px] text-[#6B635B] dark:text-[#B8ADA3]">
                Secures artisan weavers in Iseyin & Abeokuta. Remaining 50% payable upon completed guild quality check.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Wholesale Orders */}
      <div className="bg-white dark:bg-[#1E1916] border border-[#E8DFD5] dark:border-[#3B3029] rounded shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#E8DFD5] dark:border-[#3B3029]">
          <h3 className="font-serif text-base sm:text-lg font-medium text-[#1A1615] dark:text-[#FAF7F2]">
            Active B2B Proforma Batches
          </h3>
        </div>

        <div className="divide-y divide-[#E8DFD5] dark:divide-[#3B3029]">
          {wholesaleOrders.map(batch => (
            <div key={batch.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs">{batch.reference}</span>
                  <span className="text-xs text-[#6B635B]">· {batch.societyEventName}</span>
                </div>
                <p className="text-xs text-[#6B635B] mt-0.5">
                  {batch.setCount} sets of {batch.fabricType} ({batch.colorScheme})
                </p>
                <p className="text-[11px] text-[#A36B40] mt-0.5">
                  Delivery target: {batch.deliveryDate}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="font-serif text-sm font-semibold">{formatNaira(batch.totalNaira)}</div>
                <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded inline-block mt-1">
                  {batch.status.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
