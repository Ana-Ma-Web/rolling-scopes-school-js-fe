export const data = {
  winners: {
    isWin: false,
    winners: [] as number[],
    getIsWin(): boolean {
      return this.isWin;
    },
    setIsWin(isWin: boolean): void {
      this.isWin = isWin;
      console.log('set', this.isWin);
    },
    setWinner(id: number): void {
      if (!this.isWin) this.winners.push(id);
      this.isWin = true;
      console.log(this.isWin);
      console.log(this.winners);
    },
  },

  garage: {
    pageNumber: 1,
    getPageNumber(): number {
      return this.pageNumber;
    },
    nextPageNumber(): void {
      this.pageNumber += 1;
    },
    prevPageNumber(): void {
      this.pageNumber -= 1;
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
