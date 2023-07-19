import {
  Racer,
  RaceData,
  SwitchMoveModeProps,
  CreateRacerProps,
  GetRacersData,
} from '../../types';

export class AppController {
  private baseUrl = 'http://127.0.0.1:3000';

  private path = {
    garage: '/garage',
    engine: '/engine',
  };

  public async createRacer(props: CreateRacerProps): Promise<Racer> {
    const url = `${this.baseUrl}${this.path.garage}/`;
    const data = { name: props.name, color: props.color };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log(json);
    return json;
  }

  public async updateRacer(props: Racer): Promise<Racer> {
    const url = `${this.baseUrl}${this.path.garage}/${props.id}`;
    const data = { name: props.name, color: props.color };

    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log(json);
    return json;
  }

  public async getRacer(id: number): Promise<Racer> {
    const url = `${this.baseUrl}${this.path.garage}/${id}`;

    const response = await fetch(url);

    const json = await response.json();
    return json;
  }

  public async getRacers(): Promise<GetRacersData> {
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
