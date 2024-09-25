export class RocketGuide {
  private element: HTMLElement;
  private window: Window;
  private prevHeight: number;
  private boundRender: () => void;

  constructor(element: HTMLElement) {
    this.element = element;
    this.window = window;
    this.prevHeight = 0;
    this.boundRender = this.render();
  }

  start() {
    this.window.addEventListener('scroll', this.boundRender);
  }

  end() {
    this.window.removeEventListener('scroll', this.boundRender);
  }

  private render() {
    return () => {
      const rocket = this.element.childNodes[1];
      if (!(rocket instanceof HTMLElement)) {
        return;
      }

      const distance = this.getRocketMoveDistancePixel();
      const rotate = this.getRocketRotate();

      const newTransform = `translateX(${distance}px) ${rotate}`;
      if (rocket.style.transform !== newTransform) {
        rocket.style.transform = newTransform;
      }

      const currHeight = this.window.scrollY;

      if (currHeight > 0) this.prevHeight = currHeight;
    };
  }

  private getScrollHeightPercent(): number {
    const pageTotalHeight = document.documentElement.scrollHeight;
    const currHeight = this.window.scrollY;
    const currentViewHeight = this.window.innerHeight;
    const remainTotalHeight = pageTotalHeight - currentViewHeight;

    return Math.floor((currHeight / remainTotalHeight) * 100);
  }

  private getTravelLoadOnePercentPixel(): number {
    const rocket = this.element.childNodes[0];
    const earth = this.element.childNodes[1];
    const mars = this.element.childNodes[2];

    if (
      !(rocket instanceof HTMLElement) ||
      !(earth instanceof HTMLElement) ||
      !(mars instanceof HTMLElement)
    ) {
      return 0;
    }

    const rocketWidth = rocket.getBoundingClientRect().width;
    const earthWidth = earth.getBoundingClientRect().width;
    const marsWidth = mars.getBoundingClientRect().width;

    const totalImgWidth = rocketWidth + earthWidth + marsWidth;
    const travelRoadWidth = this.element.clientWidth;

    return (travelRoadWidth - totalImgWidth) / 100;
  }

  private getRocketMoveDistancePixel(): number {
    const scrollYPercent = this.getScrollHeightPercent();
    const xOnePercentPixel = this.getTravelLoadOnePercentPixel();

    return scrollYPercent * xOnePercentPixel;
  }

  private getRocketRotate(): string {
    return this.window.scrollY > this.prevHeight ? 'rotate(0deg)' : 'rotate(180deg)';
  }
}
