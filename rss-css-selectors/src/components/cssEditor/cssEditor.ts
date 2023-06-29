import { Data } from '../../types';
import './cssEditor.css';

export class CssEditor {
  constructor(private data: Data) {
    this.data = data;
  }

  private win(): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');

    if (!input) throw new Error('Css editor is not found');
    const movedElements = document.querySelectorAll(input.value);
    movedElements.forEach((e) => {
      if (e instanceof HTMLElement) {
        e.dataset.move = 'false';
      }
    });

    input.value = '';
  }

  private lose(): void {}

  private createInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('css-editor__input');
    input.autofocus = true;

    return input;
  }

  private createButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.textContent = 'Enter';
    button.classList.add('css-editor__button');

    return button;
  }

  private checkInput(value: string, selector: string): boolean {
    const movedElementsArray = Array.from(
      document.querySelectorAll(selector),
    ).sort();
    const selectedElementsArray = Array.from(
      document.querySelectorAll(value),
    ).sort();

    const result = movedElementsArray.every(
      (e, i) => e === selectedElementsArray[i],
    );

    return result;
  }

  public enterHandler(): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');
    const btn = document.querySelector('.css-editor__button');
    if (!input || !btn) throw new Error('Css editor is not found');

    if (
      (input === document.activeElement || btn === document.activeElement) &&
      this.checkInput(
        input.value,
        this.data.levels[this.data.activeLvl - 1].selector,
      )
    ) {
      this.win();
    } else this.lose();
  }

  public clickHandler(): void {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');
    input?.focus();
  }

  public printCssEditor(): void {
    const wrapper = document.querySelector('.css-editor');
    if (!wrapper) throw new Error('Css editor is not found');

    wrapper.append(this.createInput(), this.createButton());

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.enterHandler();
      }
    });
  }
}
