import { Winner } from '../../types';

export const data = {
  winners: {
    isWin: false,
    winners: [] as Winner[],
    getIsWin(): boolean {
      return this.isWin;
    },
    setIsWin(isWin: boolean): void {
      this.isWin = isWin;
      console.log('set', this.isWin);
    },
    existWinnerCheck(id: number, time: number): Winner | undefined {
      const racerData = { id, ...this.countWinsData(id, time) };

      if (!this.isWin && racerData.wins === 1) {
        this.winners.push(racerData);
        console.log('winnersPush', racerData);
        this.isWin = true;
        console.log('data setWinner', this.isWin);
        console.log(this.winners);
        return { firstWin: true, ...racerData };
      }

      if (!this.isWin && racerData.wins > 1) {
        this.isWin = true;
        console.log('data setWinner', this.isWin);
        console.log(this.winners);
        return { firstWin: false, ...racerData };
      }

      return undefined;
    },
    // setWinner(id: number, time: number): void {
    //   const racerData = this.countWinsData(id, time);
    //   if (!this.isWin && racerData.wins <= 1) {
    //     this.winners.push({ id, ...racerData });
    //     const resp = createWinner({ id, ...racerData });
    //     console.log(resp);
    //   }
    //   this.isWin = true;
    //   console.log('data setWinner', this.isWin);
    //   console.log(this.winners);
    // },
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
      console.log('set', this.isRace);
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
