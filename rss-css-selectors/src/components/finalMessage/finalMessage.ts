import { Data } from '../../types';
import './finalMessage.css';

export class FinalMessage {
  constructor(private data: Data) {
    this.data = data;
  }

  public printFinalMessage(
    createResetButton: (rootClass: string) => HTMLButtonElement,
    createOkayButton: (rootClass: string) => HTMLButtonElement,
  ): void {
    const currentClass = 'final-message';
    const body = document.querySelector('body');

    const finalMessageOverlay = document.createElement('div');
    finalMessageOverlay.classList.add(`${currentClass}__overlay`);

    const finalMessage = document.createElement('div');
    finalMessage.classList.add(`${currentClass}__content`);

    const finalMessageText = document.createElement('div');
    finalMessageText.classList.add(`${currentClass}__text`);
    finalMessageText.textContent = '🎊 Win! 🎉';

    const resetBtn = createResetButton(currentClass);
    const okayBtn = createOkayButton(currentClass);

    finalMessage.append(finalMessageText, resetBtn, okayBtn);
    finalMessageOverlay.append(finalMessage);
    body?.append(finalMessageOverlay);
  }
}
