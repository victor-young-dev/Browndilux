import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 duration-300">
      <div className="bg-[#3D2B1F] dark:bg-[#FAF7F2] text-[#FAF7F2] dark:text-[#171311] py-3 px-5 rounded shadow-xl flex items-center gap-2.5 text-xs font-medium border border-[#A36B40]/40">
        <CheckCircle2 className="w-4 h-4 text-[#A36B40] dark:text-[#C68A5E]" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
