import React from 'react';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const LanguageSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { language, setLanguage, t } = usePortfolio();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'km' : 'en');
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleLanguage}
        className="relative inline-flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-full border border-zinc-200/90 bg-white/90 hover:bg-zinc-50 shadow-xs text-xs font-bold text-zinc-700 transition-all hover:border-zinc-300"
        title={t('lang_toggle')}
        aria-label="Switch Language"
      >
        <Globe className="w-3.5 h-3.5 text-zinc-500" />
        
        {/* EN / KM segment pill */}
        <div className="flex items-center gap-1 text-[11px]">
          <span
            className={`px-1.5 py-0.5 rounded-full transition-all ${
              language === 'en'
                ? 'bg-zinc-900 text-white shadow-xs font-extrabold'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            EN
          </span>
          <span className="text-zinc-300">/</span>
          <span
            className={`px-1.5 py-0.5 rounded-full transition-all ${
              language === 'km'
                ? 'bg-zinc-900 text-white shadow-xs font-extrabold font-sans'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            ខ្មែរ
          </span>
        </div>
      </button>
    </div>
  );
};
