import { Racer } from '../../../types';
import { RacerEl } from '../racer/racer';
import './track.css';

export class Track {
  private racer: RacerEl;

  constructor() {
    this.racer = new RacerEl();
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

    const btnStopEl = document.createElement('button');
    btnStopEl.dataset.btnType = 'racer-stop';
    btnStopEl.classList.add('btn', 'track__btn', 'track__btn_stop');
    btnStopEl.textContent = 'Stop';
    btnStopEl.disabled = true;

    const btnStartEl = document.createElement('button');
    btnStartEl.dataset.btnType = 'racer-start';

    btnStartEl.classList.add('btn', 'track__btn', 'track__btn_start');
    btnStartEl.textContent = 'Start';

    buttonsEl.append(btnStartEl, btnStopEl);
    trackEl.append(racerEl, buttonsEl);
    return trackEl;
  }
}
