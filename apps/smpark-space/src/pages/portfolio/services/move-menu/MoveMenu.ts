export class MoveMenu {
  targetId: string;
  sections: HTMLDivElement[];
  header?: HTMLDivElement;

  constructor(targetId: string, sections: HTMLDivElement[], header?: HTMLDivElement) {
    this.targetId = targetId;
    this.sections = sections;
    this.header = header;
  }

  start(): void {
    const targetSection = this.sections.find((item) => item.id === this.targetId);

    if (targetSection) {
      if (this.sections.indexOf(targetSection) === 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        this.moveScrollMenu(targetSection);
      }
    }
  }

  private moveScrollMenu(targetSection: Element): void {
    const headerHeight = this.header ? this.header.offsetHeight : 0;
    window.scrollTo({
      top: targetSection.getBoundingClientRect().top + window.scrollY - headerHeight,
      behavior: 'smooth',
    });
  }
}
