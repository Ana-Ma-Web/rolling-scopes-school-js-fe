import { GetRacersData } from '../../types';
import { getWinners } from '../controller/controller';
import { AppView } from '../view/appView';
import './app.css';

export class App {
  private view: AppView;

  private isWin = false;

  private winners = [0];

  constructor() {
    this.view = new AppView(this.resetIsWin.bind(this));
  }

  private printWinners(): void {
    const winners = document.createElement('div');
    const btn = document.createElement('button');
    btn.dataset.type = 'win-btn';
    btn.textContent = 'win';
    const winList = document.createElement('div');

    winners.append(winList, btn);

    document.body.append(winners);
  }

  private async updateWinners(
    get: (page: number) => Promise<GetRacersData>,
  ): Promise<GetRacersData> {
    const data = await get(1);
    // console.log(data);
    return data;
  }

  private winnersListener(): void {
    const btn = document.querySelector('button[data-type="win-btn"]');

    btn?.addEventListener('click', (e) => {
      const resp = this.updateWinners(getWinners);
      console.log(resp);
    });
  }

  public getIsWin(): boolean {
    return this.isWin;
  }

  public setWinner(id: number): void {
    console.log(this.winners);
    console.log(this.isWin);
    if (!this.isWin) this.winners.push(id);
    this.isWin = true;
    // console.log(this.winners);
  }

  public resetIsWin(): void {
    this.isWin = false;
    console.log('reset', this.isWin);
  }

  // private updateWinners(): void {

  // }

  public async start(): Promise<void> {
    this.printWinners();
    // this.updateWinners();
    this.view.print(this.setWinner.bind(this));
    // this.updateWinners();
    this.winnersListener();
  }
}
