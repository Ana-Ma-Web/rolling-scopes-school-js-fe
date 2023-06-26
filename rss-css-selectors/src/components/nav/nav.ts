import { Data, Status } from '../../types';
import './nav.css';

export class Nav {
  constructor(private data: Data) {
    this.data = data;
  }

  private changeBtnActive(curLvl: number): void {
    const navButtons: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.nav__btn');

    navButtons.forEach((node) => {
      node.classList.remove('nav__btn_active');
      if (String(curLvl) === node.dataset.lvl) {
        node.classList.add('nav__btn_active');
      }
    });
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

    if (isCurrent) btn.classList.add('nav__btn_active');

    if (status) btn.classList.add(`nav__btn_${status}`);

    btn.dataset.lvl = String(curLvl);
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

  public updateNavList(): void {
    const curLvl = this.data.activeLvl;
    this.changeBtnActive(curLvl);
  }
}
