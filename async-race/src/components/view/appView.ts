import { RaceData, Racer, SwitchMoveModeProps } from '../../types';
import { Garage } from './garage/garage';

export class AppView {
  private garage: Garage;

  constructor() {
    this.garage = new Garage();
  }

  public print(
    racers: Racer[],
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): void {
    this.garage.print(racers, switchMoveMode);
  }
}
