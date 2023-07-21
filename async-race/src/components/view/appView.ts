import { Garage } from './garage/garage';

export class AppView {
  private garage: Garage;

  constructor(resetIsWin: () => void) {
    this.garage = new Garage(resetIsWin);
  }

  public print(setWinner: (id: number) => void): void {
    this.garage.print(setWinner);
  }
}
