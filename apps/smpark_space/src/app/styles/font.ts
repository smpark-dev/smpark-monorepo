import { Nanum_Gothic_Coding, Josefin_Sans, Didact_Gothic } from 'next/font/google';

const nanumGothicCoding = Nanum_Gothic_Coding({
  subsets: ['latin'],
  weight: ['400', '700'],
});
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
  display: 'swap',
});
const didactGothic = Didact_Gothic({
  subsets: ['latin'],
  weight: ['400'],
});

export { josefinSans, nanumGothicCoding, didactGothic };
