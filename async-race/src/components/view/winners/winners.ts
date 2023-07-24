import {
  getAllRacers,
  getAllWinners,
  getWinners,
} from '../../controller/controller';
import { Winner } from '../../../types';
import { RacerEl } from '../racer/racer';
import { Button } from '../ui/button';
import './winners.css';
import { data } from '../../controller/data';

export class Winners {
  public async updateWinners(): // get: (page: number) => Promise<Winner[]>,
  Promise<Winner[]> {
    const { sortType } = data.winners;
    console.log('updateWinners sortType', sortType);
    const winnersOnPage = await getWinners(data.winners.getPage(), sortType);
    const allRacers = await getAllRacers();

    const winList = document.querySelector('.winners__list');

    if (!winList) throw new Error('Winners list not found');
    winList.innerHTML = '';
    // winList.append(this.createHeadWinnerLine());

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
    this.updatePagination();
    return winnersOnPage;
  }

  private async isLastPage(): Promise<boolean> {
    const pageNumber = data.winners.getPage();
    const allWinners = await getAllWinners();
    const maxPageSize = 10;

    console.log('isLastPage', pageNumber, maxPageSize, allWinners.length);
    if (!allWinners.length) return true;
    if (pageNumber * maxPageSize >= allWinners.length) {
      return true;
    }
    return false;
  }

  private async updatePagination(): Promise<void> {
    const pageNumber = data.winners.getPage();

    const prevBtn = <HTMLButtonElement>(
      document.querySelector('button[data-type="win-prev"]')
    );
    const nextBtn = <HTMLButtonElement>(
      document.querySelector('button[data-type="win-next"]')
    );

    if (pageNumber === 1) {
      console.log('first page number ', true);
      prevBtn.disabled = true;
    } else prevBtn.disabled = false;
    if (await this.isLastPage()) {
      console.log('last page number ', true);
      nextBtn.disabled = true;
    } else nextBtn.disabled = false;
    console.log('updatePagination', pageNumber, await this.isLastPage());

    //   if (pageNumber * )
    // }
  }

  private async paginationHandler(btnType: 'next' | 'prev'): Promise<void> {
    const prevBtn = <HTMLButtonElement>(
      document.querySelector('button[data-type="win-prev"]')
    );
    const nextBtn = <HTMLButtonElement>(
      document.querySelector('button[data-type="win-next"]')
    );
    switch (btnType) {
      case 'prev':
        data.winners.prevPage();
        break;
      case 'next':
        data.winners.nextPage();
        break;
      default:
        break;
    }
    this.updateWinners();
    this.updatePagination();
  }

  private async sortHandler(btnType: 'wins' | 'time'): Promise<void> {
    switch (btnType) {
      case 'wins':
        data.winners.sortType = 'wins';
        break;
      case 'time':
        data.winners.sortType = 'time';
        break;
      default:
        break;
    }
    this.updateWinners();
  }

  private winnersListener(): void {
    const btn = document.querySelector('button[data-type="win-btn"]');
    const prevBtn = document.querySelector('button[data-type="win-prev"]');
    const nextBtn = document.querySelector('button[data-type="win-next"]');
    const winsBtn = document.querySelector('div[data-type="header-wins"]');
    const timeBtn = document.querySelector('div[data-type="header-time"]');

    btn?.addEventListener('click', () => {
      const resp = this.updateWinners();
      console.log(resp);
    });

    prevBtn?.addEventListener('click', () => {
      this.paginationHandler('prev');
    });

    nextBtn?.addEventListener('click', () => {
      this.paginationHandler('next');
    });

    winsBtn?.addEventListener('click', () => {
      console.log('click wins');
      this.sortHandler('wins');
    });

    timeBtn?.addEventListener('click', () => {
      console.log('click time');
      this.sortHandler('time');
    });
  }

  private createHeadWinnerLine(): HTMLElement {
    const listItem = document.createElement('ul');
    listItem.classList.add('winners__list-item');

    const number = document.createElement('div');
    number.textContent = '№';
    const image = document.createElement('div');
    image.textContent = `Racer:`;
    const name = document.createElement('div');
    name.textContent = `Name:`;
    const wins = document.createElement('div');
    wins.dataset.type = 'header-wins';
    wins.textContent = `Wins:`;
    const time = document.createElement('div');
    time.dataset.type = 'header-time';
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
    time.textContent = `${(props.time / 1000).toFixed(2)}s`;

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

  public async printWinners(): Promise<void> {
    const main = document.querySelector('main');
    if (!main) throw new Error('Main is not founds');

    const winners = document.createElement('div');
    winners.classList.add('winners');
    const button = new Button();
    const prevBtn = button.createBtn({
      datasetType: 'win-prev',
      rootClass: 'winners',
      modClass: 'prev',
      textContent: 'Prev',
      isDisabled: true,
    });
    const nextBtn = button.createBtn({
      datasetType: 'win-next',
      rootClass: 'winners',
      modClass: 'next',
      textContent: 'Next',
      isDisabled: await this.isLastPage(),
    });
    const btn = button.createBtn({
      datasetType: 'win-btn',
      rootClass: 'winners',
      modClass: 'get-winners',
      textContent: 'Wins',
      isDisabled: false,
    });

    const winList = document.createElement('ul');
    winList.classList.add('winners__list');
    // winList.append(this.createHeadWinnerLine());
    winners.append(this.createHeadWinnerLine(), winList, btn, prevBtn, nextBtn);

    main.append(winners, this.createPopUp());

    this.winnersListener();
  }
}
