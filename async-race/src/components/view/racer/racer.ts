import './racer.css';

export class RacerEl {
  public createRacer(color: string): HTMLElement {
    const el = document.createElement('div');

    el.classList.add('racer');

    el.style.backgroundColor = color;
    return el;
  }
}
