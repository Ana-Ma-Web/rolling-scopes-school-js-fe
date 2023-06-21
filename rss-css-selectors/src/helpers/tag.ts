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
}
