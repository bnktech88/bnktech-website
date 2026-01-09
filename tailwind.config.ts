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
        
        // === BNK BUSINESS CARD LUXURY SYSTEM ===
        
        // Semantic Brand Tokens (Primary Usage)
        brand: {
          DEFAULT: 'rgb(var(--color-brand) / <alpha-value>)',    // Navy primary
          hover: 'rgb(var(--color-brand-hover) / <alpha-value>)', // Navy dark
          navy: 'rgb(var(--bnk-navy) / <alpha-value>)',          // Direct navy access
          gold: 'rgb(var(--bnk-gold) / <alpha-value>)',          // Direct gold access
          bronze: 'rgb(var(--bnk-bronze) / <alpha-value>)',      // Direct bronze access
          silver: 'rgb(var(--bnk-silver) / <alpha-value>)',      // Direct silver access
          ink: 'rgb(var(--bnk-ink) / <alpha-value>)',            // Direct ink access
          cream: 'rgb(var(--bnk-cream) / <alpha-value>)'         // Direct cream access
        },
        
        // Semantic Surface System
        'base-cream': 'rgb(var(--bnk-cream-light) / <alpha-value>)', // Primary light background
        'base-navy': 'rgb(var(--bnk-navy) / <alpha-value>)',         // Primary dark background
        
        // Accent System
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',     // Gold primary
          hover: 'rgb(var(--color-accent-hover) / <alpha-value>)', // Bronze hover
          soft: 'rgb(var(--color-accent-soft) / <alpha-value>)',   // Light gold
          gold: 'rgb(var(--bnk-gold) / <alpha-value>)',            // Direct gold
          bronze: 'rgb(var(--bnk-bronze) / <alpha-value>)'         // Direct bronze
        },
        
        // Surface & Card System  
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',    // Cream cards
          '2': 'rgb(var(--color-surface-2) / <alpha-value>)',      // Elevated surfaces
          cream: 'rgb(var(--bnk-cream) / <alpha-value>)',
          'cream-light': 'rgb(var(--bnk-cream-light) / <alpha-value>)'
        },
        
        // Text System
        text: {
          DEFAULT: 'rgb(var(--color-text) / <alpha-value>)',       // Ink primary
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',   // Silver muted
          subtle: 'rgb(var(--color-text-subtle) / <alpha-value>)', // Silver light
          ink: 'rgb(var(--bnk-ink) / <alpha-value>)',              // Direct ink
          'on-navy': 'rgb(var(--bnk-cream) / <alpha-value>)',      // Text on navy backgrounds
          'on-cream': 'rgb(var(--bnk-ink) / <alpha-value>)'        // Text on cream backgrounds
        },
        
        // Border & Focus System
        border: {
          DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',     // Bronze light borders
          bronze: 'rgb(var(--bnk-bronze-light) / <alpha-value>)',
          gold: 'rgb(var(--bnk-gold) / <alpha-value>)'
        },
        ring: {
          DEFAULT: 'rgb(var(--color-ring) / <alpha-value>)'        // Gold focus rings
        },
        
        // Direct Business Card Color Access (Advanced Usage)
        'bnk-navy': 'rgb(var(--bnk-navy) / <alpha-value>)',
        'bnk-navy-light': 'rgb(var(--bnk-navy-light) / <alpha-value>)',
        'bnk-navy-dark': 'rgb(var(--bnk-navy-dark) / <alpha-value>)',
        'bnk-gold': 'rgb(var(--bnk-gold) / <alpha-value>)',
        'bnk-gold-light': 'rgb(var(--bnk-gold-light) / <alpha-value>)',
        'bnk-bronze': 'rgb(var(--bnk-bronze) / <alpha-value>)',
        'bnk-bronze-light': 'rgb(var(--bnk-bronze-light) / <alpha-value>)',
        'bnk-silver': 'rgb(var(--bnk-silver) / <alpha-value>)',
        'bnk-silver-light': 'rgb(var(--bnk-silver-light) / <alpha-value>)',
        'bnk-ink': 'rgb(var(--bnk-ink) / <alpha-value>)',
        'bnk-ink-light': 'rgb(var(--bnk-ink-light) / <alpha-value>)',
        'bnk-cream': 'rgb(var(--bnk-cream) / <alpha-value>)',
        'bnk-cream-light': 'rgb(var(--bnk-cream-light) / <alpha-value>)',
        'bnk-white': 'rgb(var(--bnk-white) / <alpha-value>)'
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
