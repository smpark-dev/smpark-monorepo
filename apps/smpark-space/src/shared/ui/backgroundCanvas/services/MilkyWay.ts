import { debounce } from '@/shared/utils';

import * as starFunc from '../helpers';
import { BACKGROUND_COLOR } from '../constants';

interface IStar {
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
  opacity: number;
}

export class MilkyWay {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private initialStarCount: number;
  private starCount: number;
  private starSize: number;
  private clear: boolean;
  private milkyWay: IStar[];
  private animationFrameId: number | null = null;
  private debouncedResize: () => void;

  constructor(canvas: HTMLCanvasElement, starCount: number, starSize: number, clear: boolean) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.initialStarCount = starCount;
    this.starCount = starFunc.convertStarCount(this.canvas.width, starCount);
    this.starSize = starSize;
    this.clear = clear;
    this.milkyWay = [];
    this.debouncedResize = debounce(() => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.starCount = starFunc.convertStarCount(this.canvas.width, this.initialStarCount);
      this.milkyWay = [];
      this.createStars();
    }, 200);

    if (this.clear) {
      this.cleanup();
      return;
    }

    this.init();
  }

  private init(): void {
    window.addEventListener('resize', this.debouncedResize);
    this.createStars();
    this.animate();
  }

  private cleanup() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.debouncedResize);
  }

  private createStars(): void {
    this.milkyWay = Array.from({ length: this.starCount }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      radius: starFunc.randomStarSize(this.starSize),
      startAngle: 0,
      endAngle: Math.PI * 2,
      color: starFunc.randomStarColor(),
      opacity: starFunc.randomStarOpacity(),
    }));
  }

  private animate = (): void => {
    this.drawBackground();
    this.drawStars();

    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  private drawBackground(): void {
    if (!this.ctx) {
      return;
    }
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawStars(): void {
    this.milkyWay.forEach((star) => {
      if (this.ctx) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, star.startAngle, star.endAngle);
        this.ctx.fillStyle = `${star.color}${starFunc.randomStarOpacity()}`;
        this.ctx.fill();
      }
    });
  }
}
