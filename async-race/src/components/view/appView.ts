import { Garage } from './garage/garage';

export class AppView {
  private garage: Garage;

  constructor(setIsWin: (isWin: boolean) => void) {
    this.garage = new Garage(setIsWin);
  }

  public print(setWinner: (id: number) => void): void {
    this.garage.print(setWinner);
  }
}
