import { Data } from '../../types';

export class App {
  constructor(private data: Data) {
    this.data = data;
  }

  public start(): void {}
}
