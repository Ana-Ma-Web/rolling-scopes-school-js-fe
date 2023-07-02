import { Data } from '../../types';
import { Button } from '../UI/button';
import './finalMessage.css';

export class FinalMessage {
  constructor(private data: Data) {
    this.data = data;
  }

  public printFinalMessage(): void {
    const currentClass = 'final-message';
    const button = new Button();
    const body = document.querySelector('body');

    const finalMessageOverlay = document.createElement('div');
    finalMessageOverlay.classList.add(`${currentClass}__overlay`);

    const finalMessage = document.createElement('div');
    finalMessage.classList.add(`${currentClass}__content`);

    const finalMessageText = document.createElement('div');
    finalMessageText.classList.add(`${currentClass}__text`);
    finalMessageText.textContent = '🎊 Win! 🎉';

    const resetBtn = button.createResetButton(currentClass);
    const okayBtn = button.createOkayButton(currentClass);

    finalMessage.append(finalMessageText, resetBtn, okayBtn);
    finalMessageOverlay.append(finalMessage);
    body?.append(finalMessageOverlay);
  }
}
