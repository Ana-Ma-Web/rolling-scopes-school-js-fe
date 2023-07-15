import { Track } from '../track/track';
import { Car } from '../../../types';

export class Garage {
  private track: Track;

  constructor() {
    this.track = new Track();
  }

  public start(): void {}

  public print(racers: Car[]): void {
    const garageEl = document.createElement('div');
    garageEl.classList.add('garage');

    racers.forEach((e) => {
      const el = this.track.createTrack(e);
      garageEl.append(el);
      console.log(e.name);
    });
    document.body.append(garageEl);

    console.log('garage');
  }
}
