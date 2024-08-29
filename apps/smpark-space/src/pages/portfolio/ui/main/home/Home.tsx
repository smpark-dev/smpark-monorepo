'use client';

import mainImage from '@public/imgs/smpark2.webp';
import Image, { StaticImageData } from 'next/image';
import { Fragment, useEffect, useState } from 'react';

import { HOME } from '@/pages/portfolio/constants';
import { useHandleEnter } from '@/shared/model';
import { Button } from '@/shared/ui';

type AnimationState = keyof typeof HOME.ANIMATION.STATES;

export const Home: React.FC = () => {
  const [rotate, setRotate] = useState<AnimationState>(HOME.ANIMATION.STATES.INIT);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState<StaticImageData[]>([mainImage]);

  const createRandomNumber = (): number => Math.floor(Math.random() * HOME.IMAGES_URL.length);

  const getNewRandomIndex = (index: number): number => {
    const newIndex = createRandomNumber();
    return newIndex === index ? getNewRandomIndex(index) : newIndex;
  };

  const handleNextRandomImage = () => {
    setRotate(HOME.ANIMATION.STATES.ROTATING);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => getNewRandomIndex(prevIndex));
      setRotate(HOME.ANIMATION.STATES.PAUSED);
    }, HOME.ANIMATION.ROTATE_DELAY);
  };

  const handleEnter = useHandleEnter(handleNextRandomImage);

  const getRotationClass = (status: AnimationState): string => {
    return HOME.ANIMATION.CLASSES[status];
  };

  useEffect(() => {
    let isMounted = true;
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        HOME.IMAGES_URL.map(async (path) => {
          const imageModule = await import(`../../../../../../public${path}`);
          return imageModule.default;
        }),
      );

      if (isMounted) {
        setImages((prevImg) => [...prevImg, ...loadedImages]);
      }
    };

    loadImages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id={HOME.ID}
      className='portfolioSection p-12 rounded-2xl bg-transparency-primary uppercase max-md:py-15 font-josefin'
    >
      <h1 className='text-5xl font-thin tracking-[0.5rem] mt-7 mb-10 max-md:text-3xl max-md:mb-11 max-xs:text-2xl max-xs:tracking-[0.3rem] max-xxs:text-lg'>
        {HOME.TITLE} <br />
      </h1>
      <div className='relative w-full max-w-[243px] aspect-[243/300] mx-auto'>
        {images.map((item, index) => (
          <Button
            key={item.src}
            onClick={() => rotate !== HOME.ANIMATION.STATES.ROTATING && handleNextRandomImage()}
            onKeyDown={(e) => rotate !== HOME.ANIMATION.STATES.ROTATING && handleEnter(e)}
            className={`absolute inset-0 ${currentIndex === index ? 'z-10' : 'z-0'}`}
          >
            <Image
              src={item}
              alt={HOME.IMAGE_ALT(currentIndex)}
              fill
              sizes='(max-width: 243px) 100vw, 243px'
              className={`object-cover select-none rounded-[20px] ${
                rotate !== 'ROTATING' ? 'cursor-pointer' : ''
              } ${getRotationClass(rotate)}`}
              placeholder='blur'
            />
          </Button>
        ))}
      </div>

      <h2 className='mt-10 mb-3 tracking-[0.125em] text-sm leading-[30px] font-noto'>
        {HOME.WELCOME_MESSAGE.map((line) => (
          <Fragment key={line}>
            {line} <br />
          </Fragment>
        ))}
      </h2>
    </section>
  );
};
