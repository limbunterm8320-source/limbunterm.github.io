import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Check,
  RotateCcw,
  Sparkles,
  Sliders,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { COLOR_THEMES, ThemeId, applyThemeToDocument, ThemeConfig } from '../../utils/themes';

export const ThemePaletteManager: React.FC = () => {
  const { activeTheme, setActiveTheme, showToast, saveDraft, language } = usePortfolio();
  
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>(activeTheme);
  const [customPrimary, setCustomPrimary] = useState(COLOR_THEMES[activeTheme]?.primary || '#EA580C');
  const [customHover, setCustomHover] = useState(COLOR_THEMES[activeTheme]?.hover || '#C2410C');
  const [customLight, setCustomLight] = useState(COLOR_THEMES[activeTheme]?.light || '#FFF7ED');
  const [customAccent, setCustomAccent] = useState(COLOR_THEMES[activeTheme]?.accent || '#FB923C');
  const [isCustomMode, setIsCustomMode] = useState(false);

  const themeList = Object.values(COLOR_THEMES);
  const currentConfig = COLOR_THEMES[selectedThemeId] || COLOR_THEMES.orange;

  const handleSelectPreset = (id: ThemeId) => {
    setSelectedThemeId(id);
    setActiveTheme(id);
    setIsCustomMode(false);
    const theme = COLOR_THEMES[id];
    setCustomPrimary(theme.primary);
    setCustomHover(theme.hover);
    setCustomLight(theme.light);
    setCustomAccent(theme.accent);
    saveDraft(`Color scheme switched to ${theme.name}`);
    showToast(`Active color scheme: ${theme.name}`, 'success');
  };

  const handleApplyCustomColors = () => {
    applyThemeToDocument(selectedThemeId, {
      primary: customPrimary,
      hover: customHover,
      light: customLight,
      accent: customAccent,
      border: `${customPrimary}40`,
      shadow: `${customPrimary}33`
    });
    setIsCustomMode(true);
    saveDraft('Custom color scheme values applied');
    showToast('Custom palette applied to website', 'success');
  };

  const handleResetToPreset = () => {
    const theme = COLOR_THEMES[selectedThemeId];
    setCustomPrimary(theme.primary);
    setCustomHover(theme.hover);
    setCustomLight(theme.light);
    setCustomAccent(theme.accent);
    setIsCustomMode(false);
    setActiveTheme(selectedThemeId);
    showToast(`Reset to preset: ${theme.name}`, 'info');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-zinc-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span 
            className="text-xs font-bold uppercase tracking-wider block"
            style={{ color: 'var(--theme-primary, #EA580C)' }}
          >
            Brand Style &amp; Atmosphere
          </span>
          <h2 className="text-2xl font-extrabold text-zinc-950">Color Scheme &amp; Palette Studio</h2>
          <p className="text-sm text-zinc-500 mt-0.5">
            Customize the primary brand accents, button hover tones, light surface tints, and glows applied site-wide.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-800 flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0 shadow-xs"
              style={{ backgroundColor: isCustomMode ? customPrimary : currentConfig.primary }}
            />
            <span>Active: {isCustomMode ? 'Custom Palette' : currentConfig.name}</span>
          </span>
        </div>
      </div>

      {/* Preset Color Schemes Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <Palette className="w-5 h-5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
            <span>Curated Designer Color Schemes (8 Presets)</span>
          </h3>
          <span className="text-xs text-zinc-400">Click to preview &amp; switch instantly</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {themeList.map((theme) => {
            const isSelected = selectedThemeId === theme.id && !isCustomMode;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectPreset(theme.id)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group flex flex-col justify-between h-32 ${
                  isSelected
                    ? 'border-zinc-950 bg-zinc-50/70 shadow-md ring-2'
                    : 'border-zinc-200 hover:border-zinc-300 bg-white hover:bg-zinc-50/50'
                }`}
                style={{ borderColor: isSelected ? theme.primary : undefined }}
              >

                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-7 h-7 rounded-full shrink-0 shadow-sm ring-2 ring-white flex items-center justify-center text-white"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 group-hover:text-zinc-950">
                        {language === 'km' ? theme.nameKm : theme.name}
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {theme.primary}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Color swatches strip */}
                <div className="grid grid-cols-4 gap-1.5 pt-2 border-t border-zinc-100">
                  <div
                    className="h-3.5 rounded-md shadow-2xs"
                    style={{ backgroundColor: theme.primary }}
                    title="Primary"
                  />
                  <div
                    className="h-3.5 rounded-md shadow-2xs"
                    style={{ backgroundColor: theme.hover }}
                    title="Hover"
                  />
                  <div
                    className="h-3.5 rounded-md shadow-2xs"
                    style={{ backgroundColor: theme.accent }}
                    title="Accent"
                  />
                  <div
                    className="h-3.5 rounded-md shadow-2xs border border-zinc-200"
                    style={{ backgroundColor: theme.light }}
                    title="Light Tint"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Interactive UI Component Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <Eye className="w-5 h-5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
            <span>Live Interactive Component Preview</span>
          </h3>
          <span className="text-xs text-zinc-400">Real-time rendering of your active palette</span>
        </div>

        <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200/80 space-y-6">
          
          {/* Header Simulation */}
          <div className="bg-white rounded-2xl p-4 border border-zinc-200 shadow-xs flex items-center justify-between gap-4">
            <span className="text-base font-extrabold text-zinc-900">
              bunterm<span style={{ color: 'var(--theme-primary, #EA580C)' }}>.</span>
            </span>
            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-600">
              <span style={{ color: 'var(--theme-primary, #EA580C)' }}>Work</span>
              <span>Services</span>
              <span>About</span>
            </div>
            <button
              className="px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-xs"
              style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
            >
              Let&apos;s Talk &rarr;
            </button>
          </div>

          {/* Hero Banner Elements Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="rounded-2xl p-5 border space-y-3"
              style={{ 
                backgroundColor: 'var(--theme-light, #FFF7ED)',
                borderColor: 'var(--theme-border, #FED7AA)'
              }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200/80 text-[11px] font-bold shadow-2xs">
                <span 
                  className="w-2 h-2 rounded-full animate-pulse" 
                  style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
                />
                <span style={{ color: 'var(--theme-primary, #EA580C)' }}>AVAILABLE FOR COMMISSIONS</span>
              </div>
              <h4 className="text-lg font-black text-zinc-900 leading-tight">
                Design That <span style={{ color: 'var(--theme-primary, #EA580C)' }}>Builds Brands</span>.
              </h4>
              <p className="text-xs text-zinc-600">
                Packaging die-cuts, tactile blind debossing, and modern Swiss editorial monographs.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  className="px-4 py-2 rounded-full text-white text-xs font-bold shadow-sm"
                  style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
                >
                  Explore Work
                </button>
                <button className="px-4 py-2 rounded-full bg-white border border-zinc-300 text-zinc-800 text-xs font-bold hover:bg-zinc-50">
                  Download CV
                </button>
              </div>
            </div>

            {/* Project Card Simulation */}
            <div className="bg-white rounded-2xl p-5 border border-zinc-200 shadow-xs flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span 
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md"
                  style={{ 
                    backgroundColor: 'var(--theme-light, #FFF7ED)',
                    color: 'var(--theme-primary, #EA580C)'
                  }}
                >
                  Packaging Design
                </span>
                <span className="text-xs font-mono text-zinc-400">2026</span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-zinc-900">Aura Skincare Packaging Suite</h5>
                <p className="text-xs text-zinc-500 mt-1">Copper foil stamping on sustainable card stock.</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                <span className="text-zinc-500 font-medium">Delivered 4 weeks</span>
                <span className="font-bold flex items-center gap-1" style={{ color: 'var(--theme-primary, #EA580C)' }}>
                  View Project &rarr;
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Advanced Custom Hex Palette Fine-Tuning */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-950 flex items-center gap-2">
            <Sliders className="w-5 h-5" style={{ color: 'var(--theme-primary, #EA580C)' }} />
            <span>Custom Hex Tone Fine-Tuning</span>
          </h3>
          <button
            onClick={handleResetToPreset}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Preset Defaults</span>
          </button>
        </div>

        <p className="text-xs text-zinc-500">
          Enter custom brand color hex codes to adapt the palette to a specific client visual guidelines.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Primary */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
              Primary Accent
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customPrimary}
                onChange={(e) => setCustomPrimary(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-300"
              />
              <input
                type="text"
                value={customPrimary}
                onChange={(e) => setCustomPrimary(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono font-bold"
              />
            </div>
            <span className="text-[10px] text-zinc-400 block">Main CTAs, logo dot, badges</span>
          </div>

          {/* Hover */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
              Hover Shade
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customHover}
                onChange={(e) => setCustomHover(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-300"
              />
              <input
                type="text"
                value={customHover}
                onChange={(e) => setCustomHover(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono font-bold"
              />
            </div>
            <span className="text-[10px] text-zinc-400 block">Button active &amp; hover states</span>
          </div>

          {/* Light Tint */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
              Surface Light Tint
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customLight}
                onChange={(e) => setCustomLight(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-300"
              />
              <input
                type="text"
                value={customLight}
                onChange={(e) => setCustomLight(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono font-bold"
              />
            </div>
            <span className="text-[10px] text-zinc-400 block">Metrics card &amp; callout background</span>
          </div>

          {/* Accent Glow */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">
              Secondary Accent
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border border-zinc-300"
              />
              <input
                type="text"
                value={customAccent}
                onChange={(e) => setCustomAccent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs font-mono font-bold"
              />
            </div>
            <span className="text-[10px] text-zinc-400 block">Gradient aura &amp; tag highlights</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
          <button
            onClick={handleApplyCustomColors}
            className="px-5 py-2.5 rounded-2xl text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            style={{ backgroundColor: 'var(--theme-primary, #EA580C)' }}
          >
            Apply Custom Palette to Website
          </button>
        </div>
      </div>
    </div>
  );
};
