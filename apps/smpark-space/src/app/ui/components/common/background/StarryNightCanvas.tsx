'use client';
import StarryNight from 'apps/smpark-space/src/app/utils/services/starry_night/main';
import { useEffect, useMemo, useRef } from 'react';
import styles from './starryNightCanvas.module.css';

const StarryNightCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starryNight = useMemo(() => new StarryNight(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      starryNight.draw(canvas);
    }

    return () => {
      if (canvas) {
        starryNight.clear(canvas);
      }
    };
  }, [starryNight]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

export default StarryNightCanvas;
