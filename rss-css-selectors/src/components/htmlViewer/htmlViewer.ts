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

  private createHtmlElement(props: {
    name: string;
    classes: string | null;
    paired: boolean;
    tag: TagType;
    index: string;
    prevIndex?: string;
  }): HTMLElement {
    const { name, classes, paired, tag, index, prevIndex } = props;
    const wrapperElement = document.createElement('span');

    wrapperElement.innerHTML += '<';
    wrapperElement.append(this.createNameElement(name));
    wrapperElement.append(classes ? this.createClassElement(classes) : '');
    wrapperElement.innerHTML += paired ? '>' : '/>';

    const tagElement = document.createElement('div');
    tagElement.classList.add('html-line');
    tagElement.dataset.key = prevIndex ? `h${index}${prevIndex}` : `h${index}`;

    tagElement.append(wrapperElement);
    tag.innerTags?.forEach((e, i) => {
      this.printHtmlViewerTag({
        root: tagElement,
        tag: e,
        index,
        prevIndex: String(i + 1),
      });
    });

    if (paired) {
      tagElement.innerHTML += '</';
      tagElement.append(this.createNameElement(name));
      tagElement.innerHTML += '>';
      tagElement.innerHTML += `</${name}>`;
    }

    return tagElement;
  }

  private printHtmlViewerTag(props: {
    root: Element;
    tag: TagType;
    index: string;
    prevIndex?: string;
  }): void {
    const { root, tag, index, prevIndex } = props;
    const name = tag.tagName;
    const { classes } = tag;
    const paired = !!tag.innerTags?.length;

    root.append(
      this.createHtmlElement({ name, classes, paired, tag, index, prevIndex }),
    );
  }

  public updateHtmlViewer(): void {
    this.printHtmlViewer();
  }

  public printHtmlViewer(): void {
    const { activeLvl, levels } = this.data;
    const field = document.querySelector('.html-viewer');

    if (!field) throw new Error('No html viewer');

    field.innerHTML = '';
    levels[activeLvl - 1].table.forEach((e, index) => {
      this.printHtmlViewerTag({
        root: field,
        tag: e,
        index: String(index + 1),
      });
    });
  }
}
