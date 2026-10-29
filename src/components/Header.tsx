import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, LayoutDashboard, Share2, Check, Lock, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';


export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    openContactWithService,
    unreadInquiriesCount,
    hasDraftChanges,
    isOwnerMode,
    setIsPinModalOpen,
    siteSettings,
    navigationMenu,
    cvConfig,
    setIsCvModalOpen,
    t,
    language
  } = usePortfolio();


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const visibleMenuItems = navigationMenu
    .filter((it) => it.visible !== false)
    .sort((a, b) => a.order - b.order);

  const getTranslatedNavLabel = (item: { href: string; label: string }) => {
    if (language === 'en') return item.label;
    if (item.href === '#hero') return t('nav_home');
    if (item.href === '#services') return t('nav_services');
    if (item.href === '#projects') return t('nav_work');
    if (item.href === '#brands') return t('nav_experience');
    if (item.href === '#about') return t('nav_about');
    if (item.href === '#contact') return t('nav_contact');
    return item.label;
  };

  const handleNavClick = (href: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(href, '_blank', 'noreferrer');
      setMobileMenuOpen(false);
      return;
    }

    if (currentView !== 'portfolio') {
      setCurrentView('portfolio');
      setTimeout(() => {
        const id = href.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleDashboardClick = () => {
    if (isOwnerMode) {
      setCurrentView(currentView === 'portfolio' ? 'dashboard' : 'portfolio');
    } else {
      setIsPinModalOpen(true);
    }
  };

  const copyViewOnlyLink = () => {
    const origin = window.location.origin;
    const viewOnlyUrl = `${origin}?readonly=true`;
    navigator.clipboard.writeText(viewOnlyUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBFBFA]/90 backdrop-blur-md border-b border-zinc-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 sm:gap-6">
        
        {/* Zone 1: Brand Wordmark or Custom Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setCurrentView('portfolio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl font-extrabold tracking-tight text-zinc-900 font-sans hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {siteSettings.logoUrl ? (
              <img src={siteSettings.logoUrl} alt={siteSettings.logoText} className="h-9 w-auto object-contain" />
            ) : (
              <span>
                {siteSettings.logoText || 'talmeez'}<span style={{ color: 'var(--theme-primary, #EA580C)' }}>.</span>
              </span>
            )}
          </button>
        </div>

        {/* Zone 2: Dynamic Navigation Links from Database */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-zinc-600">
          {visibleMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.href, item.isExternal)}
              className="transition-colors whitespace-nowrap hover:text-zinc-950 font-semibold"
            >
              {getTranslatedNavLabel(item)}
            </button>
          ))}
        </nav>

        {/* Zone 3: Language, Theme Switcher, CTA & Admin Studio CMS Access Button */}
        <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Color Scheme Picker */}
          <ThemeSwitcher />

          {/* Download CV PDF Action */}
          {cvConfig.showDownloadInNav && (
            <button
              onClick={() => setIsCvModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200/90 bg-white/90 hover:bg-zinc-50 text-xs font-bold text-zinc-800 transition-all shadow-xs"
              title="View & Download Official CV (PDF)"
            >
              <FileText className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
              <span>CV</span>
            </button>
          )}

          {/* Share View-Only Link */}
          <button
            onClick={copyViewOnlyLink}
            className="relative p-2 rounded-full border border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900 transition-all shadow-xs"
            title="Copy view-only link for clients"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            {copiedLink && (
              <span className="absolute -bottom-7 right-0 text-[10px] bg-zinc-900 text-white px-2 py-0.5 rounded shadow-md whitespace-nowrap">
                Link copied!
              </span>
            )}
          </button>


          {/* Admin Studio CMS Button */}
          <button
            onClick={handleDashboardClick}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-xs ${
              currentView === 'dashboard'
                ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                : isOwnerMode
                ? 'bg-orange-50 border-orange-200 text-(--theme-primary,#EA580C) hover:bg-orange-100'
                : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50'
            }`}
          >
            {isOwnerMode ? (
              <LayoutDashboard className="w-3.5 h-3.5 text-(--theme-primary,#EA580C)" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
            )}
            <span>{currentView === 'dashboard' ? t('nav_return') : t('nav_dashboard')}</span>
            
            {(unreadInquiriesCount > 0 || hasDraftChanges) && (
              <span 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }} 
              />
            )}
          </button>

          {/* Primary CTA: Let's Talk */}
          <button
            onClick={() => openContactWithService()}
            className="inline-flex items-center gap-1.5 text-white px-4 py-2 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
            style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
          >
            <span>{t('nav_talk')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Action Controls & Hamburger */}
        <div className="flex sm:hidden items-center gap-1.5">
          <LanguageSwitcher compact />
          <ThemeSwitcher compact />
          
          <button
            onClick={handleDashboardClick}
            className="p-2 rounded-full bg-orange-50 border border-orange-200 text-(--theme-primary,#EA580C)"
            title="Studio CMS"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-200 bg-white/98 backdrop-blur-xl px-4 py-6 shadow-xl space-y-4">
          <nav className="flex flex-col space-y-3">
            {visibleMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href, item.isExternal)}
                className="text-left text-base font-semibold text-zinc-800 hover:text-(--theme-primary,#EA580C) py-1"
              >
                {getTranslatedNavLabel(item)}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-zinc-100 flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-bold text-zinc-500 uppercase">{t('lang_toggle')} &amp; {t('theme_label')}</span>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>

            {cvConfig.showDownloadInNav && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCvModalOpen(true);
                }}
                className="w-full py-3 rounded-2xl bg-zinc-100 text-zinc-900 text-sm font-bold flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" style={{ color: 'var(--theme-primary, #EA580C)' }} />
                <span>{language === 'km' ? cvConfig.downloadButtonLabelKm : cvConfig.downloadButtonLabel}</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleDashboardClick();
              }}
              className="w-full py-3 rounded-2xl bg-zinc-100 text-zinc-900 text-sm font-bold flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-(--theme-primary,#EA580C)" />
              <span>{currentView === 'dashboard' ? t('nav_return') : t('nav_dashboard')}</span>
            </button>


            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openContactWithService();
              }}
              className="w-full py-3 rounded-2xl text-white text-sm font-bold shadow-md flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
            >
              <span>{t('nav_talk')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
