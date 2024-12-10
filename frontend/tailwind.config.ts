import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        market: {
          up: '#00c853',
          down: '#ff1744',
        },
        finance: {
          primary: '#2962ff',
          secondary: '#448aff',
          accent: '#00bcd4',
          dark: '#0a1929',
          light: '#e3f2fd',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-market-up': 'linear-gradient(135deg, #00c853 0%, #00e676 100%)',
        'gradient-market-down': 'linear-gradient(135deg, #ff1744 0%, #ff5252 100%)',
        'gradient-primary': 'linear-gradient(135deg, #2962ff 0%, #448aff 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
}

export default config
