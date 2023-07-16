import { Car } from '../../../types';
import { Racer } from '../racer/racer';
import './track.css';

export class Track {
  private racer: Racer;

  constructor() {
    this.racer = new Racer();
  }

  public createTrack(racer: Car): HTMLElement {
    const trackEl = document.createElement('div');
    trackEl.dataset.id = String(racer.id);
    trackEl.classList.add('track');

    const racerEl = this.racer.createRacer(racer);

    const nameEl = document.createElement('div');
    nameEl.classList.add('track__name');
    nameEl.textContent = racer.name;

    const buttonsEl = document.createElement('div');
    buttonsEl.classList.add('track__buttons');

    const btnStopEl = document.createElement('div');
    btnStopEl.classList.add('btn', 'track__btn', 'track__btn_stop');
    btnStopEl.textContent = 'Stop';

    const btnStartEl = document.createElement('div');
    btnStartEl.classList.add('btn', 'track__btn', 'track__btn_start');
    btnStartEl.textContent = 'Start';

    buttonsEl.append(btnStartEl, btnStopEl);
    trackEl.append(racerEl, buttonsEl);
    return trackEl;
  }
}
