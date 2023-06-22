import { Data, TagType } from '../../types';
import './htmlViewer.css';

export class HtmlViewer {
  constructor(private data: Data) {
    this.data = data;
  }

  private printHtmlViewerTag(root: Element, tag: TagType): void {
    const name = tag.tagName;
    const { classes } = tag;
    const classString = classes ? `class="${classes}"` : '';
    const paired = !!tag.innerTags?.length;

    const tagElement = document.createElement('div');
    tagElement.append(`<${name} ${classString} ${paired ? `>` : `/>`}`);

    tag.innerTags?.forEach((e) => {
      this.printHtmlViewerTag(tagElement, e);
    });

    tagElement.append(`${paired ? `</${name}>` : ''}`);

    root.append(tagElement);
  }

  public printHtmlViewer(): void {
    const { curLvl, levels } = this.data;
    const field = document.querySelector('.html-viewer');

    if (!field) throw new Error('No html viewer');

    levels[curLvl - 1].table.forEach((e) => {
      this.printHtmlViewerTag(field, e);
    });
  }
}
