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
          shape: 0,
          texture: 2,
          classes: 'blue',
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
          classes: 'blue',
          innerTags: null,
          isMove: true,
        },
      ],
    },
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
              isMove: true,
            },
          ],
          isMove: true,
        },
        {
          tagName: 'planet',
          shape: 0,
          texture: 1,
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
          isMove: true,
        },
      ],
    },
  ],
};

const app = new App(data);
app.start();
