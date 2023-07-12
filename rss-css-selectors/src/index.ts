import { App } from './components/app/app';
import { data } from './data';
import { TagType } from './types';

class Planet {
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

const app = new App(data);
app.start();
