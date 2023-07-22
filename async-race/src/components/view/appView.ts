import { Garage } from './garage/garage';
import { Winners } from './winners/winners';

export class AppView {
  private garage: Garage;

  private winners: Winners;

  constructor() {
    this.garage = new Garage();
    this.winners = new Winners();
  }

  public print(): void {
    this.winners.printWinners();
    this.garage.printGarage();
  }
}
