export default class RocketGuide {
  private element: HTMLElement;
  private portfolio: HTMLElement;
  private prevHeight: number;

  constructor(element: HTMLElement, portfolio: HTMLElement) {
    this.element = element;
    this.portfolio = portfolio;
    this.prevHeight = 0;
  }

  start() {
    this.portfolio.addEventListener('scroll', this.render(this.element));
  }

  private render(element: HTMLElement) {
    return () => {
      const rocket = element.childNodes[1];
      if (!(rocket instanceof HTMLElement)) {
        return;
      }

      const currHeight = this.portfolio.scrollTop;

      const distance = this.getRocketMoveDistancePixel(element, this.portfolio);
      const rotate = this.getRocketRotate(this.prevHeight, currHeight);

      const newTransform = `translateX(${distance}px) ${rotate}`;
      if (rocket.style.transform !== newTransform) {
        rocket.style.transform = newTransform;
      }

      if (currHeight > 0) this.prevHeight = currHeight;
    };
  }

  private getScrollHeightPercent(portfolio: HTMLElement): number {
    const pageTotalHeight = portfolio.scrollHeight;
    const currHeight = portfolio.scrollTop;
    const currentViewHeight = window.innerHeight;
    const remainTotalHeight = pageTotalHeight - currentViewHeight;

    return Math.floor((currHeight / remainTotalHeight) * 100);
  }

  private getTravelLoadOnePercentPixel(element: HTMLElement): number {
    const rocket = element.childNodes[0];
    const earth = element.childNodes[1];
    const mars = element.childNodes[2];

    if (!(rocket instanceof HTMLElement) || !(earth instanceof HTMLElement) || !(mars instanceof HTMLElement)) {
      return 0;
    }

    const rocketWidth = rocket.getBoundingClientRect().width;
    const earthWidth = earth.getBoundingClientRect().width;
    const marsWidth = mars.getBoundingClientRect().width;

    const totalImgWidth = rocketWidth + earthWidth + marsWidth;
    const travelRoadWidth = element.clientWidth;

    return (travelRoadWidth - totalImgWidth) / 100;
  }

  private getRocketMoveDistancePixel(element: HTMLElement, portfolio: HTMLElement): number {
    const scrollYPercent = this.getScrollHeightPercent(portfolio);
    const xOnePercentPixel = this.getTravelLoadOnePercentPixel(element);

    return scrollYPercent * xOnePercentPixel;
  }

  private getRocketRotate(prevScrollHeight: number, currScrollHeight: number): string {
    return currScrollHeight > prevScrollHeight ? 'rotate(0deg)' : 'rotate(180deg)';
  }
}
