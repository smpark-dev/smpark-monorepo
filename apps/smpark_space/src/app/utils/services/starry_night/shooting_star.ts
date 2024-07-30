import * as starFunc from './common_functions';

export default class ShootingStarBuilder {
  private starSize: number = 1;
  private clear: string = '';

  setShootingStarSize(size: number) {
    this.starSize = size;
    return this;
  }

  clearShootingStar(state: string) {
    this.clear = state;
    return this;
  }

  build(canvas: HTMLCanvasElement): ShootingStar {
    return new ShootingStar(canvas, this.starSize, this.clear);
  }
}

let animationFrameId: number | null = null;

interface ShootingStarProps {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
}

class ShootingStar {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private clear: string;
  private starSize: number;
  private shootingStar: ShootingStarProps | null;

  constructor(canvas: HTMLCanvasElement, starSize: number, clear: string) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d')!;
    this.clear = clear;
    this.starSize = starSize;
    this.shootingStar = null;

    if (this.clear === 'clear') {
      cancelAnimationFrame(animationFrameId as number);
      return;
    }

    this.init();
  }

  private init(): void {
    this.createShootingStar();
    this.animateShootingStar();
  }

  private createShootingStar(): void {
    const shootingStar: ShootingStarProps = {
      x: this.canvas.width * Math.random(),
      y: 0,
      velocityX: Math.random() * 12,
      velocityY: (Math.random() + 0.3) * 5,
      radius: starFunc.randomShootingStarSize(this.starSize),
      startAngle: 0,
      endAngle: Math.PI * 2,
      color: starFunc.randomStarColor(),
    };

    this.shootingStar = shootingStar;
  }

  private drawShootingStar(): void {
    if (this.shootingStar) {
      this.ctx.beginPath();
      this.ctx.arc(this.shootingStar.x, this.shootingStar.y, this.shootingStar.radius, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.fillStyle = this.shootingStar.color;
      this.ctx.fill();
    }
  }

  private moveShootingStar(): void {
    if (this.shootingStar) {
      const vx = Math.floor(this.shootingStar.velocityX);

      if (vx % 2 === 0) {
        // 좌로 이동
        this.shootingStar.x -= this.shootingStar.velocityX;
      } else {
        // 우로 이동
        this.shootingStar.x += this.shootingStar.velocityX;
      }
      // 낙하 속도
      this.shootingStar.y += this.shootingStar.velocityY;
    }
  }

  private animateShootingStar = (): void => {
    this.drawShootingStar();
    this.moveShootingStar();

    if (
      this.shootingStar &&
      (this.shootingStar.x < 0 || this.shootingStar.x > this.canvas.width || this.shootingStar.y > this.canvas.height)
    ) {
      this.createShootingStar();
    }

    animationFrameId = requestAnimationFrame(this.animateShootingStar);

    if (this.clear === 'clear') {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      return;
    }
  };
}
