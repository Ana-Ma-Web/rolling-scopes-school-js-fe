import { Track } from '../track/track';
import { Car } from '../../../types';

export class Garage {
  private track: Track;

  constructor() {
    this.track = new Track();
  }

  public start(): void {}

  public animation(id: number, velocity: number, distance: number): void {
    const track = document.querySelector(`div[data-id="${id}"]`);
    const racer = track?.querySelector(`.racer`);
    console.log('anim', racer);

    racer?.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(calc(${track?.clientWidth}px - 50px))` },
      ],
      {
        fill: 'forwards',
        duration: distance / velocity,
      },
    );
  }

  public print(racers: Car[]): void {
    const garageEl = document.createElement('div');
    garageEl.classList.add('garage');

    racers.forEach((e) => {
      const el = this.track.createTrack(e);
      garageEl.append(el);
      console.log(e.name);
      // this.animation(e.id);
    });
    document.body.append(garageEl);

    console.log('garage');
  }
}
