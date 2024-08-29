import { DEFAULT_SHOOTING_STAR } from '../constants';

import ShootingStar from './ShootingStar';

class ShootingStarBuilder {
  private starSize = DEFAULT_SHOOTING_STAR.starSize;
  private clear = false;

  setShootingStarSize(size: number) {
    this.starSize = size;
    return this;
  }

  clearShootingStar(state: boolean) {
    this.clear = state;
    return this;
  }

  build(canvas: HTMLCanvasElement): ShootingStar {
    return new ShootingStar(canvas, this.starSize, this.clear);
  }
}

export default ShootingStarBuilder;
