import '@src/global.css';
import { Data } from '../../types';
import { CssEditor } from '../cssEditor/cssEditor';
import { Field } from '../field/field';
import { HtmlViewer } from '../htmlViewer/htmlViewer';
import { Nav } from '../nav/nav';

export class App {
  constructor(private data: Data) {
    this.data = data;
  }

  private hoverMouseoverHandler(target: HTMLElement): void {
    const key = target.dataset.key
      ? target.dataset.key.slice(1)
      : target.closest('div')?.dataset.key?.slice(1);

    const planets = Array.from(
      document.querySelectorAll(`planet[data-key="p${key}"]`),
    );
    const moons = Array.from(
      document.querySelectorAll(`moon[data-key="p${key}"]`),
    );
    const htmlElements = Array.from(
      document.querySelectorAll(`*[data-key="h${key}"]`),
    );

    const planetsArray = planets.concat(moons);

    if (target.dataset.type === 'planet') {
      planetsArray.forEach((e) => {
        e.classList.add('planet-hover');
      });
      htmlElements.forEach((e) => {
        e.classList.add('html-hover');
      });
      target.closest('.planet')?.classList.add('planet-hover');
    } else if (target.closest('.html-line')) {
      planetsArray.forEach((e) => {
        e.classList.add('planet-hover');
      });
      htmlElements.forEach((e) => {
        e.classList.add('html-hover');
      });
      target.closest('div')?.classList.add('html-hover');
    }
  }

  private hoverMouseoutHandler(target: HTMLElement): void {
    const key = target.dataset.key
      ? target.dataset.key.slice(1)
      : target.closest('div')?.dataset.key?.slice(1);

    const planets = document.querySelectorAll(`planet[data-key="p${key}"]`);
    const moons = document.querySelectorAll(`moon[data-key="p${key}"]`);
    const htmlElements = document.querySelectorAll(`*[data-key="h${key}"]`);

    planets.forEach((e) => {
      e.classList.remove('planet-hover');
    });
    moons.forEach((e) => {
      e.classList.remove('planet-hover');
    });
    htmlElements.forEach((e) => {
      e.classList.remove('html-hover');
    });
  }

  private cssEditorClickHandlers(
    target: HTMLElement,
    cssEditor: CssEditor,
  ): void {
    if (target.closest('.css-editor')) {
      if (target.classList.contains('css-editor__btn_enter')) {
        cssEditor.enterHandler();
      } else if (target.classList.contains('css-editor__btn_help')) {
        cssEditor.helpHandler();
      }
      cssEditor.clickHandler();
    }
  }

  private handlers(
    nav: Nav,
    field: Field,
    htmlViewer: HtmlViewer,
    cssEditor: CssEditor,
  ): void {
    const body = document.querySelector('body');

    body?.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;

      if (target.classList.contains('nav__btn')) {
        const curLvl = target.dataset.lvl;
        if (!target.dataset.lvl) {
          throw new Error('Nav btn data is not found');
        }

        this.data.setActiveLvl(Number(curLvl));
        nav.updateNavList();
        field.updateField();
        htmlViewer.updateHtmlViewer();
      }

      this.cssEditorClickHandlers(target, cssEditor);
    });

    body?.addEventListener('mouseover', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;
      if (target.closest('div')) {
        this.hoverMouseoverHandler(target);
      }
    });

    body?.addEventListener('mouseout', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;
      if (target.closest('div')) {
        this.hoverMouseoutHandler(target);
      }
    });
  }

  public start(): void {
    this.data.pullDataFromLocalStorage();

    const field = new Field(this.data);
    const htmlViewer = new HtmlViewer(this.data);
    const nav = new Nav(this.data);
    const cssEditor = new CssEditor(this.data);

    nav.printNavList();
    field.printField();
    htmlViewer.printHtmlViewer();
    cssEditor.printCssEditor();

    this.handlers(nav, field, htmlViewer, cssEditor);
  }
}
