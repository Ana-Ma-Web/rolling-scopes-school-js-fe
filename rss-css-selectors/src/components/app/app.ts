import { HtmlViewer } from '../htmlViewer/htmlViewer';
import { CssEditor } from '../cssEditor/cssEditor';
import '@src/global.css';
import { Data, FullUpdate } from '../../types';
import { Field } from '../field/field';
import { Nav } from '../nav/nav';
import { FinalMessage } from '../finalMessage/finalMessage';
import { Button } from '../UI/button';

export class App {
  constructor(private data: Data) {
    this.data = data;
  }

  private toNextLevel(props: { fullUpdate: FullUpdate }): void {
    const { fullUpdate } = props;

    this.data.setNextActiveLvl();
    this.updateLevel({
      curLvl: String(this.data.activeLvl),
      fullUpdate,
    });
  }

  private win(props: { fullUpdate: FullUpdate }): void {
    const { fullUpdate } = props;
    const { updateNavList } = fullUpdate;

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

    updateNavList();

    setTimeout(() => {
      if (this.data.activeLvl < this.data.levels.length) {
        this.toNextLevel({ fullUpdate });
      } else body?.classList.add('win-message');
    }, 300);
  }

  private lose(selector: string): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor');

    if (!input) throw new Error('Css editor input is not found');
    try {
      document.querySelectorAll(selector);
    } catch {
      input.classList.add('lose');
      setTimeout(() => {
        input.classList.remove('lose');
      }, 500);
      return;
    }
    const selectedNodes = document.querySelectorAll(selector);

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

  private clickHandlers(props: {
    target: HTMLElement;
    cssEditor: CssEditor;
    curLvl: string | undefined;
    fullUpdate: FullUpdate;
  }): void {
    const { target, curLvl, cssEditor, fullUpdate } = props;
    const { updateNavList } = fullUpdate;
    const isWinCheck = cssEditor.isWinCheck.bind(cssEditor);
    const helpHandler = cssEditor.helpHandler.bind(cssEditor);
    const clickHandler = cssEditor.clickHandler.bind(cssEditor);
    const { isWin, value } = isWinCheck();
    switch (target.dataset.type) {
      case 'enter':
        if (isWin) {
          this.win({ fullUpdate });
        } else if (value) this.lose(value);
        break;
      case 'help':
        helpHandler(updateNavList);
        break;
      case 'reset':
        this.resetAll({ curLvl, fullUpdate });
        break;
      case 'okay':
        document.querySelector('body')?.classList.remove('win-message');
        document.querySelector('.main')?.classList.remove('win');
        break;
      default:
        break;
    }
    clickHandler();
  }

  private resetAll(props: {
    curLvl: string | undefined;
    fullUpdate: FullUpdate;
  }): void {
    const { curLvl, fullUpdate } = props;
    const { updateNavList, updateField, updateHtmlViewer, resetInput } =
      fullUpdate;
    const body = document.querySelector('body');

    this.data.resetProgress();
    this.updateLevel({
      curLvl,
      fullUpdate,
    });
    updateNavList();
    body?.classList.remove('win-message');
  }

  private updateLevel(props: {
    curLvl: string | undefined;
    fullUpdate: FullUpdate;
  }): void {
    const { curLvl, fullUpdate } = props;
    const { updateNavList, updateField, updateHtmlViewer, resetInput } =
      fullUpdate;
    const main = document.querySelector('.main');

    this.data.setActiveLvl(curLvl === undefined ? 1 : Number(curLvl));
    updateNavList();
    updateField();
    updateHtmlViewer();
    resetInput();

    main?.classList.remove('win');
  }

  private clickListener(props: {
    cssEditor: CssEditor;
    fullUpdate: FullUpdate;
  }): void {
    const { cssEditor, fullUpdate } = props;
    const body = document.querySelector('body');

    body?.addEventListener('click', (e: MouseEvent) => {
      const target = <HTMLElement>e.target;
      const curLvl = target.dataset.lvl;
      if (target.classList.contains('nav__btn') && target.dataset.lvl) {
        this.updateLevel({ curLvl, fullUpdate });
      }
      this.clickHandlers({ target, curLvl, cssEditor, fullUpdate });
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

  private keydownListener(props: {
    isWinCheck: () => { isWin: boolean; value?: string | undefined };
    fullUpdate: FullUpdate;
  }): void {
    const { isWinCheck, fullUpdate } = props;

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const { isWin, value } = isWinCheck();
        if (isWin) {
          this.win({ fullUpdate });
        } else if (value) this.lose(value);
      }
    });
  }

  private handlers(props: {
    fullUpdate: FullUpdate;
    cssEditor: CssEditor;
  }): void {
    const { cssEditor, fullUpdate } = props;
    this.clickListener({ cssEditor, fullUpdate });
    this.mouseoverListener();
    this.mouseoutListener();
    this.keydownListener({
      isWinCheck: cssEditor.isWinCheck.bind(cssEditor),
      fullUpdate,
    });
  }

  public start(): void {
    this.data.pullDataFromLocalStorage();

    const field = new Field(this.data);
    const htmlViewer = new HtmlViewer(this.data);
    const nav = new Nav(this.data);
    const cssEditor = new CssEditor(this.data);
    const finalMessage = new FinalMessage(this.data);
    const {
      createResetButton,
      createHelpButton,
      createEnterButton,
      createOkayButton,
    } = new Button();
    const fullUpdate = {
      updateNavList: nav.updateNavList.bind(nav),
      updateField: field.updateField.bind(field),
      updateHtmlViewer: htmlViewer.updateHtmlViewer.bind(htmlViewer),
      resetInput: cssEditor.resetInput.bind(cssEditor),
    };

    nav.printNavList();
    field.printField();
    htmlViewer.printHtmlViewer();
    cssEditor.printCssEditor({
      createResetButton,
      createHelpButton,
      createEnterButton,
    });
    finalMessage.printFinalMessage(createResetButton, createOkayButton);

    this.handlers({ cssEditor, fullUpdate });
  }
}
