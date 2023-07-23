export interface Racer {
  name: string;
  color: string;
  id: number;
}
export interface Winner {
  id: number;
  time: number;
  wins: number;
  firstWin?: boolean;
}

export interface RaceData {
  velocity: number;
  distance: number;
}

export type MoveMode = 'started' | 'stopped' | 'drive';

export interface SwitchMoveModeProps {
  status: MoveMode;
  id: number;
  existWinnerCheck: (id: number, time: number) => Winner | undefined;
  time?: number;
}
export interface CreateRacerProps {
  name: string;
  color: string;
}

export interface GetRacersData {
  items: Racer[];
  count: string | null;
  success?: boolean;
}

export interface Animations {
  [index: number]: Animation;
}

export type FormCreateRacers = (props: {
  createRacer: (props: CreateRacerProps) => Promise<Racer>;
}) => void;
