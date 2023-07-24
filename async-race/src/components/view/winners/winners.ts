import { getAllRacers, getWinners } from '../../controller/controller';
import { Winner } from '../../../types';
import { RacerEl } from '../racer/racer';
import { Button } from '../ui/button';
import './winners.css';

export class Winners {
  public async updateWinners(): // get: (page: number) => Promise<Winner[]>,
  Promise<Winner[]> {
    const winnersOnPage = await getWinners(1);
    const allRacers = await getAllRacers();

    const winList = document.querySelector('.winners__list');

    if (!winList) throw new Error('Winners list not found');
    winList.innerHTML = '';
    winList.append(this.createHeadWinnerLine());

    winnersOnPage.forEach((e, i) => {
      const curWinner = allRacers.items.find((el) => el.id === e.id);
      if (!curWinner) throw new Error('Winner is not found');
      winList.append(
        this.createWinnerLine({
          number: i + 1,
          color: curWinner.color,
          name: curWinner.name,
          wins: e.wins,
          time: e.time,
        }),
      );
    });
    console.log('winnersOnPage', winnersOnPage);
    return winnersOnPage;
  }

  private winnersListener(): void {
    const btn = document.querySelector('button[data-type="win-btn"]');

    btn?.addEventListener('click', () => {
      const resp = this.updateWinners();
      console.log(resp);
    });
  }

  private createHeadWinnerLine(): HTMLElement {
    const listItem = document.createElement('li');
    listItem.classList.add('winners__list-item');

    const number = document.createElement('div');
    number.textContent = '№';
    const image = document.createElement('div');
    image.textContent = `Racer:`;
    const name = document.createElement('div');
    name.textContent = `Name:`;
    const wins = document.createElement('div');
    wins.textContent = `Wins:`;
    const time = document.createElement('div');
    time.textContent = `Time:`;

    listItem.append(number, image, name, wins, time);

    return listItem;
  }

  private createWinnerLine(props: {
    number: number;
    color: string;
    name: string;
    wins: number;
    time: number;
  }): HTMLElement {
    const racer = new RacerEl();
    const listItem = document.createElement('li');
    listItem.classList.add('winners__list-item');

    const number = document.createElement('div');
    number.textContent = String(props.number);
    const image = racer.createRacer(props.color);
    const name = document.createElement('div');
    name.textContent = `${props.name}`;
    const wins = document.createElement('div');
    wins.textContent = `${props.wins}`;
    const time = document.createElement('div');
    time.textContent = `${(props.time / 1000).toFixed(2)}`;

    listItem.append(number, image, name, wins, time);

    return listItem;
  }

  private createPopUp(): HTMLElement {
    const main = document.querySelector('main');
    if (!main) throw new Error('Main is not founds');

    const popUp = document.createElement('div');
    popUp.classList.add('pop-up');

    return popUp;
  }

  public printWinners(): void {
    const main = document.querySelector('main');
    if (!main) throw new Error('Main is not founds');

    const winners = document.createElement('div');
    winners.classList.add('winners');
    const button = new Button();
    const btn = button.createBtn({
      datasetType: 'win-btn',
      rootClass: 'winners',
      modClass: 'get-winners',
      textContent: 'Wins',
      isDisabled: false,
    });

    const winList = document.createElement('ul');
    winList.classList.add('winners__list');
    winList.append(this.createHeadWinnerLine());
    winners.append(winList, btn);

    main.append(winners, this.createPopUp());

    this.winnersListener();
  }
}
