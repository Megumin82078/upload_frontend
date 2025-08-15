/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Fountain monochrome palette
        'white': '#ffffff',
        'black': '#000000',
        'gray': {
          '50': '#fafafa',
          '100': '#f5f5f5',
          '200': '#e5e5e5',
          '300': '#d4d4d4',
          '400': '#a3a3a3',
          '500': '#737373',
          '600': '#525252',
          '700': '#404040',
          '800': '#262626',
          '900': '#171717',
        }
      },
      fontFamily: {
        'display': ['Jost', 'Futura', 'system-ui', 'sans-serif'],
        'body': ['Jost', 'Futura', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Monaco', 'monospace'],
        'logo': ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'whisper': '0 1px 3px rgba(0,0,0,0.03)',
        'subtle': '0 4px 6px rgba(0,0,0,0.04)',
        'elegant': '0 10px 15px rgba(0,0,0,0.05)',
        'luxurious': '0 20px 25px rgba(0,0,0,0.08)',
        'majestic': '0 25px 50px rgba(0,0,0,0.12)',
      },
      transitionTimingFunction: {
        'silk': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'fluid': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'luxe': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
      },
      animation: {
        'fade-luxe': 'fadeInLuxe 0.8s ease-out',
      },
      keyframes: {
        fadeInLuxe: {
          'from': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.98)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0) scale(1)'
          }
        }
      }
    },
  },
  plugins: [],
}