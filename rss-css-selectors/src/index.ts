// import { App } from './components/app/app';
import { App } from './components/app/app';
import './global.css';
import { Data } from './types';

const data: Data = {
  curLvl: 2,
  levels: [
    {
      status: false,
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
              classes: '',
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
};

const app = new App(data);
app.start();
