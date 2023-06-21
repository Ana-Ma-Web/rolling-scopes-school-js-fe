import { Tag } from '../../helpers/tag';
import { Data } from '../../types';

export class App {
  constructor(private data: Data) {
    this.data = data;
  }

  private printField(): void {
    const { curLvl, levels } = this.data;
    const field = document.querySelector('.field');

    if (!field) throw new Error('No game field');

    let string = '';
    levels[curLvl - 1].table.forEach((e) => {
      const tag = new Tag(e);
      string += tag.createTagString(e);
    });

    field.innerHTML = string;
  }

  private printHtmlViewer(): void {
    const { curLvl, levels } = this.data;
    const field = document.querySelector('.html-viewer');

    if (!field) throw new Error('No html viewer');

    levels[curLvl - 1].table.forEach((e) => {
      const tag = new Tag(e);
      tag.printTagHtml(field, e);
    });
  }

  public start(): void {
    this.printField();
    this.printHtmlViewer();
  }
}
