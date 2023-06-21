import { TagType } from '../types';

export class Tag {
  constructor(private tagData: TagType) {
    this.tagData = tagData;
  }

  public createTagString(tag: TagType): string {
    const name = tag.tagName;
    const { classes } = tag;
    let innerTags = '';
    const paired = !!tag.innerTags?.length;

    tag.innerTags?.forEach((e) => {
      innerTags += this.createTagString(e);
    });

    const closedName = `> ${innerTags} </${name}>`;

    return `<${name} class="${classes}" ${paired ? closedName : '/>'}`;
  }

  public printTagHtml(root: Element, tag: TagType): void {
    const name = tag.tagName;
    const { classes } = tag;
    const classString = classes ? `class="${classes}"` : '';
    const paired = !!tag.innerTags?.length;

    const tagElement = document.createElement('div');
    tagElement.append(`<${name} ${classString} ${paired ? `>` : `/>`}`);

    tag.innerTags?.forEach((e) => {
      this.printTagHtml(tagElement, e);
    });

    tagElement.append(`${paired ? `</${name}>` : ''}`);

    root.append(tagElement);
  }
}
