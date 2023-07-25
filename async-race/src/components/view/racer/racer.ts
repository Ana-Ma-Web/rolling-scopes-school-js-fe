export class RacerEl {
  private getSvg(color: string): string {
    return `<?xml version="1.0" encoding="utf-8"?> <svg fill="#000000" width="24px" height="24px" viewBox="0 0 24 24" id="fish" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg"  class="icon flat-line"><path id="secondary" d="M14.5,7A9.93,9.93,0,0,0,8.1,9.74,4.83,4.83,0,0,0,6.77,8.55,3.65,3.65,0,0,0,3,8.51,4.14,4.14,0,0,0,5.08,12,4.14,4.14,0,0,0,3,15.49a3.65,3.65,0,0,0,3.77,0A4.83,4.83,0,0,0,8.1,14.26,9.93,9.93,0,0,0,14.5,17c5,0,6.5-5,6.5-5S19.5,7,14.5,7Z" style="fill: ${color}"); stroke-width: 2;"></path><path id="primary" d="M14.5,7A9.93,9.93,0,0,0,8.1,9.74,4.83,4.83,0,0,0,6.77,8.55,3.65,3.65,0,0,0,3,8.51,4.14,4.14,0,0,0,5.08,12,4.14,4.14,0,0,0,3,15.49a3.65,3.65,0,0,0,3.77,0A4.83,4.83,0,0,0,8.1,14.26,9.93,9.93,0,0,0,14.5,17c5,0,6.5-5,6.5-5S19.5,7,14.5,7Z" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>`;
  }

  public createRacer(color: string): HTMLElement {
    const el = document.createElement('div');

    el.classList.add('racer');
    el.innerHTML = this.getSvg(color);
    el.dataset.color = color;

    return el;
  }
}
