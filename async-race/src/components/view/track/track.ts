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

    const racerEl = this.racer.createRacer(racer);

    trackEl.classList.add('track');
    trackEl.append(racerEl);
    return trackEl;
  }
}
