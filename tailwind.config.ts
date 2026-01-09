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
        // === FINAL BNK BRAND PALETTE - SINGLE SOURCE OF TRUTH ===
        bnk: {
          navy: '#0B2A3D',      // Deep Navy Blue - Primary
          gold: '#D6B071',      // Rich Gold / Sand Gold  
          bronze: '#B8965E',    // Dark Gold / Bronze Shadow
          offwhite: '#F1E2C3',  // Off-white highlight (optional)
          charcoal: '#1A1A1A',  // Charcoal text fallback (rare)
          silver: '#8E9499'     // Logo gray (logo only)
        },
        
        // Convenience aliases for common patterns
        navy: '#0B2A3D',
        gold: '#D6B071', 
        bronze: '#B8965E',
        cream: '#F1E2C3',
        
        // Legacy support (to be cleaned up)
        background: '#F1E2C3',
        foreground: '#0B2A3D'
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
