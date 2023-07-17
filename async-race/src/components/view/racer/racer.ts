import { Racer } from '../../../types';
import './racer.css';

export class RacerEl {
  public createRacer(racer: Racer): HTMLElement {
    const el = document.createElement('div');

    el.classList.add('racer');

    el.style.backgroundColor = racer.color;
    return el;
  }
}
