import { capitalisation } from '../../../helpers/capitalisation';
import { Racer } from '../../../types';
import { RacerEl } from '../racer/racer';
import { Button } from '../ui/button';
import { flag } from './flag';
import './track.css';

export class Track {
  private racer: RacerEl;

  constructor() {
    this.racer = new RacerEl();
  }

  private createButton(
    type: 'stop' | 'start' | 'select' | 'remove',
  ): HTMLButtonElement {
    const button = new Button();
    const newBtn = button.createBtn({
      datasetType: `racer-${type}`,
      isDisabled: type === 'stop',
      rootClass: 'track',
      modClass: type,
      textContent: capitalisation(type),
    });

    return newBtn;
  }

  public createTrack(racer: Racer): HTMLElement {
    const trackEl = document.createElement('div');
    trackEl.dataset.id = String(racer.id);
    trackEl.classList.add('track');

    const racerEl = this.racer.createRacer(racer.color);

    const buttonsEl = document.createElement('div');
    buttonsEl.classList.add('track__buttons');

    const name = document.createElement('span');
    name.textContent = racer.name;
    name.classList.add('track__name', 'name');

    buttonsEl.append(
      this.createButton('start'),
      this.createButton('stop'),
      this.createButton('select'),
      this.createButton('remove'),
    );
    trackEl.append(name, buttonsEl, racerEl, flag());
    return trackEl;
  }
}
