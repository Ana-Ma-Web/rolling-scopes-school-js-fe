import {
  createRacer,
  deleteRacer,
  getRacers,
  switchMoveMode,
} from '../../controller/controller';
import { GetRacersData, Animations } from '../../../types';
import { getRandomColor } from '../../../helpers/getRandomColor';
import { Track } from '../track/track';
import { Form } from './form';
import { getRandomName } from '../../../helpers/getRandomName';
import { Button } from '../ui/button';
import { data } from '../../controller/data';

export class Garage {
  private racersCount = 0;

  private finishCount = 0;

  private track: Track;

  private animations: Animations;

  constructor() {
    this.track = new Track();
    this.animations = {};
  }

  private getPageRacers(): Promise<GetRacersData> {
    return getRacers(data.garage.getPageNumber());
  }

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

  private raceDoneCounter(): void {
    this.finishCount += 1;
    if (this.racersCount >= 7 && this.finishCount === 7) {
      this.finishCount = 0;
      console.log(data.winners.setIsWin);
      data.winners.setIsWin(false);
      console.log('isDone', this.racersCount);
    } else if (this.racersCount < 7 && this.finishCount === this.racersCount) {
      this.finishCount = 0;
      data.winners.setIsWin(false);
      console.log('isDone', this.racersCount);
    }
  }

  public async startRacer(id: number): Promise<void> {
    if (this.animations[id]) this.animations[id].cancel();

    const startRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_race-start')
    );
    startRaceBtn.disabled = true;

    const stopBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_stop`)
    );
    stopBtn.disabled = true;

    const setWinner = data.winners.setWinner.bind(data.winners);
    const raceData = await switchMoveMode({
      status: 'started',
      id,
      setWinner,
    });

    this.animations[id] = this.animation(
      id,
      raceData.velocity,
      raceData.distance,
    );
    this.startDisableBtns(id);

    try {
      await switchMoveMode({ status: 'drive', id, setWinner });
    } catch (error) {
      this.animations[id].pause();
    }

    this.raceDoneCounter();
  }

  public async stopRacer(id: number): Promise<void> {
    const stopBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_stop`)
    );
    stopBtn.disabled = true;

    const startBtn = <HTMLButtonElement>(
      document.querySelector(`.track[data-id="${id}"] .track__btn_start`)
    );

    if (this.animations[id]) this.animations[id].cancel();

    const setWinner = data.winners.setWinner.bind(data.winners);
    await switchMoveMode({
      status: 'stopped',
      id,
      setWinner,
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

  private startRace(): void {
    const tracks = document.querySelectorAll('.track');

    const startRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_race-start')
    );
    startRaceBtn.disabled = true;

    tracks.forEach((e) => {
      const el = <HTMLElement>e;
      const btn = <HTMLButtonElement>el.querySelector(`.track__btn_start`);
      btn.disabled = true;
      this.startRacer(Number(el.dataset.id));
    });
  }

  private async resetRace(): Promise<void> {
    const resetRaceBtn = <HTMLButtonElement>(
      document.querySelector('.garage__btn_race-reset')
    );
    resetRaceBtn.disabled = true;
    data.winners.setIsWin(true);

    const tracks = document.querySelectorAll('.track');

    tracks.forEach((e) => {
      const el = <HTMLElement>e;
      this.stopRacer(Number(el.dataset.id));
    });
  }

  private generateRacers(): void {
    for (let i = 0; i < 5; i += 1) {
      createRacer({
        name: getRandomName(),
        color: getRandomColor(),
      });
    }
    this.updateGarageTracks();
  }

  private async removeRacer(id: number): Promise<void> {
    const response = await deleteRacer(id);
    this.updateGarageTracks();
    return response;
  }

  private racerHandler(type: string | undefined, trackEl: HTMLElement): void {
    switch (type) {
      case 'racer-start' || 'racer-stop':
        this.startRacer(Number(trackEl.dataset.id));
        break;
      case 'racer-stop':
        this.stopRacer(Number(trackEl.dataset.id));
        break;
      case 'racer-select':
        data.form.setSelectedId(Number(trackEl.dataset.id));
        break;
      case 'racer-remove':
        this.removeRacer(Number(trackEl.dataset.id));
        break;
      default:
        break;
    }
  }

  private raceHandler(type: string | undefined): void {
    switch (type) {
      case 'race-start':
        this.startRace();
        break;
      case 'race-reset':
        this.resetRace();
        break;
      default:
        break;
    }
  }

  private updatePaginationBtns(): void {
    const leftBtn = <HTMLButtonElement>(
      document.querySelector('button[data-type="pagination-left"]')
    );
    const rightBtn = <HTMLButtonElement>(
      document.querySelector('button[data-type="pagination-right"]')
    );

    if (data.garage.getPageNumber() === 1) {
      leftBtn.disabled = true;
    } else leftBtn.disabled = false;

    if (7 * data.garage.getPageNumber() >= Number(this.racersCount)) {
      rightBtn.disabled = true;
    } else rightBtn.disabled = false;
  }

  private paginationHandler(type: string | undefined): void {
    switch (type) {
      case 'pagination-left':
        data.garage.prevPageNumber();
        break;
      case 'pagination-right':
        data.garage.nextPageNumber();
        break;
      default:
        break;
    }

    this.updateGarageTracks();
  }

  private addListeners(root: HTMLElement): void {
    root.addEventListener('click', (e) => {
      const target = <HTMLElement>e.target;
      if (!target.classList.contains('btn')) return undefined;
      const trackEl = <HTMLElement>target.closest('.track');
      const typePrefix = target.dataset.type?.split('-')[0];
      switch (typePrefix) {
        case 'racer':
          this.racerHandler(target.dataset.type, trackEl);
          break;
        case 'race':
          this.raceHandler(target.dataset.type);
          break;
        case 'generate':
          this.generateRacers();
          break;
        case 'pagination':
          this.paginationHandler(target.dataset.type);
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

  private createGenerateRacersBtn(): HTMLElement {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'garage__btn', 'garage__btn_generate-racers');
    btn.dataset.type = 'generate-racers';
    btn.textContent = 'Generate racers';
    return btn;
  }

  private async updateGarageTracks(): Promise<void> {
    const tracks = document.querySelector('.garage__tracks');
    if (!tracks) throw new Error('Tracks is not found');

    tracks.innerHTML = '';

    const racersData = await this.getPageRacers();
    const racers = racersData.items;

    this.racersCount = Number(racersData.count);

    racers.forEach((e) => {
      const el = this.track.createTrack(e);
      tracks?.append(el);
    });

    const span = document.querySelector('.garage__racers-count');
    if (!span) throw new Error('racers count span is not found');
    span.textContent = String(this.racersCount);

    this.updatePaginationBtns();
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

  private createRacersCount(): HTMLSpanElement {
    const span = document.createElement('span');
    span.classList.add('garage__racers-count');
    return span;
  }

  public printGarage(): void {
    const garageEl = document.createElement('div');
    garageEl.classList.add('garage');
    const form = new Form(this.updateGarageTracks.bind(this));
    const tracks = document.createElement('div');
    tracks.classList.add('garage__tracks');

    document.body.append(garageEl);
    form.printForm();
    garageEl.append(
      this.createStartRaceBtn(),
      this.createResetRaceBtn(),
      this.createGenerateRacersBtn(),
      this.createRacersCount(),
      this.createPagination(),
      tracks,
    );

    this.updateGarageTracks();

    this.addListeners(garageEl);
  }
}
