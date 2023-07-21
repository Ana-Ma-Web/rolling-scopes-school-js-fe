import {
  CreateRacerProps,
  RaceData,
  Racer,
  SwitchMoveModeProps,
} from '../../types';
import { Garage } from './garage/garage';

export class AppView {
  private garage: Garage;

  constructor() {
    this.garage = new Garage();
  }

  public print(
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
    createRacer: (props: CreateRacerProps) => Promise<Racer>,
    updateRacer: (props: Racer) => Promise<Racer>,
    deleteRacer: (id: number) => Promise<void>,
  ): void {
    this.garage.print(switchMoveMode, createRacer, updateRacer, deleteRacer);
  }
}
