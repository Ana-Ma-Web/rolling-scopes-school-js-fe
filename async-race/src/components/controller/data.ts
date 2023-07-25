import { Winner } from '../../types';

export const data = {
  winners: {
    page: 1,
    sortType: 'time' as 'time' | 'wins',
    isWin: false,
    winners: [] as Winner[],
    getPage(): number {
      return this.page;
    },
    nextPage(): void {
      this.page += 1;
    },
    prevPage(): void {
      this.page -= 1;
    },
    getIsWin(): boolean {
      return this.isWin;
    },
    setIsWin(isWin: boolean): void {
      this.isWin = isWin;
    },
    existWinnerCheck(id: number, time: number): Winner | undefined {
      const racerData = { id, ...this.countWinsData(id, time) };

      if (!this.isWin && racerData.wins === 1) {
        this.winners.push(racerData);
        return { firstWin: true, ...racerData };
      }

      if (!this.isWin && racerData.wins > 1) {
        return { firstWin: false, ...racerData };
      }

      return undefined;
    },
    countWinsData(id: number, time: number): { wins: number; time: number } {
      const curRacer = this.winners.find((e) => e.id === id);
      if (curRacer) {
        curRacer.wins += 1;
        curRacer.time = curRacer.time < time ? curRacer.time : time;
        return { wins: curRacer.wins, time: curRacer.time };
      }
      return { wins: 1, time };
    },
  },

  garage: {
    pageNumber: 1,
    stoppedRacers: 1,
    isRace: false,
    getPageNumber(): number {
      return this.pageNumber;
    },
    nextPageNumber(): void {
      this.pageNumber += 1;
    },
    prevPageNumber(): void {
      this.pageNumber -= 1;
    },
    getIsRace(): boolean {
      return this.isRace;
    },
    setIsRace(isRace: boolean): void {
      this.isRace = isRace;
    },
  },

  form: {
    selectedId: 0,
    setSelectedId(id: number): void {
      this.selectedId = id;
      const selectBtn = <HTMLButtonElement>(
        document.querySelector('button[data-type="btn-update"]')
      );
      selectBtn.disabled = false;
    },
  },
};
