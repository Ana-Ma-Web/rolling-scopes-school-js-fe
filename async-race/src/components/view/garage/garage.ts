import { Track } from '../track/track';
import {
  Animations,
  RaceData,
  Racer,
  SwitchMoveModeProps,
} from '../../../types';

export class Garage {
  private track: Track;

  private animations: Animations;

  constructor() {
    this.track = new Track();
    this.animations = {};
  }

  public start(): void {}

  public animation(id: number, velocity: number, distance: number): Animation {
    const track = document.querySelector(`div[data-id="${id}"]`);
    const racer = track?.querySelector(`.racer`);

    if (!racer) throw new Error('Racer is not found');

    this.animations[id] = racer.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(calc(${track?.clientWidth}px - 50px))` },
      ],
      {
        fill: 'forwards',
        duration: distance / velocity,
      },
    );

    return this.animations[id];
  }

  public async startRacer(
    id: number,
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): Promise<void> {
    const raceData = await switchMoveMode({
      status: 'started',
      id,
    });

    this.animations[id] = this.animation(
      id,
      raceData.velocity,
      raceData.distance,
    );

    try {
      await switchMoveMode({ status: 'drive', id });
    } catch (error) {
      this.animations[id].pause();
    }
  }

  public async stopRacer(
    id: number,
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): Promise<void> {
    this.animations[id].pause();
    await switchMoveMode({
      status: 'stopped',
      id,
    });
    console.log('anim stop', this.animations[id]);
  }

  private async startRace(
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): Promise<void> {
    const tracks = document.querySelectorAll('.track');

    tracks.forEach((e) => {
      const el = <HTMLElement>e;
      console.log(el);
      this.startRacer(Number(el.dataset.id), switchMoveMode);
    });
  }

  private addListeners(
    root: HTMLElement,
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): void {
    root.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;
      console.log('meow');

      if (!target.classList.contains('btn')) return undefined;

      const trackEl = <HTMLElement>target.closest('.track');

      switch (target.dataset.btnType) {
        case 'racer-start':
          if (trackEl.dataset.id) {
            this.startRacer(Number(trackEl.dataset.id), switchMoveMode);
          }
          break;
        case 'racer-stop':
          this.stopRacer(Number(trackEl.dataset.id), switchMoveMode);
          break;
        case 'start-race':
          this.startRace(switchMoveMode);
          break;
        default:
          break;
      }

      return undefined;
    });
  }

  public print(
    racers: Racer[],
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): void {
    const garageEl = document.createElement('div');
    garageEl.classList.add('garage');

    const tracks = document.createElement('div');
    tracks.classList.add('garage__tracks');

    const startRaceBtn = document.createElement('button');
    startRaceBtn.classList.add('btn', 'garage__btn', 'garage__btn_start-race');
    startRaceBtn.dataset.btnType = 'start-race';
    startRaceBtn.textContent = 'Start race';

    garageEl.append(startRaceBtn, tracks);

    racers.forEach((e) => {
      const el = this.track.createTrack(e);
      tracks.append(el);
    });
    document.body.append(garageEl);

    this.addListeners(garageEl, switchMoveMode);
  }
}
