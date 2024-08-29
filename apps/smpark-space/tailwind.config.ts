import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        noto: ['var(--font-noto)'],
        josefin: ['var(--font-josefin)'],
        inconsolata: ['var(--font-inconsolata)'],
      },
      colors: {
        text: '#f5f5f6',
        line: '#bdbdbd',
        primary: '#268BD2',
        secondary: '#ff6863',
        'bg-primary': '#212121',
        'bg-secondary': '#2e3642',
        'scroll-primary': '#181818',
        'scroll-secondary': '#4d4d4d',
        'transparency-primary': 'rgba(45, 45, 52, 0.6)',
        'transparency-secondary': 'rgba(0, 0, 0, 0.3)',
      },
      textColor: {
        DEFAULT: '#f5f5f6',
      },
      screens: {
        'max-2xl': { max: '1535px' },
        'max-xl': { max: '1279px' },
        'max-lg': { max: '1023px' },
        'max-md': { max: '767px' },
        'max-sm': { max: '639px' },
        'max-xs': { max: '479px' },
        'max-xxs': { max: '319px' },
      },
      animation: {
        'menu-slide': 'menuSlide 200ms ease-out',
        'rotate-y-90': 'rotateY90 700ms linear',
        'rotate-y-0': 'rotateY0 1000ms linear',
      },
      keyframes: {
        menuSlide: {
          from: { transform: 'translateX(100px)' },
          to: { transform: 'translateX(0px)' },
        },
        rotateY90: {
          from: { transform: 'rotateY(0deg)' },
          to: { transform: 'rotateY(90deg)' },
        },
        rotateY0: {
          from: { transform: 'rotateY(90deg)' },
          to: { transform: 'rotateY(0deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
