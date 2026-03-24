import React, { createContext, useContext, useState, useCallback } from 'react';

export type ThemeType = 'default' | 'cyberpunk' | 'fantasy' | 'retro';
export type IconStyle = 'modern' | 'pixel' | 'outline';
export type InterfaceSize = 'compact' | 'normal' | 'large';

interface ThemeConfig {
  theme: ThemeType;
  iconStyle: IconStyle;
  interfaceSize: InterfaceSize;
  animationsEnabled: boolean;
  soundEnabled: boolean;
}

interface ThemeContextType {
  config: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  setIconStyle: (style: IconStyle) => void;
  setInterfaceSize: (size: InterfaceSize) => void;
  toggleAnimations: () => void;
  toggleSound: () => void;
  getSizeClass: (base: string) => string;
}

const defaultConfig: ThemeConfig = {
  theme: 'default',
  iconStyle: 'modern',
  interfaceSize: 'normal',
  animationsEnabled: true,
  soundEnabled: false,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<ThemeConfig>(defaultConfig);

  const setTheme = useCallback((theme: ThemeType) => {
    setConfig(prev => ({ ...prev, theme }));
    document.body.className = `theme-${theme}`;
  }, []);

  const setIconStyle = useCallback((iconStyle: IconStyle) => {
    setConfig(prev => ({ ...prev, iconStyle }));
  }, []);

  const setInterfaceSize = useCallback((interfaceSize: InterfaceSize) => {
    setConfig(prev => ({ ...prev, interfaceSize }));
  }, []);

  const toggleAnimations = useCallback(() => {
    setConfig(prev => ({ ...prev, animationsEnabled: !prev.animationsEnabled }));
  }, []);

  const toggleSound = useCallback(() => {
    setConfig(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const getSizeClass = useCallback((base: string) => {
    const sizes: Record<InterfaceSize, Record<string, string>> = {
      compact: {
        'panel': 'p-3',
        'card': 'p-2',
        'text': 'text-sm',
        'icon': 'w-8 h-8',
        'gap': 'gap-2',
        'padding': 'p-2',
      },
      normal: {
        'panel': 'p-4',
        'card': 'p-4',
        'text': 'text-base',
        'icon': 'w-10 h-10',
        'gap': 'gap-4',
        'padding': 'p-4',
      },
      large: {
        'panel': 'p-6',
        'card': 'p-6',
        'text': 'text-lg',
        'icon': 'w-12 h-12',
        'gap': 'gap-6',
        'padding': 'p-6',
      },
    };
    return sizes[config.interfaceSize][base] || sizes.normal[base];
  }, [config.interfaceSize]);

  return (
    <ThemeContext.Provider
      value={{
        config,
        setTheme,
        setIconStyle,
        setInterfaceSize,
        toggleAnimations,
        toggleSound,
        getSizeClass,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
