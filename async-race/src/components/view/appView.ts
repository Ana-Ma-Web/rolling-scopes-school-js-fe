import { Car } from '../../types';
import { Garage } from './garage/garage';

export class AppView {
  private garage: Garage;

  constructor() {
    this.garage = new Garage();
  }

  public animation(id: number, velocity: number, distance: number): Animation {
    return this.garage.animation(id, velocity, distance);
  }

  public print(racers: Car[]): void {
    this.garage.print(racers);
  }
}
