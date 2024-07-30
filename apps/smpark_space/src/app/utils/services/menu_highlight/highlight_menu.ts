interface SectionElement extends HTMLElement {
  id: string;
  nextElementSibling: SectionElement | null;
  previousElementSibling: SectionElement | null;
}

interface OnObserveTarget {
  (id: string): void;
}

class HighlightMenuList {
  on(sections: HTMLDivElement[], onObserveTarget: OnObserveTarget): void {
    // const REQUEST_THRESHOLD = 0.26;
    const REQUEST_THRESHOLD = 0.5;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: REQUEST_THRESHOLD,
      //this.getThresholdMinimumNumber(sections, REQUEST_THRESHOLD), 현재 사용 X
    };
    const observer = new IntersectionObserver(this.callback(onObserveTarget), options);

    sections.forEach((dom) => observer.observe(dom));
  }

  private callback(onObserveTarget: OnObserveTarget): IntersectionObserverCallback {
    return (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as SectionElement;

        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
          this.setElementByObserve(onObserveTarget, target, entry.boundingClientRect.y);
        } else if (entry.isIntersecting && entry.intersectionRatio > 0) {
          this.setElementByObserve(onObserveTarget, target);
        }
      });
    };
  }

  private setElementByObserve(onObserveTarget: OnObserveTarget, target: SectionElement, y?: number): void {
    if (y !== undefined) {
      if (y < 0 && target.nextElementSibling) {
        onObserveTarget(target.nextElementSibling.id);
      } else if (y > 0 && target.previousElementSibling) {
        onObserveTarget(target.previousElementSibling.id);
      } else {
        onObserveTarget(target.id);
      }
    } else {
      onObserveTarget(target.id);
    }
  }

  // 현재 사용 X
  private getThresholdMinimumNumber(sections: HTMLDivElement[], threshold: number): number {
    const browserHeight = window.innerHeight;
    const highestSectionHeight = Math.max(...sections.map((dom) => dom.getBoundingClientRect().height));
    const minimumThreshold = browserHeight / highestSectionHeight;
    return minimumThreshold < threshold ? parseFloat((minimumThreshold - 0.03).toFixed(2)) : threshold;
  }
}

export default HighlightMenuList;
