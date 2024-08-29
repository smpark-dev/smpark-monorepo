import { Noto_Sans, Josefin_Sans, Inconsolata } from 'next/font/google';

export const notoSans = Noto_Sans({
  subsets: ['latin'],
  style: 'normal',
  weight: '400',
  display: 'swap',
  variable: '--font-noto',
  preload: false,
});
export const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-josefin',
  preload: true,
});
export const inconsolata = Inconsolata({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-inconsolata',
  preload: true,
});
