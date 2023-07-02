import { Data } from '../../types';
import { Nav } from '../nav/nav';
import { Button } from '../UI/button';
import './cssEditor.css';

export class CssEditor {
  constructor(private data: Data) {
    this.data = data;
  }

  private createInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('css-editor__input');
    input.autofocus = true;

    return input;
  }

  private checkInput(value: string, selector: string): boolean {
    const fieldSpace = document.querySelector('.field__space');
    if (!fieldSpace) throw new Error('Field is not found');

    try {
      fieldSpace.querySelectorAll(value);
    } catch {
      return false;
    }

    const movedElementsArray = Array.from(
      fieldSpace.querySelectorAll(selector),
    ).sort();
    const selectedElementsArray = Array.from(
      fieldSpace.querySelectorAll(value),
    ).sort();
    if (movedElementsArray.length !== selectedElementsArray.length)
      return false;
    const result = movedElementsArray.every((e, i) => {
      return e === selectedElementsArray[i];
    });

    return result;
  }

  public isWinCheck(): { isWin: boolean; value?: string } {
    const input: HTMLInputElement | null =
      document.querySelector('.css-editor__input');
    const btn = document.querySelector('.css-editor__btn_enter');
    if (!input || !btn) throw new Error('Css editor button is not found');

    const { value } = input;
    const activeLevel = this.data.levels[this.data.activeLvl - 1];
    const { selector } = activeLevel;

    if (value && selector) {
      const isEquals = this.checkInput(value, selector);
      if (
        (input === document.activeElement || btn === document.activeElement) &&
        isEquals
      ) {
        if (activeLevel.status === 'help') {
          activeLevel.status = 'help-done';
        } else activeLevel.status = 'done';
        return { isWin: true };
      }
    }
    return { isWin: false, value };
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
    const currentClass = 'css-editor';
    const wrapper = document.querySelector(`.${currentClass}`);
    if (!wrapper) throw new Error('Css editor is not found');
    const button = new Button();

    wrapper.append(
      button.createResetButton(currentClass),
      button.createHelpButton(currentClass),
      this.createInput(),
      button.createEnterButton(currentClass),
    );
  }
}
