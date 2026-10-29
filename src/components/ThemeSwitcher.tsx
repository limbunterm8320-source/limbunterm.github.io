import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { COLOR_THEMES, ThemeId } from '../utils/themes';

export const ThemeSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { activeTheme, setActiveTheme, t, language, jumpToCmsSection, isOwnerMode } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themesList = Object.values(COLOR_THEMES);
  const currentThemeConfig = COLOR_THEMES[activeTheme] || COLOR_THEMES.orange;

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full border border-zinc-200/90 bg-white/90 hover:bg-zinc-50 shadow-xs text-xs font-semibold text-zinc-700 transition-all hover:border-zinc-300"
        title={t('theme_selector')}
        aria-label="Change color theme"
      >
        <span
          className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs ring-1 ring-black/10"
          style={{ backgroundColor: currentThemeConfig.primary }}
        />
        {!compact && (
          <span className="hidden xl:inline text-xs font-bold text-zinc-800">
            {language === 'km' ? currentThemeConfig.nameKm.split(' ')[0] : currentThemeConfig.name}
          </span>
        )}
        <Palette className="w-3.5 h-3.5 text-zinc-500" />
      </button>

      {/* Palette Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-zinc-200 p-3 z-50 ring-1 ring-black/5"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                {t('theme_selector')}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">8 Schemes</span>
            </div>

            <div className="grid grid-cols-1 gap-1 max-h-72 overflow-y-auto">
              {themesList.map((theme) => {
                const isSelected = theme.id === activeTheme;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setActiveTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-zinc-100 text-zinc-950 font-bold'
                        : 'hover:bg-zinc-50 text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full shrink-0 shadow-xs ring-1 ring-black/10"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <span className="truncate">
                        {language === 'km' ? theme.nameKm : theme.name}
                      </span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5" style={{ color: theme.primary }} />
                    )}
                  </button>
                );
              })}
            </div>

            {isOwnerMode && (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  jumpToCmsSection('theme');
                }}
                className="w-full mt-2 pt-2 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-[11px] font-bold text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                <Palette className="w-3.5 h-3.5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
                <span>Open Color Scheme Studio in CMS &rarr;</span>
              </button>
            )}
          </motion.div>

        )}
      </AnimatePresence>
    </div>
  );
};
