'use client';

import { Fragment } from 'react';

import { HOME } from '@/pages/portfolio/constants';
import { ImageCard } from '@/widgets/gallery/ui/ImageCard';

export const Home = () => {
  return (
    <section
      id={HOME.ID}
      className='portfolioSection p-12 rounded-2xl bg-transparency-primary uppercase max-md:py-15 font-josefin'
    >
      <h1 className='text-5xl font-thin tracking-[0.5rem] mt-7 mb-12 max-md:text-3xl max-md:mb-11 max-xs:text-2xl max-xs:tracking-[0.3rem] max-xxs:text-lg'>
        {HOME.TITLE} <br />
      </h1>
      <div className='relative w-full max-w-[243px] aspect-[243/300] mx-auto'>
        <ImageCard />
      </div>

      <h2 className='mt-12 mb-7 tracking-[0.125em] underline text-sm leading-[30px] font-noto italic text-gray-400'>
        {HOME.WELCOME_MESSAGE.map((line) => (
          <Fragment key={line}>
            {line} <br />
          </Fragment>
        ))}
      </h2>
    </section>
  );
};
