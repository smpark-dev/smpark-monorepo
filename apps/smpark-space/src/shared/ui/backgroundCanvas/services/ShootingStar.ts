import * as starFunc from '../helpers';

interface IShootingStarProps {
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
  private ctx: CanvasRenderingContext2D | null;
  private clear: boolean;
  private starSize: number;
  private shootingStar: IShootingStarProps | null;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement, starSize: number, clear: boolean) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.clear = clear;
    this.starSize = starSize;
    this.shootingStar = null;

    if (this.clear) {
      this.cleanup();
      return;
    }

    this.init();
  }

  private init(): void {
    this.createShootingStar();
    this.animateShootingStar();
  }

  private cleanup() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private createShootingStar(): void {
    const shootingStar: IShootingStarProps = {
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
    if (this.shootingStar && this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(
        this.shootingStar.x,
        this.shootingStar.y,
        this.shootingStar.radius,
        0,
        Math.PI * 2,
      );
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
      (this.shootingStar.x < 0 ||
        this.shootingStar.x > this.canvas.width ||
        this.shootingStar.y > this.canvas.height)
    ) {
      this.createShootingStar();
    }

    this.animationFrameId = requestAnimationFrame(this.animateShootingStar);
  };
}

export default ShootingStar;
