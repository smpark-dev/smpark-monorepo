import { DEFAULT_MILKY_WAY } from '../constants';
import { MilkyWay } from './MilkyWay';

class MilkyWayBuilder {
  private starCount = DEFAULT_MILKY_WAY.starCount; // 기본 값 설정
  private starSize = DEFAULT_MILKY_WAY.starSize; // 기본 값 설정
  private clear = false;

  setStarCount(count: number): this {
    this.starCount = count;
    return this;
  }

  setStarSize(size: number): this {
    this.starSize = size;
    return this;
  }

  clearStars(state: boolean): this {
    this.clear = state;
    return this;
  }

  build(canvas: HTMLCanvasElement): MilkyWay {
    return new MilkyWay(canvas, this.starCount, this.starSize, this.clear);
  }
}

export default MilkyWayBuilder;
