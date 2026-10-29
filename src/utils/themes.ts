export type ThemeId = 'orange' | 'blue' | 'emerald' | 'violet' | 'rose' | 'amber' | 'slate' | 'cyan';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  nameKm: string;
  primary: string;       // main accent e.g. #EA580C
  hover: string;         // darker shade for button hovers
  light: string;         // subtle background tint e.g. #FFF7ED
  accent: string;        // highlight or text on dark e.g. #FB923C
  border: string;        // border tint e.g. #FED7AA
  shadow: string;        // rgba shadow
  previewColor: string;  // color dot
}

export const COLOR_THEMES: Record<ThemeId, ThemeConfig> = {
  orange: {
    id: 'orange',
    name: 'Signal Orange',
    nameKm: 'ពណ៌ទឹកក្រូច (Orange)',
    primary: '#EA580C',
    hover: '#C2410C',
    light: '#FFF7ED',
    accent: '#FB923C',
    border: '#FED7AA',
    shadow: 'rgba(234, 88, 12, 0.28)',
    previewColor: '#EA580C'
  },
  blue: {
    id: 'blue',
    name: 'Electric Cobalt',
    nameKm: 'ពណ៌ខៀវអគ្គិសនី (Blue)',
    primary: '#2563EB',
    hover: '#1D4ED8',
    light: '#EFF6FF',
    accent: '#60A5FA',
    border: '#BFDBFE',
    shadow: 'rgba(37, 99, 235, 0.28)',
    previewColor: '#2563EB'
  },
  emerald: {
    id: 'emerald',
    name: 'Jade Emerald',
    nameKm: 'ពណ៌បៃតងត្បូង (Emerald)',
    primary: '#059669',
    hover: '#047857',
    light: '#ECFDF5',
    accent: '#34D399',
    border: '#A7F3D0',
    shadow: 'rgba(5, 150, 105, 0.28)',
    previewColor: '#059669'
  },
  violet: {
    id: 'violet',
    name: 'Royal Violet',
    nameKm: 'ពណ៌ស្វាយរាជវង្ស (Violet)',
    primary: '#7C3AED',
    hover: '#6D28D9',
    light: '#F5F3FF',
    accent: '#A78BFA',
    border: '#DDD6FE',
    shadow: 'rgba(124, 58, 237, 0.28)',
    previewColor: '#7C3AED'
  },
  rose: {
    id: 'rose',
    name: 'Crimson Rose',
    nameKm: 'ពណ៌ផ្កាកុលាប (Rose)',
    primary: '#E11D48',
    hover: '#BE123C',
    light: '#FFF1F2',
    accent: '#FB7185',
    border: '#FECDD3',
    shadow: 'rgba(225, 29, 72, 0.28)',
    previewColor: '#E11D48'
  },
  amber: {
    id: 'amber',
    name: 'Artisan Gold',
    nameKm: 'ពណ៌មាសសិប្បកម្ម (Gold)',
    primary: '#D97706',
    hover: '#B45309',
    light: '#FFFBEB',
    accent: '#FBBF24',
    border: '#FDE68A',
    shadow: 'rgba(217, 119, 6, 0.28)',
    previewColor: '#D97706'
  },
  cyan: {
    id: 'cyan',
    name: 'Cyber Cyan',
    nameKm: 'ពណ៌ខៀវផ្ទៃមេឃ (Cyan)',
    primary: '#0891B2',
    hover: '#0E7490',
    light: '#ECFEFF',
    accent: '#22D3EE',
    border: '#A5F3FC',
    shadow: 'rgba(8, 145, 178, 0.28)',
    previewColor: '#0891B2'
  },
  slate: {
    id: 'slate',
    name: 'Midnight Onyx',
    nameKm: 'ពណ៌ខ្មៅរលោង (Onyx)',
    primary: '#18181B',
    hover: '#09090B',
    light: '#F4F4F5',
    accent: '#71717A',
    border: '#E4E4E7',
    shadow: 'rgba(24, 24, 27, 0.28)',
    previewColor: '#18181B'
  }
};

export const applyThemeToDocument = (themeId: ThemeId, customOverrides?: Partial<ThemeConfig>): void => {
  const baseTheme = COLOR_THEMES[themeId] || COLOR_THEMES.orange;
  const theme = customOverrides ? { ...baseTheme, ...customOverrides } : baseTheme;
  const root = document.documentElement;

  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-hover', theme.hover);
  root.style.setProperty('--theme-light', theme.light);
  root.style.setProperty('--theme-accent', theme.accent);
  root.style.setProperty('--theme-border', theme.border);
  root.style.setProperty('--theme-shadow', theme.shadow);
};

