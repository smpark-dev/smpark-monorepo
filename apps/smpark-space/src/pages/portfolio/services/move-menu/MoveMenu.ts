export class MoveMenu {
  targetId: string;
  sections: HTMLDivElement[];
  container: HTMLDivElement;
  header?: HTMLDivElement;

  constructor(
    targetId: string,
    sections: HTMLDivElement[],
    container: HTMLDivElement,
    header?: HTMLDivElement,
  ) {
    this.targetId = targetId;
    this.sections = sections;
    this.container = container;
    this.header = header;
  }

  start(): void {
    const targetSection = this.sections.find((item) => item.id === this.targetId);

    if (targetSection) {
      if (this.sections.indexOf(targetSection) === 0) {
        this.moveScrollHome();
      } else {
        this.moveScrollMenu(targetSection);
      }
    }
  }

  private moveScrollMenu(targetSection: Element): void {
    const headerHeight = this.header ? this.header.offsetHeight : 0;
    this.container.scrollTo({
      top: targetSection.getBoundingClientRect().top + this.container.scrollTop - headerHeight,
      behavior: 'smooth',
    });
  }

  private moveScrollHome(): void {
    this.container.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
