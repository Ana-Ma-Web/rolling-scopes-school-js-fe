import { Racer, RaceData, SwitchMoveModeProps } from '../../types';

export class AppController {
  private baseUrl = 'http://127.0.0.1:3000';

  private path = {
    garage: '/garage',
    engine: '/engine',
  };

  public async getRacer(id: number): Promise<Racer> {
    const url = `${this.baseUrl}${this.path.garage}/${id}`;

    const response = await fetch(url);

    const json = await response.json();
    return json;
  }

  public async getRacers(): Promise<{ items: Racer[]; count: string | null }> {
    const url = `${this.baseUrl}${this.path.garage}/`;
    const response = await fetch(url);
    const items = await response.json();

    const count = response.headers.get('X-Total-Count');

    return { items, count };
  }

  public async switchMoveMode(props: SwitchMoveModeProps): Promise<RaceData> {
    const url = `${this.baseUrl}${this.path.engine}/?id=${props.id}&status=${props.status}`;
    const response = await fetch(url, { method: 'PATCH' });
    const data = await response.json();

    return data;
  }
}
