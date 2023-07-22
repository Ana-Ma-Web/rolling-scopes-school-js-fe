import { GetRacersData } from '../../../types';
import { getWinners } from '../../controller/controller';

export class Winners {
  private async updateWinners(
    get: (page: number) => Promise<GetRacersData>,
  ): Promise<GetRacersData> {
    const racersOnPage = await get(1);
    // console.log(racersOnPage);
    return racersOnPage;
  }

  private winnersListener(): void {
    const btn = document.querySelector('button[data-type="win-btn"]');

    btn?.addEventListener('click', (e) => {
      const resp = this.updateWinners(getWinners);
      console.log(resp);
    });
  }

  public printWinners(): void {
    const winners = document.createElement('div');
    const btn = document.createElement('button');
    btn.dataset.type = 'win-btn';
    btn.textContent = 'win';
    const winList = document.createElement('div');

    winners.append(winList, btn);

    document.body.append(winners);

    this.winnersListener();
  }
}
