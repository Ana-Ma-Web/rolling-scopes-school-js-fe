import { HtmlViewer } from '../htmlViewer/htmlViewer';
import { CssEditor } from '../cssEditor/cssEditor';
import '@src/global.css';
import { Data } from '../../types';
import { Field } from '../field/field';
import { Nav } from '../nav/nav';

export class App {
  constructor(private data: Data) {
    this.data = data;
  }

  private toNextLevel(
    nav: Nav,
    field: Field,
    htmlViewer: HtmlViewer,
    cssEditor: CssEditor,
  ): void {
    console.log('meow');
    this.data.setNextActiveLvl();
    this.updateLevel(
      String(this.data.activeLvl),
      nav,
      field,
      htmlViewer,
      cssEditor,
    );
  }

  private win(
    nav: Nav,
    field: Field,
    htmlViewer: HtmlViewer,
    cssEditor: CssEditor,
  ): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');
    const body: HTMLBodyElement | null = document.querySelector('body');

    const main = document.querySelector('.main');

    if (!input) throw new Error('Css editor input is not found');
    const movedElements = document.querySelectorAll(input.value);
    movedElements.forEach((e) => {
      if (e instanceof HTMLElement) {
        e.dataset.move = 'false';
      }
    });

    main?.classList.add('win');
    input.value = '';

    nav.updateNavList();

    setTimeout(() => {
      if (this.data.activeLvl < this.data.levels.length) {
        this.toNextLevel(nav, field, htmlViewer, cssEditor);
      } else body?.classList.add('win-message');
    }, 300);
  }

  private lose(selector: string): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor');
    const selectedNodes = document.querySelectorAll(selector);

    if (!input) throw new Error('Css editor input is not found');

    Array.from(selectedNodes).forEach((e: Element) => {
      e.classList.add('lose');
      setTimeout(() => {
        e.classList.remove('lose');
      }, 500);
    });

    input.classList.add('lose');
    setTimeout(() => {
      input.classList.remove('lose');
    }, 500);
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
    nav: Nav,
    curLvl: string | undefined,
    field: Field,
    htmlViewer: HtmlViewer,
  ): void {
    const body = document.querySelector('body');

    if (target.closest('.css-editor')) {
      if (target.classList.contains('css-editor__btn_enter')) {
        const { isWin, value } = cssEditor.isWinCheck();

        if (isWin) {
          this.win(nav, field, htmlViewer, cssEditor);
        } else if (value) this.lose(value);
      } else if (target.classList.contains('css-editor__btn_help')) {
        cssEditor.helpHandler(nav);
      } else if (target.classList.contains('css-editor__btn_reset')) {
        this.data.resetProgress();

        this.updateLevel(curLvl, nav, field, htmlViewer, cssEditor);
        nav.updateNavList();
        body?.classList.remove('win-message');
      }
      cssEditor.clickHandler();
    }
  }

  private updateLevel(
    curLvl: string | undefined,
    nav: Nav,
    field: Field,
    htmlViewer: HtmlViewer,
    cssEditor: CssEditor,
  ): void {
    const main = document.querySelector('.main');

    this.data.setActiveLvl(curLvl === undefined ? 1 : Number(curLvl));
    nav.updateNavList();
    field.updateField();
    htmlViewer.updateHtmlViewer();
    cssEditor.resetInput();

    main?.classList.remove('win');
  }

  private clickListener(
    nav: Nav,
    field: Field,
    htmlViewer: HtmlViewer,
    cssEditor: CssEditor,
  ): void {
    const body = document.querySelector('body');

    body?.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;
      const curLvl = target.dataset.lvl;
      if (target.classList.contains('nav__btn')) {
        if (!target.dataset.lvl) {
          throw new Error('Nav btn data is not found');
        }
        this.updateLevel(curLvl, nav, field, htmlViewer, cssEditor);
      }
      this.cssEditorClickHandlers(
        target,
        cssEditor,
        nav,
        curLvl,
        field,
        htmlViewer,
      );
    });
  }

  private mouseoverListener(): void {
    const body = document.querySelector('body');

    body?.addEventListener('mouseover', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;
      if (target.closest('div')) {
        this.hoverMouseoverHandler(target);
      }
    });
  }

  private mouseoutListener(): void {
    const body = document.querySelector('body');

    body?.addEventListener('mouseout', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;
      if (target.closest('div')) {
        this.hoverMouseoutHandler(target);
      }
    });
  }

  private keydownListener(
    cssEditor: CssEditor,
    nav: Nav,
    field: Field,
    htmlViewer: HtmlViewer,
  ): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const { isWin, value } = cssEditor.isWinCheck();
        if (isWin) {
          this.win(nav, field, htmlViewer, cssEditor);
        } else if (value) this.lose(value);
      }
    });
  }

  private handlers(
    nav: Nav,
    field: Field,
    htmlViewer: HtmlViewer,
    cssEditor: CssEditor,
  ): void {
    this.clickListener(nav, field, htmlViewer, cssEditor);
    this.mouseoverListener();
    this.mouseoutListener();
    this.keydownListener(cssEditor, nav, field, htmlViewer);
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
