import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '320px',   // Móvil muy pequeño
      'sm': '375px',   // Móvil estándar  
      'md': '744px',   // Tablet
      'lg': '1080px',  // Desktop pequeño
      'xl': '1440px',  // Desktop grande
      'xxl': '1700px',  // Desktop extra grande
    },
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          500: '#f97316',
          600: '#ea580c',
        },
        ocean: {
          50: '#f0f9ff',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero': "url('/landing/bg.jpg')",
        'fishing-11': "url('/landing/11.png')",
        'fishing-01': "url('/landing/01.png')",
        'fishing-02': "url('/landing/02.jpeg')",
        'fishing-03': "url('/landing/03.JPG')",
      },
      animation: {
        'wave-slow': 'wave 6s ease-in-out infinite',
        'wave-fast': 'wave 4s ease-in-out infinite reverse',
        'float': 'float 3s ease-in-out infinite',
        'drift': 'drift 8s linear infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { 
            transform: 'translateX(-100px) translateY(0px) scale(1)',
            opacity: '0.7'
          },
          '50%': { 
            transform: 'translateX(100px) translateY(-20px) scale(1.1)',
            opacity: '0.9'
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.6'
          },
          '50%': { 
            transform: 'translateY(-15px) rotate(2deg)',
            opacity: '0.8'
          },
        },
        drift: {
          '0%': { 
            transform: 'translateX(-50px) translateY(10px)',
            opacity: '0.5'
          },
          '25%': { 
            transform: 'translateX(50px) translateY(-5px)',
            opacity: '0.7'
          },
          '50%': { 
            transform: 'translateX(30px) translateY(15px)',
            opacity: '0.6'
          },
          '75%': { 
            transform: 'translateX(-20px) translateY(-10px)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'translateX(-50px) translateY(10px)',
            opacity: '0.5'
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;