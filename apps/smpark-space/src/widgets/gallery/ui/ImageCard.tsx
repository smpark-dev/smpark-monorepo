'use client';

import mainImage from '@public/imgs/smpark1.webp';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { HOME } from '@/pages/portfolio/constants';
import { useHandleEnter } from '@/shared/model';
import { Button } from '@/shared/ui';

import { useGalleryImages } from '../model/queries/useGalleryImages';

type AnimationState = keyof typeof HOME.ANIMATION.STATES;

export const ImageCard = () => {
  const { data: session, status } = useSession();
  const { data: apiImages } = useGalleryImages(session?.provider === 'smpark');

  const [rotate, setRotate] = useState<AnimationState>(HOME.ANIMATION.STATES.INIT);
  const [currentIndex, setCurrentIndex] = useState(0);

  const createRandomNumber = (): number => Math.floor(Math.random() * (apiImages?.length || 0));

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

  const getRotationClass = (state: AnimationState): string => {
    return HOME.ANIMATION.CLASSES[state];
  };

  return (
    <div className='relative w-full max-w-[243px] aspect-[243/300] mx-auto'>
      {status !== 'authenticated' ? (
        <Image
          src={mainImage}
          alt={HOME.IMAGE_ALT(1)}
          fill
          sizes='(max-width: 243px) 100vw, 243px'
          className='object-cover select-none rounded-[20px]'
          placeholder='blur'
        />
      ) : (
        apiImages?.map((image, index) => (
          <Button
            key={image.name}
            onClick={() => rotate !== HOME.ANIMATION.STATES.ROTATING && handleNextRandomImage()}
            onKeyDown={(e) => rotate !== HOME.ANIMATION.STATES.ROTATING && handleEnter(e)}
            className={`absolute inset-0 ${currentIndex === index ? 'z-10' : 'z-0'}`}
          >
            <Image
              src={image.data}
              alt={HOME.IMAGE_ALT(currentIndex)}
              fill
              sizes='(max-width: 243px) 100vw, 243px'
              className={`object-cover select-none rounded-[20px] ${
                rotate !== 'ROTATING' ? 'cursor-pointer' : ''
              } ${getRotationClass(rotate)}`}
              placeholder='blur'
              blurDataURL={image.blurDataUrl}
            />
          </Button>
        ))
      )}
    </div>
  );
};
