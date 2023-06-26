import '@src/global.css';
import { Data } from '../../types';
import { Field } from '../field/field';
import { HtmlViewer } from '../htmlViewer/htmlViewer';
import { Nav } from '../nav/nav';

export class App {
  constructor(private data: Data) {
    this.data = data;
  }

  public start(): void {
    this.data.pullDataFromLocalStorage();

    const body = document.querySelector('body');
    const field = new Field(this.data);
    const htmlViewer = new HtmlViewer(this.data);
    const nav = new Nav(this.data);

    nav.printNavList();
    field.printField();
    htmlViewer.printHtmlViewer();

    body?.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;

      if (target.classList.contains('nav__btn')) {
        const curLvl = target.dataset.lvl;
        if (!target.dataset.lvl) {
          throw new Error('Nav btn data is not found');
        }

        this.data.setActiveLvl(Number(curLvl));
        nav.updateNavList();
      }
    });
  }
}
