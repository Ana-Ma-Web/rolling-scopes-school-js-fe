import { Racer } from '../../../types';
import { RacerEl } from '../racer/racer';
import { Button } from '../ui/button';
import './track.css';

export class Track {
  private racer: RacerEl;

  constructor() {
    this.racer = new RacerEl();
  }

  private createButton(type: 'stop' | 'start'): HTMLButtonElement {
    const button = new Button();
    const newBtn = button.createBtn({
      datasetType: `racer-${type}`,
      isDisabled: false,
      rootClass: 'track',
      modClass: type,
      textContent: type === 'stop' ? 'Stop' : 'Start',
    });

    return newBtn;
  }

  public createTrack(racer: Racer): HTMLElement {
    const trackEl = document.createElement('div');
    trackEl.dataset.id = String(racer.id);
    trackEl.classList.add('track');

    const racerEl = this.racer.createRacer(racer);

    const nameEl = document.createElement('div');
    nameEl.classList.add('track__name');
    nameEl.textContent = racer.name;

    const buttonsEl = document.createElement('div');
    buttonsEl.classList.add('track__buttons');

    const btnStartEl = document.createElement('button');
    btnStartEl.dataset.btnType = 'racer-start';

    btnStartEl.classList.add('btn', 'track__btn', 'track__btn_start');
    btnStartEl.textContent = 'Start';

    buttonsEl.append(this.createButton('start'), this.createButton('stop'));
    trackEl.append(racerEl, buttonsEl);
    return trackEl;
  }
}
