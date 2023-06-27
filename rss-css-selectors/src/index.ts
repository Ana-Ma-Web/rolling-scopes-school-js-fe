// import { App } from './components/app/app';
import { App } from './components/app/app';
import { Data } from './types';

const data: Data = {
  activeLvl: 2,
  levels: [
    {
      status: 'help',
      table: [
        {
          tagName: 'planet',
          shape: 0,
          texture: 2,
          classes: '',
          innerTags: null,
          isMove: true,
        },
        {
          tagName: 'planet',
          shape: 0,
          texture: 1,
          classes: '',
          innerTags: null,
          isMove: false,
        },
        {
          tagName: 'planet',
          shape: 0,
          texture: 2,
          classes: '',
          innerTags: null,
          isMove: true,
        },
      ],
    },
    {
      status: false,
      table: [
        {
          tagName: 'planet',
          shape: 0,
          texture: 1,
          classes: '',
          innerTags: null,
          isMove: false,
        },
        {
          tagName: 'planet',
          shape: 1,
          texture: 3,
          classes: '',
          isMove: false,
          innerTags: [
            {
              tagName: 'moon',
              shape: 1,
              texture: 2,
              classes: 'moon',
              innerTags: null,
              isMove: true,
            },
          ],
        },
        {
          tagName: 'planet',
          shape: 0,
          texture: 2,
          classes: '',
          innerTags: null,
          isMove: false,
        },
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
