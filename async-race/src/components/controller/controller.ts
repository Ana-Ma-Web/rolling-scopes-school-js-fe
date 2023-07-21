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
  winners: '/winners',
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

  try {
    if (data.success && props.setWinner) {
      props.setWinner(props.id);
      console.log('setWinner');
    }
  } catch (error) {
    console.log('setWinner');
    // props.setWinner(666);
  }
  // console.log('data', data, props.id);

  return data;
};

export const getWinners = async (page: number): Promise<GetRacersData> => {
  const url = `${baseUrl}${path.winners}?_page=${page}&_limit=7&_sort='time'`;
  const response = await fetch(url);
  const items = await response.json();

  console.log(items);
  return items;
};

// const winners = await getWinners(1);

// console.log(winners);
getWinners(1);
