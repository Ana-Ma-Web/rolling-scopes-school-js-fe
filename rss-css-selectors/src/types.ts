export interface Data {
  activeLvl: number;
  levels: Level[];
  pushDataToLocalStorage: () => void;
  pullDataFromLocalStorage: () => void;
  setActiveLvl: (newLvl: number) => void;
  resetProgress: () => void;
}

interface Level {
  status: Status;
  table: TagType[];
}

export interface TagType {
  tagName: string;
  shape: number;
  texture: number;
  classes: string | null;
  innerTags: TagType[] | null;
  isMove: boolean;
}

export type Status = false | 'done' | 'help';
