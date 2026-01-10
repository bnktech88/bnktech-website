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
        // === STRICT BNK BRAND PALETTE - ONLY THESE 6 COLORS ALLOWED ===
        
        // Primary Brand Tokens (Main Usage)
        brand: {
          DEFAULT: '#0B2A3D',  // Deep Navy Blue (primary brand color)
          navy: '#0B2A3D',     // Deep Navy Blue
          gold: '#D6B071',     // Rich Gold / Sand Gold
          bronze: '#B8965E',   // Dark Gold / Bronze Shadow
          silver: '#8E9499',   // Metallic Silver / Logo Gray
          ink: '#1A1A1A',      // Charcoal / Near Black
          cream: '#F1E2C3'     // Off-White / Soft Highlight
        },
        
        // Section Background Rotation System
        'section-bronze': '#B8965E',  // Odd sections
        'section-gold': '#D6B071',    // Even sections
        
        // Header/Footer System
        'header-bg': '#0B2A3D',       // Navy background
        'header-text': '#D6B071',     // Gold text
        'header-button': '#B8965E',   // Bronze buttons
        'header-button-text': '#0B2A3D', // Navy text in bronze buttons
        
        // Body System  
        'body-text': '#0B2A3D',       // Navy text (default)
        'body-button': '#0B2A3D',     // Navy buttons
        'body-button-text': '#D6B071', // Gold text in navy buttons
        
        // Legacy aliases (will be removed in cleanup)
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
