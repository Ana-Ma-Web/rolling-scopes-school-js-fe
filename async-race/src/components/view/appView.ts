import { Garage } from './garage/garage';
import { Button } from './ui/button';
import { Winners } from './winners/winners';

export class AppView {
  private garage: Garage;

  private winners: Winners;

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
  }

  private headerListener(): void {
    const header = document.querySelector('header');
    const winBtn = document.querySelector('[data-type="header-win"]');
    const garageBtn = document.querySelector('[data-type="header-garage"]');

    if (!header || !winBtn || !garageBtn)
      throw new Error('Header is not found');

    header.addEventListener('click', (e) => {
      const target = <HTMLButtonElement>e.target;
      if (!target.dataset.type) return undefined;

      switch (target.dataset.type) {
        case 'header-win':
          break;
        case 'header-garage':
          break;
        default:
          break;
      }

      return undefined;
    });
  }

  private createHeader(): HTMLElement {
    const header = document.createElement('header');

    const button = new Button();
    const winBtn = button.createBtn({
      datasetType: 'header-win',
      rootClass: 'header',
      modClass: 'winners',
      textContent: 'Winners',
      isDisabled: false,
    });
    const garageBtn = button.createBtn({
      datasetType: 'header-garage',
      rootClass: 'header',
      modClass: 'garage',
      textContent: 'Garage',
      isDisabled: false,
    });

    header.append(winBtn, garageBtn);

    return header;
  }

  public print(): void {
    const main = document.createElement('main');

    document.body.append(this.createHeader(), main);

    this.winners.printWinners();
    this.garage.printGarage();
  }
}
