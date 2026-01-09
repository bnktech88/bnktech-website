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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // BNK Tech Brand Colors (Business Card Palette)
        primary: {
          50: '#f8fafc',   // Very light navy tint
          100: '#f1f5f9',  // Light navy tint  
          200: '#e2e8f0',  // Subtle navy
          300: '#cbd5e1',  // Muted navy
          400: '#94a3b8',  // Mid navy
          500: '#64748b',  // Standard navy
          600: '#475569',  // Deep navy
          700: '#334155',  // Darker navy
          800: '#1e293b',  // Very dark navy  
          900: '#0f172a',  // Deepest navy (primary brand)
          950: '#020617',  // Ultra deep navy
        },
        accent: {
          50: '#fefce8',   // Very light gold tint
          100: '#fef9c3',  // Light gold tint
          200: '#fef08a',  // Subtle gold
          300: '#fde047',  // Bright gold
          400: '#facc15',  // Standard gold
          500: '#eab308',  // Rich gold
          600: '#ca8a04',  // Deep gold
          700: '#a16207',  // Luxury gold (primary accent)
          800: '#854d0e',  // Dark gold
          900: '#713f12',  // Deepest gold
          950: '#422006',  // Ultra deep gold
        },
        neutral: {
          50: '#fafaf9',   // Off-white
          100: '#f5f5f4',  // Soft white
          200: '#e7e5e4',  // Light sand
          300: '#d6d3d1',  // Sand
          400: '#a8a29e',  // Mid sand
          500: '#78716c',  // Standard sand
          600: '#57534e',  // Deep sand
          700: '#44403c',  // Dark charcoal
          800: '#292524',  // Charcoal
          900: '#1c1917',  // Deep charcoal
          950: '#0c0a09',  // Deepest charcoal
        },
        grey: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
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
