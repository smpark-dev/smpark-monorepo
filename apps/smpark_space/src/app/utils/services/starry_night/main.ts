import MilkyWayBuilder from './milky_way';
import ShootingStarBuilder from './shooting_star';

export default class StarryNight {
  draw(canvas: HTMLCanvasElement) {
    new MilkyWayBuilder() //
      .setStarCount(5)
      .setStarSize(7)
      .build(canvas);

    new ShootingStarBuilder() //
      .setShootingStarSize(8)
      .build(canvas);
  }

  clear(canvas: HTMLCanvasElement) {
    new MilkyWayBuilder() //
      .clearStars('clear')
      .build(canvas);

    new ShootingStarBuilder() //
      .clearShootingStar('clear')
      .build(canvas);
  }
}
