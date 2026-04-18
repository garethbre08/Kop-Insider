"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemedPageWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <div style={{ backgroundColor: theme === 'home' ? '#F5E6C8' : '#F3EEDD', minHeight: '100vh', transition: 'background-color 0.3s ease' }}>
      {children}
    </div>
  );
}
