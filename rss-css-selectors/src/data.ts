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

export const data: Data = {
  activeLvl: 1,
  levels: [
    {
      status: false,
      selector: 'planet',
      table: [
        <TagType>new Planet({ key: '1', isMove: true, texture: 10 }),
        <TagType>new Planet({ key: '2', isMove: true, texture: 3 }),
        <TagType>new Planet({ key: '3', isMove: true, texture: 9 }),
      ],
    },
    {
      status: false,
      selector: '.dwarf',
      table: [<TagType>new Planet({
          key: '1',
          classes: 'dwarf',
          shape: 1,
          isMove: true,
          texture: 10,
        }), <TagType>new Planet({ key: '2', isMove: false, texture: 8 })],
    },
    {
      status: false,
      selector: '.blue',
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
      selector: 'moon',
      table: [
        <TagType>new Planet({ key: '1', texture: 2 }),
        <TagType>new Planet({
          key: '2',
          shape: 2,
          texture: 7,
          innerTags: [<TagType>new Planet({
              key: '21',
              tagName: 'moon',
              texture: 2,
              classes: 'moon',
              isMove: true,
            })],
        }),
        <TagType>new Planet({ key: '3', texture: 10 }),
      ],
    },
    {
      status: false,
      selector: '.pink moon',
      table: [<TagType>new Planet({
          key: '1',
          shape: 3,
          texture: 9,
          innerTags: [<TagType>new Planet({
              key: '21',
              tagName: 'moon',
              texture: 9,
              isMove: false,
            }), <TagType>new Planet({
              key: '22',
              tagName: 'moon',
              texture: 8,
              isMove: false,
            }), <TagType>new Planet({
              key: '23',
              tagName: 'moon',
              texture: 10,
              isMove: false,
            })],
        }), <TagType>new Planet({
          key: '2',
          shape: 2,
          classes: 'pink',
          texture: 3,
          innerTags: [<TagType>new Planet({
              key: '21',
              tagName: 'moon',
              texture: 11,
              isMove: true,
            })],
        }), <TagType>new Planet({ key: '3', texture: 10 })],
    },
    {
      status: false,
      selector: 'moon.green',
      table: [
        <TagType>new Planet({ key: '1', texture: 6, classes: 'green' }),
        <TagType>new Planet({
          key: '2',
          shape: 3,
          texture: 9,
          innerTags: [<TagType>new Planet({
              key: '21',
              tagName: 'moon',
              texture: 1,
              isMove: false,
            }), <TagType>new Planet({
              key: '22',
              tagName: 'moon',
              classes: 'green',
              texture: 9,
              isMove: true,
            }), <TagType>new Planet({
              key: '23',
              tagName: 'moon',
              texture: 10,
              isMove: false,
            })],
        }),
        <TagType>new Planet({ key: '3', texture: 2 }),
        <TagType>new Planet({
          key: '4',
          shape: 2,
          texture: 3,
          innerTags: [<TagType>new Planet({
              key: '41',
              tagName: 'moon',
              classes: 'green',
              texture: 9,
              isMove: true,
            })],
        }),
      ],
    },
    {
      status: false,
      selector: 'moon.pink, moon.green',
      table: [<TagType>new Planet({
          key: '1',
          shape: 3,
          texture: 10,
          innerTags: [<TagType>new Planet({
              key: '11',
              tagName: 'moon',
              texture: 12,
              isMove: false,
            }), <TagType>new Planet({
              key: '12',
              tagName: 'moon',
              texture: 10,
              isMove: false,
            }), <TagType>new Planet({
              key: '13',
              tagName: 'moon',
              classes: 'pink',
              texture: 6,
              isMove: true,
            })],
        }), <TagType>new Planet({
          key: '2',
          shape: 4,
          texture: 3,
          innerTags: [<TagType>new Planet({
              key: '21',
              tagName: 'moon',
              texture: 3,
              isMove: false,
            }), <TagType>new Planet({
              key: '22',
              tagName: 'moon',
              texture: 1,
              isMove: false,
            }), <TagType>new Planet({
              key: '23',
              tagName: 'moon',
              texture: 2,
              isMove: false,
            })],
        }), <TagType>new Planet({
          key: '3',
          shape: 2,
          texture: 2,
          innerTags: [<TagType>new Planet({
              key: '31',
              tagName: 'moon',
              classes: 'green',
              texture: 9,
              isMove: true,
            })],
        })],
    },
    {
      status: false,
      selector: '*',
      table: [<TagType>new Planet({
          key: '1',
          shape: 4,
          texture: 8,
          isMove: true,
          innerTags: [<TagType>new Planet({
              key: '11',
              tagName: 'moon',
              texture: 8,
              isMove: true,
            }), <TagType>new Planet({
              key: '12',
              tagName: 'moon',
              texture: 5,
              isMove: true,
            }), <TagType>new Planet({
              key: '13',
              tagName: 'moon',
              texture: 2,
              isMove: true,
            })],
        }), <TagType>new Planet({
          key: '2',
          shape: 1,
          texture: 10,
          classes: 'dwarf',
          isMove: true,
        }), <TagType>new Planet({
          key: '3',
          shape: 2,
          texture: 2,
          isMove: true,
          classes: 'blue',
          innerTags: [<TagType>new Planet({
              key: '31',
              tagName: 'moon',
              texture: 9,
              classes: 'green',
              isMove: true,
            })],
        }), <TagType>new Planet({
          key: '4',
          shape: 0,
          texture: 1,
          isMove: true,
        })],
    },
    {
      status: false,
      selector: 'moon:first-child',
      table: [
        <TagType>new Planet({ key: '1', isMove: false, texture: 3 }),
        <TagType>new Planet({
          key: '1',
          shape: 3,
          texture: 8,
          innerTags: [<TagType>new Planet({
              key: '21',
              tagName: 'moon',
              texture: 7,
              isMove: true,
            }), <TagType>new Planet({
              key: '22',
              tagName: 'moon',
              texture: 5,
            }), <TagType>new Planet({
              key: '23',
              tagName: 'moon',
              texture: 12,
            })],
        }),
        <TagType>new Planet({ key: '3', isMove: false, texture: 4 }),
      ],
    },
    {
      status: false,
      selector: 'moon:only-child',
      table: [<TagType>new Planet({
          key: '1',
          shape: 3,
          texture: 10,
          innerTags: [<TagType>new Planet({
              key: '21',
              tagName: 'moon',
              texture: 6,
            }), <TagType>new Planet({
              key: '22',
              tagName: 'moon',
              texture: 3,
            }), <TagType>new Planet({
              key: '23',
              tagName: 'moon',
              texture: 12,
            })],
        }), <TagType>new Planet({ key: '2', texture: 3 }), <TagType>new Planet({
          key: '2',
          shape: 2,
          texture: 2,
          innerTags: [<TagType>new Planet({
              key: '21',
              tagName: 'moon',
              texture: 8,
              isMove: true,
            })],
        })],
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

  setNextActiveLvl(): void {
    this.activeLvl += 1;
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
