export interface Racer {
  name: string;
  color: string;
  id: number;
}

export interface RaceData {
  velocity: number;
  distance: number;
}

export type MoveMode = 'started' | 'stopped' | 'drive';

export interface SwitchMoveModeProps {
  status: MoveMode;
  id: number;
}
export interface CreateRacerProps {
  name: string;
  color: string;
}

export interface GetRacersData {
  items: Racer[];
  count: string | null;
}

export interface Animations {
  [index: number]: Animation;
}
