import { Garage } from './garage/garage';
import { Button } from './ui/button';
import { Winners } from './winners/winners';
import './header.css';

export class AppView {
  private garage: Garage;

  private winners: Winners;

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
  }

  private headerListener(): void {
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const winBtn = <HTMLButtonElement>(
      document.querySelector('[data-type="header-win"]')
    );
    const garageBtn = <HTMLButtonElement>(
      document.querySelector('[data-type="header-garage"]')
    );

    if (!header || !winBtn || !garageBtn || !main)
      throw new Error('Header is not found');

    header.addEventListener('click', (e) => {
      const target = <HTMLButtonElement>e.target;
      if (!target.dataset.type) return undefined;

      switch (target.dataset.type) {
        case 'header-win':
          main.classList.add('win-open');
          winBtn.disabled = true;
          garageBtn.disabled = false;
          break;
        case 'header-garage':
          main.classList.remove('win-open');
          winBtn.disabled = false;
          garageBtn.disabled = true;
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
      isDisabled: true,
    });

    header.append(winBtn, garageBtn);

    return header;
  }

  public print(): void {
    const main = document.createElement('main');

    document.body.append(this.createHeader(), main);

    this.winners.printWinners();
    this.garage.printGarage();
    this.headerListener();
  }
}
