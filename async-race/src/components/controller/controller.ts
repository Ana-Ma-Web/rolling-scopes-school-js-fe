import { Car, RaceData } from '../../types';

export class AppController {
  public async getCar(id: number): Promise<Car> {
    const url = `http://127.0.0.1:3000/garage/${id}`;

    const response = await fetch(url);

    const json = await response.json();
    return json;
  }

  public async getCars(): Promise<Car[]> {
    const url = `http://127.0.0.1:3000/garage/`;

    return (await fetch(url)).json();
  }

  public async switchMoveMode(
    status: 'started' | 'stopped' | 'drive',
  ): Promise<RaceData> {
    const url = `http://127.0.0.1:3000/engine/?id=1&status=${status}`;
    const response = await fetch(url, { method: 'PATCH' });

    if (response.ok) {
      const json = await response.json();
      // console.log('32', json);
      return json;
    }
    console.log(`Error HTTP: ${response.status}`);
    throw new Error('ERROOOOOORRR');

    // console.log(response);
    // return 'finish';
  }
}
