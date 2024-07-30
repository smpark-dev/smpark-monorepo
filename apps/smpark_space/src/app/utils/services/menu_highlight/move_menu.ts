interface SectionElement extends HTMLElement {
  id: string;
}

class MoveMenuSection {
  start(targetId: string, sections: HTMLDivElement[], portfolio: HTMLDivElement): void {
    const targetSection = sections.find((item) => item.id === targetId);

    if (targetSection) {
      if (sections.indexOf(targetSection) === 0) {
        this.moveScrollHome(portfolio);
      } else {
        this.moveScrollMenu(portfolio, targetSection);
      }
    }
  }

  private moveScrollMenu(portfolio: HTMLElement, item: SectionElement): void {
    portfolio.scrollTo({
      top: item.getBoundingClientRect().top + portfolio.scrollTop,
      behavior: 'smooth',
    });
  }

  private moveScrollHome(portfolio: HTMLElement): void {
    portfolio.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export default MoveMenuSection;
