import { Data, TagType } from '../../types';
import './field.css';
import './field-popup.css';

export class Field {
  constructor(private data: Data) {
    this.data = data;
  }

  private createTagString(
    tag: TagType,
    index: number,
    prevIndex?: number,
  ): string {
    const name = tag.tagName;
    const { classes, shape, texture, isMove } = tag;
    let innerTags = '';
    const paired = !!tag.innerTags?.length;

    if (innerTags !== null) {
      tag.innerTags?.forEach((e, i) => {
        innerTags += this.createTagString(e, index, i + 1);
      });
    }

    const closedName = `> ${innerTags} </${name}>`;

    return `<${name} class="${classes}" data-type="planet" data-key="p${
      name === 'planet' ? `${index}` : `${index}${prevIndex}`
    }" data-shape="${shape}" data-move="${isMove}" 
    data-texture="${texture}" ${paired ? closedName : `></${name}>`}`;
  }

  public updateField(): void {
    this.printField();
  }

  public printField(): void {
    const { activeLvl, levels } = this.data;
    const field = document.querySelector('.field');
    const fieldSpace = document.createElement('div');
    fieldSpace.classList.add('field__space');

    if (!field) throw new Error('No game field');

    field.innerHTML = '';

    let string = '';
    levels[activeLvl - 1].table.forEach((e, i) => {
      string += this.createTagString(e, i + 1);
    });

    fieldSpace.innerHTML = string;
    field.append(fieldSpace);
  }
}
