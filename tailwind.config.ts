import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#FFFBF0',
          ink: '#0A0A0A',
          yellow: '#FFE500',
          pink: '#FF5CDB',
          cyan: '#2DE2FF',
          lime: '#B6FF3B',
          orange: '#FF8A3D',
          violet: '#A68BFF',
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderWidth: {
        3: '3px',
        5: '5px',
      },
      outlineWidth: {
        3: '3px',
      },
      boxShadow: {
        'neo-sm': '3px 3px 0px 0px rgba(0,0,0,1)',
        neo: '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-md': '6px 6px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'neo-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
