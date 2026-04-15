import React, { useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { useThemeStore, ThemeMode } from '@/stores/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const antdThemeConfig: Record<ThemeMode, { token: object; algorithm: typeof antdTheme.defaultAlgorithm | typeof antdTheme.darkAlgorithm }> = {
  light: {
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#1677ff',
      borderRadius: 6,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
  },
  dark: {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorPrimary: '#1677ff',
      borderRadius: 6,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    },
  },
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const config = antdThemeConfig[theme];

  return (
    <ConfigProvider theme={config}>
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
