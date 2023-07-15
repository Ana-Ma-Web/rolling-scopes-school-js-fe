import { Car } from '../../../types';
import './racer.css';

export class Racer {
  public createRacer(racer: Car): HTMLElement {
    const el = document.createElement('div');

    el.classList.add('racer');

    el.style.backgroundColor = racer.color;
    return el;
  }
}
