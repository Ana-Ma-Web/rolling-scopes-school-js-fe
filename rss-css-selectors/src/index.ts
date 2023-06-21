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
          tagName: 'plate',
          classes: '',
          innerTags: [
            {
              tagName: 'apple',
              classes: 'red',
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
