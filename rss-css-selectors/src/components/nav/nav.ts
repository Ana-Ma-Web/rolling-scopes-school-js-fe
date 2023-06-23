import { Data, Status } from '../../types';

export class Nav {
  constructor(private data: Data) {
    this.data = data;
  }

  private createNavItem(
    status: Status,
    isCurrent: boolean,
    curLvl: number,
  ): Node {
    const listItem = document.createElement('li');
    listItem.classList.add('nav__item');

    const btn = document.createElement('button');
    btn.classList.add('btn', 'nav__btn');

    if (isCurrent) btn.classList.add('nav__btn_cur');
    if (status) btn.classList.add(`nav__btn_${status}`);

    btn.textContent = `${curLvl} level`;

    listItem.append(btn);
    return listItem;
  }

  public printNavList(): void {
    const { activeLvl, levels } = this.data;
    const nav = document.querySelector('nav');
    const navList = document.createElement('ul');
    navList.classList.add('nav__list');

    if (!nav) throw new Error('No nav block');

    levels.forEach((e, i) => {
      const curLvl = i + 1;
      const isCurrent = activeLvl === curLvl;
      navList.append(this.createNavItem(e.status, isCurrent, curLvl));
    });

    nav.append(navList);
  }
}
