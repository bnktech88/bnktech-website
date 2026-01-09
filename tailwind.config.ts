import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy support
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        foreground: 'rgb(var(--color-text) / <alpha-value>)',
        
        // === BNK SEMANTIC THEME (CSS Variables) ===
        // Semantic colors that map to CSS variables
        'brand': {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',
          hover: 'rgb(var(--color-brand-hover) / <alpha-value>)',
        },
        'accent': {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
          soft: 'rgb(var(--color-accent-soft) / <alpha-value>)',
        },
        'surface': {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          '2': 'rgb(var(--color-surface-2) / <alpha-value>)',
        },
        'text': {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          subtle: 'rgb(var(--color-text-subtle) / <alpha-value>)',
        },
        'border': {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
        },
        'ring': {
          DEFAULT: 'rgb(var(--color-ring) / <alpha-value>)',
        },
        
        // === BNK BRAND TOKENS (CSS Variables) ===
        // Direct access to brand colors when needed
        'bnk-navy': {
          950: 'rgb(var(--bnk-navy-950) / <alpha-value>)',
          900: 'rgb(var(--bnk-navy-900) / <alpha-value>)',
          800: 'rgb(var(--bnk-navy-800) / <alpha-value>)',
          700: 'rgb(var(--bnk-navy-700) / <alpha-value>)',
          600: 'rgb(var(--bnk-navy-600) / <alpha-value>)',
        },
        'bnk-gold': {
          700: 'rgb(var(--bnk-gold-700) / <alpha-value>)',
          600: 'rgb(var(--bnk-gold-600) / <alpha-value>)',
          500: 'rgb(var(--bnk-gold-500) / <alpha-value>)',
          400: 'rgb(var(--bnk-gold-400) / <alpha-value>)',
          300: 'rgb(var(--bnk-gold-300) / <alpha-value>)',
        },
        'bnk-neutral': {
          50: 'rgb(var(--bnk-neutral-50) / <alpha-value>)',
          100: 'rgb(var(--bnk-neutral-100) / <alpha-value>)',
          200: 'rgb(var(--bnk-neutral-200) / <alpha-value>)',
          300: 'rgb(var(--bnk-neutral-300) / <alpha-value>)',
          800: 'rgb(var(--bnk-neutral-800) / <alpha-value>)',
          900: 'rgb(var(--bnk-neutral-900) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
