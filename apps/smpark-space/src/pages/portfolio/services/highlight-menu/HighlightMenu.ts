export class HighlightMenu {
  private sections: Element[];
  private onObserveTarget: (id: string) => void;
  private observer: IntersectionObserver;

  constructor(sections: Element[], onObserveTarget: (id: string) => void) {
    this.sections = sections;
    this.onObserveTarget = onObserveTarget;
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // 뷰포트의 중간 50%만 고려
      threshold: [0, 1], // 진입 시작과 완전히 들어왔을 때만 콜백 호출
    });
  }

  on(): void {
    this.sections.forEach((dom) => this.observer.observe(dom));
  }

  off(): void {
    this.observer.disconnect();
  }

  private handleIntersection: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 요소가 관찰 영역(뷰포트의 중간 50%)에 들어왔을 때
        this.onObserveTarget(entry.target.id);
      }
    });
  };
}
