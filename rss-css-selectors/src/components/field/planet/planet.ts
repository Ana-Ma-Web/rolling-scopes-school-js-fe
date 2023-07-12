import { TagType } from '../../../types';
import './planet.css';

export class Planet {
  constructor({
    tagName = 'planet' as string,
    shape = 0 as number,
    texture = 1 as number,
    classes = '' as string | null,
    innerTags = null as TagType[] | null,
    isMove = false as boolean,
  }: Partial<TagType>) {
    Object.assign(this, {
      tagName,
      shape,
      texture,
      classes,
      innerTags,
      isMove,
    });
  }
}
