import debounce from '@/app/utils/helpers/debounce';
import * as starFunc from './common_functions';

const BACKGROUND_COLOR = 'rgba(2, 2, 14, 0.3)';

interface Star {
  x: number;
  y: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
  opacity: number;
}

export default class MilkyWayBuilder {
  private starCount: number = 100; // 기본 값 설정
  private starSize: number = 1; // 기본 값 설정
  private clear: string = '';

  setStarCount(count: number): this {
    this.starCount = count;
    return this;
  }

  setStarSize(size: number): this {
    this.starSize = size;
    return this;
  }

  clearStars(state: string): this {
    this.clear = state;
    return this;
  }

  build(canvas: HTMLCanvasElement): MilkyWay {
    return new MilkyWay(canvas, this.starCount, this.starSize, this.clear);
  }
}

let animationFrameId: number | null = null;

class MilkyWay {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private initialStarCount: number;
  private starCount: number;
  private starSize: number;
  private clear: string;
  private milkyWay: Star[];

  constructor(canvas: HTMLCanvasElement, starCount: number, starSize: number, clear: string) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d')!;
    this.initialStarCount = starCount;
    this.starCount = starFunc.convertStarCount(this.canvas.width, starCount);
    this.starSize = starSize;
    this.clear = clear;
    this.milkyWay = [];
    if (this.clear === 'clear') {
      cancelAnimationFrame(animationFrameId as number);
      return;
    }
    this.resizeCanvas();

    this.init();
  }

  private init(): void {
    this.createStars();
    this.animate();
  }

  private resizeCanvas(): void {
    const debouncedResize = debounce(() => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.starCount = starFunc.convertStarCount(this.canvas.width, this.initialStarCount);
      this.milkyWay = [];
      this.createStars();
    }, 200);

    window.addEventListener('resize', debouncedResize);
  }

  private createStars(): void {
    for (let num = 0; num < this.starCount; num++) {
      const star: Star = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: starFunc.randomStarSize(this.starSize),
        startAngle: 0,
        endAngle: Math.PI * 2,
        color: starFunc.randomStarColor(),
        opacity: starFunc.randomStarOpacity(),
      };

      this.milkyWay.push(star);
    }
  }

  private animate = (): void => {
    this.drawBackground();
    this.drawStars();

    animationFrameId = requestAnimationFrame(this.animate);
    if (this.clear === 'clear') {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      return;
    }
  };

  private drawBackground(): void {
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawStars(): void {
    this.milkyWay.forEach((star) => {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, star.startAngle, star.endAngle);
      this.ctx.fillStyle = `${star.color}${starFunc.randomStarOpacity()}`;
      this.ctx.fill();
    });
  }
}
