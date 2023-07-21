import {
  Racer,
  RaceData,
  SwitchMoveModeProps,
  CreateRacerProps,
  GetRacersData,
} from '../../types';

const baseUrl = 'http://127.0.0.1:3000';

const path = {
  garage: '/garage',
  engine: '/engine',
};

export const createRacer = async (props: CreateRacerProps): Promise<Racer> => {
  const url = `${baseUrl}${path.garage}/`;
  const data = { name: props.name, color: props.color };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  return json;
};

export const updateRacer = async (props: Racer): Promise<Racer> => {
  const url = `${baseUrl}${path.garage}/${props.id}`;
  const data = { name: props.name, color: props.color };

  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await response.json();
  return json;
};

export const deleteRacer = async (id: number): Promise<void> => {
  const url = `${baseUrl}${path.garage}/${id}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });

  const json = await response.json();
  return json;
};

export const getRacer = async (id: number): Promise<Racer> => {
  const url = `${baseUrl}${path.garage}/${id}`;

  const response = await fetch(url);

  const json = await response.json();
  return json;
};

export const getAllRacers = async (): Promise<GetRacersData> => {
  const url = `${baseUrl}${path.garage}`;
  const response = await fetch(url);
  const items = await response.json();

  const count = response.headers.get('X-Total-Count');

  return { items, count };
};

export const getRacers = async (page: number): Promise<GetRacersData> => {
  const url = `${baseUrl}${path.garage}?_page=${page}&_limit=7`;
  const response = await fetch(url);
  const items = await response.json();

  const count = response.headers.get('X-Total-Count');

  return { items, count };
};

export const switchMoveMode = async (
  props: SwitchMoveModeProps,
): Promise<RaceData> => {
  const url = `${baseUrl}${path.engine}/?id=${props.id}&status=${props.status}`;
  const response = await fetch(url, { method: 'PATCH' });
  const data = await response.json();

  return data;
};
