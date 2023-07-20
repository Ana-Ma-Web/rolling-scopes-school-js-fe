import {
  GetRacersData,
  Animations,
  CreateRacerProps,
  RaceData,
  Racer,
  SwitchMoveModeProps,
} from '../../../types';
import { getRandomColor } from '../../../helpers/getRandomColor';
import { Track } from '../track/track';
import { Form } from './form';
import { getRandomName } from '../../../helpers/getRandomName';
import { Button } from '../ui/button';

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
    const resetRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_race-reset')
    );
    const startBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_start`)
    );
    const stopBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_stop`)
    );
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

    const startRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_race-start')
    );
    startRaceBtn.disabled = true;

    const stopBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_stop`)
    );
    stopBtn.disabled = true;

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
        document.querySelector('.garage__btn_race-start')
      );
      startRaceBtn.disabled = false;
    }
  }

  private startRace(
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): void {
    const tracks = document.querySelectorAll('.track');

    const startRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_race-start')
    );
    startRaceBtn.disabled = true;

    tracks.forEach((e) => {
      const el = <HTMLElement>e;
      const btn = <HTMLButtonElement>el.querySelector(`.track__btn_start`);
      btn.disabled = true;
      this.startRacer(Number(el.dataset.id), switchMoveMode);
    });
  }

  private async resetRace(
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): Promise<void> {
    const resetRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_race-reset')
    );
    resetRaceBtn.disabled = true;

    const tracks = document.querySelectorAll('.track');

    tracks.forEach((e) => {
      const el = <HTMLElement>e;
      this.stopRacer(Number(el.dataset.id), switchMoveMode);
    });
  }

  private generateRacers(
    createRacerFetch: (props: CreateRacerProps) => Promise<Racer>,
    getRacers: () => Promise<GetRacersData>,
  ): void {
    for (let i = 0; i < 5; i += 1) {
      createRacerFetch({
        name: getRandomName(),
        color: getRandomColor(),
      });
    }
    this.updateGarageTracks(getRacers);
  }

  private async removeRacer(
    id: number,
    deleteRacer: (id: number) => Promise<void>,
    getRacers: () => Promise<GetRacersData>,
  ): Promise<void> {
    const response = await deleteRacer(id);
    this.updateGarageTracks(getRacers);
    return response;
  }

  private racerHandler(
    type: string | undefined,
    trackEl: HTMLElement,
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
    setSelectedId: (id: number) => void,
    deleteRacer: (id: number) => Promise<void>,
    getRacers: () => Promise<GetRacersData>,
  ): void {
    switch (type) {
      case 'racer-start' || 'racer-stop':
        this.startRacer(Number(trackEl.dataset.id), switchMoveMode);
        break;
      case 'racer-stop':
        this.stopRacer(Number(trackEl.dataset.id), switchMoveMode);
        break;
      case 'racer-select':
        setSelectedId(Number(trackEl.dataset.id));
        break;
      case 'racer-remove':
        this.removeRacer(Number(trackEl.dataset.id), deleteRacer, getRacers);
        break;
      default:
        break;
    }
  }

  private raceHandler(
    type: string | undefined,
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
  ): void {
    switch (type) {
      case 'race-start':
        this.startRace(switchMoveMode);
        break;
      case 'race-reset':
        this.resetRace(switchMoveMode);
        break;
      default:
        break;
    }
  }

  private addListeners(
    root: HTMLElement,
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
    setSelectedId: (id: number) => void,
    createRacerFetch: (props: CreateRacerProps) => Promise<Racer>,
    getRacers: () => Promise<GetRacersData>,
    deleteRacer: (id: number) => Promise<void>,
  ): void {
    root.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;
      if (!target.classList.contains('btn')) return undefined;
      const trackEl = <HTMLElement>target.closest('.track');
      const typePrefix = target.dataset.type?.split('-')[0];
      switch (typePrefix) {
        case 'racer':
          this.racerHandler(
            target.dataset.type,
            trackEl,
            switchMoveMode,
            setSelectedId,
            deleteRacer,
            getRacers,
          );
          break;
        case 'race':
          this.raceHandler(target.dataset.type, switchMoveMode);
          break;
        case 'generate':
          this.generateRacers(createRacerFetch, getRacers);
          break;
        default:
          break;
      }
      return undefined;
    });
  }

  private createStartRaceBtn(): HTMLElement {
    const startRaceBtn = document.createElement('button');
    startRaceBtn.classList.add('btn', 'garage__btn', 'garage__btn_race-start');
    startRaceBtn.dataset.type = 'race-start';
    startRaceBtn.textContent = 'Start race';
    return startRaceBtn;
  }

  private createResetRaceBtn(): HTMLElement {
    const resetRaceBtn = document.createElement('button');
    resetRaceBtn.classList.add('btn', 'garage__btn', 'garage__btn_race-reset');
    resetRaceBtn.dataset.type = 'race-reset';
    resetRaceBtn.textContent = 'Reset race';
    resetRaceBtn.disabled = true;
    return resetRaceBtn;
  }

  private generateRacersBtn(): HTMLElement {
    const generateRacersBtn = document.createElement('button');
    generateRacersBtn.classList.add(
      'btn',
      'garage__btn',
      'garage__btn_generate-racers',
    );
    generateRacersBtn.dataset.type = 'generate-racers';
    generateRacersBtn.textContent = 'Generate racers';
    return generateRacersBtn;
  }

  private async updateGarageTracks(
    getRacers: () => Promise<GetRacersData>,
  ): Promise<void> {
    const tracks = document.querySelector('.garage__tracks');
    if (!tracks) throw new Error('Tracks is not found');

    tracks.innerHTML = '';

    const racersData = await getRacers();
    const racers = racersData.items;

    racers.forEach((e) => {
      const el = this.track.createTrack(e);
      tracks?.append(el);
    });
  }

  private createPagination(): HTMLElement {
    const pagination = document.createElement('div');
    const button = new Button();
    const paginationBtnLeft = button.createBtn({
      datasetType: 'pagination-left',
      isDisabled: true,
      modClass: 'pagination-left',
      textContent: 'Prev',
      rootClass: 'pagination',
    });
    const paginationBtnRight = button.createBtn({
      datasetType: 'pagination-right',
      isDisabled: false,
      modClass: 'pagination-right',
      textContent: 'Next',
      rootClass: 'pagination',
    });

    pagination.append(paginationBtnLeft, paginationBtnRight);
    return pagination;
  }

  public print(
    getRacers: () => Promise<GetRacersData>,
    switchMoveMode: (props: SwitchMoveModeProps) => Promise<RaceData>,
    createRacer: (props: CreateRacerProps) => Promise<Racer>,
    updateRacer: (props: Racer) => Promise<Racer>,
    deleteRacer: (id: number) => Promise<void>,
  ): void {
    const garageEl = document.createElement('div');
    garageEl.classList.add('garage');
    const form = new Form();
    const setSelectedId = form.setSelectedId.bind(form);
    const tracks = document.createElement('div');
    tracks.classList.add('garage__tracks');

    document.body.append(garageEl);
    form.printForm({
      createRacer,
      updateRacer,
      getRacers,
      updateGarageTracks: this.updateGarageTracks.bind(this),
    });
    garageEl.append(
      this.createStartRaceBtn(),
      this.createResetRaceBtn(),
      this.generateRacersBtn(),
      this.createPagination(),
      tracks,
    );

    this.updateGarageTracks(getRacers);

    this.addListeners(
      garageEl,
      switchMoveMode,
      setSelectedId,
      createRacer,
      getRacers,
      deleteRacer,
    );
  }
}
