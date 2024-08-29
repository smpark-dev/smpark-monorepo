'use client';

import { useEffect, useRef } from 'react';

import { STARRY_NIGHT_OPTION } from './constants';
import { StarryNight } from './services/StarryNight';

export const StarryNightCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const starryNight = new StarryNight(STARRY_NIGHT_OPTION);

    const canvas = canvasRef.current;
    if (canvas) {
      starryNight.draw(canvas);
    }

    return () => {
      if (canvas) {
        starryNight.clear(canvas);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className='canvas-layer' />;
};
