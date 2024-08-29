import { DEFAULT_STARRY_NIGHT } from '../constants';

import MilkyWayBuilder from './MilkyWayBuilder';
import ShootingStarBuilder from './ShootingStarBuilder';

interface IStarryNightOptions {
  starCount: number;
  starSize: number;
  shootingStarSize: number;
}

export class StarryNight {
  private options: IStarryNightOptions;
  private milkyWayBuilder: MilkyWayBuilder | null = null;

  constructor(options: Partial<IStarryNightOptions> = {}) {
    this.options = {
      starCount: options.starCount ?? DEFAULT_STARRY_NIGHT.starCount,
      starSize: options.starSize ?? DEFAULT_STARRY_NIGHT.starSize,
      shootingStarSize: options.shootingStarSize ?? DEFAULT_STARRY_NIGHT.shootingStarSize,
    };
  }

  draw(canvas: HTMLCanvasElement) {
    this.milkyWayBuilder = new MilkyWayBuilder();
    this.milkyWayBuilder
      .setStarCount(this.options.starCount)
      .setStarSize(this.options.starSize)
      .build(canvas);

    new ShootingStarBuilder() //
      .setShootingStarSize(this.options.shootingStarSize) //
      .build(canvas);
  }

  clear(canvas: HTMLCanvasElement) {
    this.milkyWayBuilder = new MilkyWayBuilder();
    this.milkyWayBuilder //
      .clearStars(true)
      .build(canvas);

    new ShootingStarBuilder() //
      .clearShootingStar(true)
      .build(canvas);
  }
}
