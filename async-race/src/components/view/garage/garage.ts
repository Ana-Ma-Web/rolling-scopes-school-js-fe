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

  private isActiveBtns(btns: NodeListOf<HTMLButtonElement>): boolean {
    let result = true;
    btns.forEach((e) => {
      if (e.disabled) result = false;
    });

    return result;
  }

  private startDisableBtns(id: number): void {
    const startRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_start-race')
    );
    const resetRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_reset-race')
    );
    const startBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_start`)
    );
    const stopBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_stop`)
    );
    startRaceBtn.disabled = true;
    stopBtn.disabled = false;
    startBtn.disabled = true;

    const stopBtns = document.querySelectorAll(`.track__btn_stop`);
    const isDone = this.isActiveBtns(<NodeListOf<HTMLButtonElement>>stopBtns);
    if (isDone) {
      resetRaceBtn.disabled = false;
    }
  }

  public async startRacer(
    id: number,
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): Promise<void> {
    if (this.animations[id]) this.animations[id].cancel();

    const raceData = await switchMoveMode({
      status: 'started',
      id,
    });

    this.animations[id] = this.animation(
      id,
      raceData.velocity,
      raceData.distance,
    );

    this.startDisableBtns(id);

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
    const stopBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_stop`)
    );
    stopBtn.disabled = true;

    const startBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_start`)
    );

    if (this.animations[id]) this.animations[id].cancel();

    await switchMoveMode({
      status: 'stopped',
      id,
    });
    startBtn.disabled = false;

    const startBtns = document.querySelectorAll(`.track__btn_start`);
    const isDone = this.isActiveBtns(<NodeListOf<HTMLButtonElement>>startBtns);
    if (isDone) {
      const startRaceBtn = <HTMLButtonElement>(
        document.querySelector('.garage__btn_start-race')
      );
      startRaceBtn.disabled = false;
    }
  }

  private startRace(
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): void {
    const tracks = document.querySelectorAll('.track');

    const startRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_start-race')
    );
    startRaceBtn.disabled = true;

    tracks.forEach((e) => {
      const el = <HTMLElement>e;
      this.startRacer(Number(el.dataset.id), switchMoveMode);
    });
  }

  private async resetRace(
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): Promise<void> {
    const resetRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_reset-race')
    );
    resetRaceBtn.disabled = true;

    const tracks = document.querySelectorAll('.track');

    tracks.forEach((e) => {
      const el = <HTMLElement>e;
      this.stopRacer(Number(el.dataset.id), switchMoveMode);
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
        case 'reset-race':
          this.resetRace(switchMoveMode);
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

    const resetRaceBtn = document.createElement('button');
    resetRaceBtn.classList.add('btn', 'garage__btn', 'garage__btn_reset-race');
    resetRaceBtn.dataset.btnType = 'reset-race';
    resetRaceBtn.textContent = 'Reset race';
    resetRaceBtn.disabled = true;

    garageEl.append(startRaceBtn, resetRaceBtn, tracks);

    racers.forEach((e) => {
      const el = this.track.createTrack(e);
      tracks.append(el);
    });
    document.body.append(garageEl);

    this.addListeners(garageEl, switchMoveMode);
  }
}
