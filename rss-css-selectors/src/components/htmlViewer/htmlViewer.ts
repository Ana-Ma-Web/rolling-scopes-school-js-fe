import { Data, TagType } from '../../types';
import './htmlViewer.css';

export class HtmlViewer {
  constructor(private data: Data) {
    this.data = data;
  }

  private createNameElement(name: string | null): HTMLElement {
    const nameElement = document.createElement('span');
    nameElement.classList.add('html-viewer__name-tag');
    nameElement.textContent = name;
    return nameElement;
  }

  private createClassElement(classes: string | null): HTMLElement {
    const classTagElement = document.createElement('span');
    classTagElement.classList.add('html-viewer__class-tag');
    classTagElement.textContent = ' class';

    const equalsElement = document.createElement('span');
    equalsElement.classList.add('html-viewer__name-tag');
    equalsElement.textContent = '=';

    const classStringElement = document.createElement('span');
    classStringElement.classList.add('html-viewer__str-tag');
    classStringElement.textContent = `"${classes}"`;

    const classElement = document.createElement('span');
    classElement.append(classTagElement, equalsElement, classStringElement);

    return classElement;
  }

  private createHtmlElement(
    name: string,
    classes: string | null,
    paired: boolean,
    tag: TagType,
  ): HTMLElement {
    const wrapperElement = document.createElement('span');

    wrapperElement.innerHTML += '<';
    wrapperElement.append(this.createNameElement(name));
    wrapperElement.append(classes ? this.createClassElement(classes) : '');
    wrapperElement.innerHTML += paired ? '>' : '/>';

    const tagElement = document.createElement('div');

    tagElement.append(wrapperElement);
    tag.innerTags?.forEach((e) => {
      this.printHtmlViewerTag(tagElement, e);
    });

    if (paired) {
      tagElement.innerHTML += '</';
      tagElement.append(this.createNameElement(name));
      tagElement.innerHTML += '>';
      tagElement.innerHTML += `</${name}>`;
    }

    return tagElement;
  }

  private printHtmlViewerTag(root: Element, tag: TagType): void {
    const name = tag.tagName;
    const { classes } = tag;
    const paired = !!tag.innerTags?.length;

    root.append(this.createHtmlElement(name, classes, paired, tag));
  }

  public printHtmlViewer(): void {
    const { activeLvl, levels } = this.data;
    const field = document.querySelector('.html-viewer');

    if (!field) throw new Error('No html viewer');

    levels[activeLvl - 1].table.forEach((e) => {
      this.printHtmlViewerTag(field, e);
    });
  }
}
