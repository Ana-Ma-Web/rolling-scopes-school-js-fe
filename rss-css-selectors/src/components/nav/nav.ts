import { Data, Status } from '../../types';
import './nav.css';

export class Nav {
  constructor(private data: Data) {
    this.data = data;
  }

  private changeBtnActive(node: HTMLElement, curLvl: number): void {
    node.classList.remove('nav__btn_active');
    if (String(curLvl) === node.dataset.lvl) {
      node.classList.add('nav__btn_active');
    }
  }

  private updateBtnColor(node: HTMLElement, status: Status): void {
    if (status) {
      if (status === 'help-done') {
        node.classList.add(`nav__btn_help`);
        node.classList.add(`nav__btn_done`);
      } else {
        node.classList.add(`nav__btn_${status}`);
      }
    } else {
      node.classList.remove(`nav__btn_help`);
      node.classList.remove(`nav__btn_done`);
    }
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

    this.updateBtnColor(btn, status);

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
    const { activeLvl, levels } = this.data;

    const navButtons: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.nav__btn');

    navButtons.forEach((node) => {
      const curLvl = node.dataset.lvl;
      const { status } = levels[Number(curLvl) - 1];
      this.changeBtnActive(node, activeLvl);
      this.updateBtnColor(node, status);
    });
  }
}
