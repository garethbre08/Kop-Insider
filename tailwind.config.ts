import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ki-teal':    '#01586B',
        'ki-white':   '#FFFFFF',
        'ki-cream':   '#F3EEDD',
        'ki-sand':    '#E7DFC9',
        'ki-charcoal':'#333333',
        'ki-black':   '#111111',
        'ki-red':     '#C8102E',
        'ki-gold':    '#F5E6C8',
      },
      fontFamily: {
        sans:  ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
