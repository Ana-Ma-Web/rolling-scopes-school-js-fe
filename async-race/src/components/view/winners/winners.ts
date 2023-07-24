import {
  getRacers,
  getAllRacers,
  getWinners,
} from '../../controller/controller';
import { Winner } from '../../../types';
import { data } from '../../controller/data';
import { RacerEl } from '../racer/racer';
import { Button } from '../ui/button';

export class Winners {
  public async updateWinners(): // get: (page: number) => Promise<Winner[]>,
  Promise<Winner[]> {
    const winnersOnPage = await getWinners(1);
    const allRacers = await getAllRacers();

    const winList = document.querySelector('.winners__list');

    if (!winList) throw new Error('Winners list not found');
    winList.innerHTML = '';

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

    console.log(winnersOnPage);
    return winnersOnPage;
  }

  private winnersListener(): void {
    const btn = document.querySelector('button[data-type="win-btn"]');

    btn?.addEventListener('click', () => {
      const resp = this.updateWinners();
      console.log(resp);
    });
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

    const number = document.createElement('div');
    const image = racer.createRacer(props.color);
    const name = document.createElement('div');
    name.textContent = `name: ${props.name}`;
    const wins = document.createElement('div');
    wins.textContent = `wins: ${props.wins}`;
    const time = document.createElement('div');
    time.textContent = `time: ${(props.time / 1000).toFixed(2)}`;

    listItem.append(number, image, name, wins, time);

    return listItem;
  }

  public printWinners(): void {
    const main = document.querySelector('main');
    if (!main) throw new Error('Main is not founs');

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
    winners.append(winList, btn);

    main.append(winners);

    this.winnersListener();
  }
}
