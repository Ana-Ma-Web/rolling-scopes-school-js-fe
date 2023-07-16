import { Car, RaceData } from '../../types';

export class AppController {
  private baseUrl = 'http://127.0.0.1:3000';

  private path = {
    garage: '/garage',
    engine: '/engine',
  };

  public async getCar(id: number): Promise<Car> {
    const url = `${this.baseUrl}${this.path.garage}/${id}`;

    const response = await fetch(url);

    const json = await response.json();
    return json;
  }

  public async getCars(): Promise<Car[]> {
    const url = `${this.baseUrl}${this.path.garage}/`;

    return (await fetch(url)).json();
  }

  public async switchMoveMode(
    status: 'started' | 'stopped' | 'drive',
  ): Promise<RaceData> {
    const url = `${this.baseUrl}${this.path.engine}/?id=1&status=${status}`;
    const response = await fetch(url, { method: 'PATCH' });
    const data = await response.json();

    return data;
  }
}
