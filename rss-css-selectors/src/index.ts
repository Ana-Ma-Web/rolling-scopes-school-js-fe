// import { App } from './components/app/app';
import { App } from './components/app/app';
import { Data, TagType } from './types';

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

const data: Data = {
  activeLvl: 2,
  levels: [
    {
      status: 'help',
      table: [
        <TagType>(
          new Planet({ key: '1', isMove: true, texture: 2, classes: 'blue' })
        ),
        <TagType>new Planet({ key: '2' }),
        <TagType>(
          new Planet({ key: '3', isMove: true, texture: 2, classes: 'blue' })
        ),
      ],
    },
    {
      status: false,
      table: [
        <TagType>new Planet({ key: '1', texture: 2 }),
        <TagType>new Planet({
          key: '2',
          shape: 1,
          texture: 3,
          innerTags: [<TagType>new Planet({
              key: '21',
              tagName: 'moon',
              texture: 2,
              classes: 'moon',
              isMove: true,
            })],
        }),
        <TagType>new Planet({ key: '3', texture: 2 }),
      ],
    },
  ],

  pushDataToLocalStorage(): void {
    localStorage.setItem(
      'cssSelector-activeLvl',
      JSON.stringify(this.activeLvl),
    );
    localStorage.setItem('cssSelector-levels', JSON.stringify(this.levels));
  },

  pullDataFromLocalStorage(): void {
    const strActiveLvl = localStorage.getItem('cssSelector-activeLvl');
    const strLevels = localStorage.getItem('cssSelector-levels');
    if (strActiveLvl && strLevels) {
      const newActiveLvl = JSON.parse(strActiveLvl);
      const newLevels = JSON.parse(strLevels);

      this.activeLvl = newActiveLvl;
      this.levels = newLevels;
    }
  },

  setActiveLvl(newLvl: number): void {
    this.activeLvl = newLvl;
    this.pushDataToLocalStorage();
  },

  resetProgress(): void {
    this.activeLvl = 1;
    this.levels.map((e) => {
      e.status = false;
      return e;
    });
    this.pushDataToLocalStorage();
  },
};

const app = new App(data);
// data.resetProgress();
app.start();
