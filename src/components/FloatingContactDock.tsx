import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Send, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const FloatingContactDock: React.FC = () => {
  const { siteSettings, currentView, openContactWithService, t, language } = usePortfolio();
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Do not render dock in dashboard view
  if (currentView === 'dashboard') return null;

  const telegramUrl = siteSettings.contactTelegram
    ? siteSettings.contactTelegram.startsWith('http')
      ? siteSettings.contactTelegram
      : `https://t.me/${siteSettings.contactTelegram.replace('@', '')}`
    : 'https://t.me/';

  const facebookUrl = siteSettings.contactFacebook || 'https://facebook.com';
  const phoneUrl = `tel:${(siteSettings.contactPhone || '').replace(/[^0-9+]/g, '')}`;
  const gmailUrl = `mailto:${siteSettings.contactEmail || 'hello@talmeezdesign.com'}`;

  const contactItems = [
    {
      id: 'telegram',
      name: t('dock_telegram'),
      detail: siteSettings.contactTelegram || '@talmeez_studio',
      href: telegramUrl,
      isExternal: true,
      color: '#229ED9',
      bgColor: 'bg-[#229ED9]/10 hover:bg-[#229ED9]',
      textColor: 'text-[#229ED9] hover:text-white',
      borderColor: 'border-[#229ED9]/30',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
        </svg>
      )
    },
    {
      id: 'phone',
      name: t('dock_phone'),
      detail: siteSettings.contactPhone || '+1 (555) 392-8100',
      href: phoneUrl,
      isExternal: false,
      color: '#10B981',
      bgColor: 'bg-[#10B981]/10 hover:bg-[#10B981]',
      textColor: 'text-[#10B981] hover:text-white',
      borderColor: 'border-[#10B981]/30',
      icon: <Phone className="w-4 h-4 stroke-[2]" />
    },
    {
      id: 'facebook',
      name: t('dock_facebook'),
      detail: 'Facebook Page',
      href: facebookUrl,
      isExternal: true,
      color: '#1877F2',
      bgColor: 'bg-[#1877F2]/10 hover:bg-[#1877F2]',
      textColor: 'text-[#1877F2] hover:text-white',
      borderColor: 'border-[#1877F2]/30',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      id: 'gmail',
      name: t('dock_gmail'),
      detail: siteSettings.contactEmail || 'hello@talmeezdesign.com',
      href: gmailUrl,
      isExternal: false,
      color: '#EA4335',
      bgColor: 'bg-[#EA4335]/10 hover:bg-[#EA4335]',
      textColor: 'text-[#EA4335] hover:text-white',
      borderColor: 'border-[#EA4335]/30',
      icon: <Mail className="w-4 h-4 stroke-[2]" />
    }
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none">
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-auto flex items-center gap-1.5 sm:gap-2.5 bg-white/90 backdrop-blur-xl border border-zinc-200/90 shadow-2xl rounded-full px-3 py-2 sm:px-4 sm:py-2.5 ring-1 ring-black/5"
      >
        {/* Availability Live Pill */}
        <div 
          onClick={() => openContactWithService()}
          className="hidden sm:flex items-center gap-2 pl-1 pr-2.5 py-1 border-r border-zinc-200 cursor-pointer group"
          title={t('dock_available')}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-bold text-zinc-700 group-hover:text-zinc-950 transition-colors whitespace-nowrap">
            {t('dock_available')}
          </span>
        </div>

        {/* 4 Centered Contact Elements */}
        <div className="flex items-center gap-1 sm:gap-2">
          {contactItems.map((item) => (
            <div key={item.id} className="relative">
              <motion.a
                href={item.href}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noreferrer' : undefined}
                onMouseEnter={() => setActiveTooltip(item.id)}
                onMouseLeave={() => setActiveTooltip(null)}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                aria-label={item.name}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all duration-200 shadow-xs ${item.bgColor} ${item.textColor} ${item.borderColor}`}
              >
                {item.icon}
              </motion.a>

              {/* Tooltip bubble on hover */}
              <AnimatePresence>
                {activeTooltip === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute -top-11 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-xl whitespace-nowrap pointer-events-none flex items-center gap-1.5"
                  >
                    <span>{item.name}</span>
                    <span className="text-zinc-400 text-[10px]">({item.detail})</span>
                    <div className="w-2 h-2 bg-zinc-900 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Quick Message CTA */}
        <motion.button
          onClick={() => openContactWithService()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-1 sm:ml-1.5 pl-2.5 pr-3 py-1.5 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1.5 transition-colors"
          style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
        >
          <span className="hidden md:inline">{t('nav_talk')}</span>
          <Send className="w-3.5 h-3.5" />
        </motion.button>
      </motion.div>
    </div>
  );
};
