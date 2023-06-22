// import { App } from './components/app/app';
import { App } from './components/app/app';
import './global.css';
import { Data } from './types';

const data: Data = {
  curLvl: 1,
  levels: [
    {
      table: [
        {
          tagName: 'planet',
          shape: 1,
          texture: 1,
          classes: '',
          innerTags: [
            {
              tagName: 'moon',
              shape: 1,
              texture: 1,
              classes: 'pink',
              innerTags: null,
            },
          ],
        },
      ],
    },
  ],
};

const app = new App(data);
app.start();
