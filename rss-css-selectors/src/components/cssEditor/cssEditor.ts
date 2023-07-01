import { Data } from '../../types';
import { Nav } from '../nav/nav';
import './cssEditor.css';

export class CssEditor {
  constructor(private data: Data) {
    this.data = data;
  }

  private win(): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');

    const main = document.querySelector('.main');

    // console.log(input);
    if (!input) throw new Error('Css editor input is not found');
    const movedElements = document.querySelectorAll(input.value);
    movedElements.forEach((e) => {
      if (e instanceof HTMLElement) {
        e.dataset.move = 'false';
      }
    });

    main?.classList.add('win');
    input.value = '';
  }

  private lose(): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor');

    if (!input) throw new Error('Css editor input is not found');

    input.classList.add('lose');
    setTimeout(() => {
      input.classList.remove('lose');
    }, 500);
  }

  private createInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('css-editor__input');
    input.autofocus = true;

    return input;
  }

  private createEnterButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = 'Enter';
    button.classList.add('css-editor__btn', 'css-editor__btn_enter', 'btn');

    return button;
  }

  private createHelpButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = 'Help';
    button.classList.add('css-editor__btn', 'css-editor__btn_help', 'btn');

    return button;
  }

  private checkInput(value: string, selector: string): boolean {
    const fieldSpace = document.querySelector('.field__space');
    if (!fieldSpace) throw new Error('Field is not found');

    try {
      fieldSpace.querySelector(value);
    } catch {
      return false;
    }

    const movedElementsArray = Array.from(
      fieldSpace.querySelectorAll(selector),
    ).sort();
    const selectedElementsArray = Array.from(
      fieldSpace.querySelectorAll(value),
    ).sort();
    const result = movedElementsArray.every(
      (e, i) => e === selectedElementsArray[i],
    );

    return result;
  }

  public enterHandler(): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');
    const btn = document.querySelector('.css-editor__btn_enter');
    if (!input || !btn) throw new Error('Css editor button is not found');

    const { value } = input;
    const { selector } = this.data.levels[this.data.activeLvl - 1];

    if (value && selector) {
      const isEquals = this.checkInput(value, selector);
      if (
        (input === document.activeElement || btn === document.activeElement) &&
        isEquals
      ) {
        this.win();
      } else this.lose();
    }
  }

  public helpHandler(nav: Nav): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');

    if (!input) throw new Error('Css editor button is not found');

    const curLvl = this.data.levels[this.data.activeLvl - 1];

    input.value = '';

    curLvl.selector.split('').forEach((e, i) => {
      window.setTimeout(() => {
        input.value += e;
      }, 30 * i);
    });

    curLvl.status = 'help';
    nav.updateNavList();
    this.data.pushDataToLocalStorage();
  }

  public clickHandler(): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');
    input?.focus();
  }

  public resetInput(): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');
    if (!input) throw new Error('Css editor button is not found');

    input.value = '';
  }

  public printCssEditor(): void {
    const wrapper = document.querySelector('.css-editor');
    if (!wrapper) throw new Error('Css editor is not found');

    wrapper.append(
      this.createHelpButton(),
      this.createInput(),
      this.createEnterButton(),
    );

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.enterHandler();
      }
    });
  }
}
