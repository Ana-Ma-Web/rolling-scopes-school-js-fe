import { Car } from '../../types';
import { Garage } from './garage/garage';

export class AppView {
  private garage: Garage;

  constructor() {
    this.garage = new Garage();
  }

  public print(racers: Car[]): void {
    // console.log(this.garage.print(racers));
    this.garage.print(racers);
  }
}
