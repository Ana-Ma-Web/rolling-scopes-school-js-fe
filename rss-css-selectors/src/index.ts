// import { App } from './components/app/app';
import { App } from './components/app/app';
import './global.css';
import { Data } from './types';

const data: Data = {
  curLvl: 1,
  levels: [
    {
      lvl_num: 1,
      table: [
        {
          tag: 'plate',
          classes: '',
          innerTags: [{ tag: 'apple', classes: 'red', innerTags: null }],
        },
      ],
    },
  ],
};

const app = new App(data);
app.start();
