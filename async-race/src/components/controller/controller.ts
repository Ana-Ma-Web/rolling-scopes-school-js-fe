import {
  Winner,
  Racer,
  RaceData,
  SwitchMoveModeProps,
  CreateRacerProps,
  GetRacersData,
} from '../../types';
import { data } from './data';

const baseUrl = 'http://127.0.0.1:3000';

const path = {
  garage: '/garage',
  engine: '/engine',
  winners: '/winners',
};

export const createRacer = async (props: CreateRacerProps): Promise<Racer> => {
  const url = `${baseUrl}${path.garage}/`;
  const racerData = { name: props.name, color: props.color };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(racerData),
  });

  const json = await response.json();
  return json;
};

export const updateRacer = async (props: Racer): Promise<Racer> => {
  const url = `${baseUrl}${path.garage}/${props.id}`;
  const racerData = { name: props.name, color: props.color };

  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(racerData),
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

export const getAllRacers = async (): Promise<GetRacersData> => {
  const url = `${baseUrl}${path.garage}`;
  const response = await fetch(url);
  const items = await response.json();

  const count = response.headers.get('X-Total-Count');

  return { items, count };
};

export const createWinner = async (props: Winner): Promise<GetRacersData> => {
  const url = `${baseUrl}${path.winners}`;
  const winnerData = { id: props.id, time: props.time, wins: props.wins };
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winnerData),
  });
  const items = response.json();

  try {
    // console.log('success', items);
  } catch (error) {
    console.log('error');
  }

  console.log('createWinners', response);
  return items;
};

export const updateWinner = async (props: Winner): Promise<Racer> => {
  const url = `${baseUrl}${path.winners}/${props.id}`;
  const winnerData = { time: props.time, wins: props.wins };

  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(winnerData),
  });

  const json = await response.json();
  return json;
};

export const switchMoveMode = async (
  props: SwitchMoveModeProps,
): Promise<RaceData> => {
  const { existWinnerCheck, updateWinners } = props.winnerCallbacks;
  const url = `${baseUrl}${path.engine}/?id=${props.id}&status=${props.status}`;
  const response = await fetch(url, { method: 'PATCH' });
  const json = await response.json();
  try {
    if (
      json.success &&
      data.garage.isRace &&
      !data.winners.isWin &&
      props.time
    ) {
      const newWinnerData = existWinnerCheck(props.id, props.time);
      console.log('empty controller existWinnerCheck', data.winners.winners);
      if (newWinnerData?.firstWin) {
        createWinner(newWinnerData);
      } else if (newWinnerData) {
        updateWinner(newWinnerData);
      }
    }
  } catch (error) {
    console.log('controller switchMoveMode', error);
  } finally {
    updateWinners();
  }

  return json;
};

export const getWinners = async (
  page: number,
  sortType: 'wins' | 'time',
): Promise<Winner[]> => {
  const url = `${baseUrl}${path.winners}?_page=${page}&_limit=10&_sort=${sortType}_order=ASC`;
  console.log(url);
  const response = await fetch(url);
  const items: Winner[] = await response.json();

  console.log('getWinners', items);
  return items;
};

export const deleteWinner = async (id: number): Promise<void> => {
  const url = `${baseUrl}${path.winners}/${id}`;

  const response = await fetch(url, {
    method: 'DELETE',
  });

  const json = await response.json();
  return json;
};

export const getAllWinners = async (): Promise<Winner[]> => {
  const url = `${baseUrl}${path.winners}`;
  const response = await fetch(url);
  const items: Winner[] = await response.json();

  console.log('getAllWinners', items);
  return items;
};

const resetWinners = async (): Promise<void> => {
  const winners = await getAllWinners();
  console.log('getAllWinners', winners);
  winners.forEach((e) => {
    deleteWinner(e.id);
  });
  console.log('getAllWinnersAfter', winners);
};

console.log(resetWinners());
