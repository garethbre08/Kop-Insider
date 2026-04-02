"use client";

import { useTheme } from "@/context/ThemeContext";

export default function PlaceholderPage({ title }: { title: string }) {
  const { theme } = useTheme();
  const bg = theme === "home" ? "bg-ki-gold" : "bg-ki-cream";

  return (
    <div className={`${bg} min-h-screen flex flex-col items-center justify-center gap-3 transition-colors duration-300`}>
      <h1 className="text-ki-black font-bold text-3xl">{title}</h1>
      <p className="text-ki-charcoal opacity-50">Coming Soon</p>
    </div>
  );
}
