import { Data, TagType } from '../../types';
import './field.css';
import './field-items.css';

export class Field {
  constructor(private data: Data) {
    this.data = data;
  }

  private createTagString(tag: TagType): string {
    const name = tag.tagName;
    const { classes, shape, texture, isMove } = tag;
    let innerTags = '';
    const paired = !!tag.innerTags?.length;

    if (innerTags !== null) {
      tag.innerTags?.forEach((e) => {
        innerTags += this.createTagString(e);
      });
    }

    const closedName = `> ${innerTags} </${name}>`;

    return `<${name} data-shape="${shape}" data-move="${isMove}" data-texture="${texture}" class="${classes}" ${
      paired ? closedName : `></${name}>`
    }`;
  }

  public printField(): void {
    const { activeLvl, levels } = this.data;
    const field = document.querySelector('.field');

    if (!field) throw new Error('No game field');

    let string = '';
    levels[activeLvl - 1].table.forEach((e) => {
      string += this.createTagString(e);
    });

    field.innerHTML = string;
  }
}
