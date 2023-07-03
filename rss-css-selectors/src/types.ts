export interface Data {
  activeLvl: number;
  levels: Level[];
  pushDataToLocalStorage: () => void;
  pullDataFromLocalStorage: () => void;
  setActiveLvl: (newLvl: number) => void;
  setNextActiveLvl: () => void;
  resetProgress: () => void;
}

export interface Level {
  status: Status;
  selector: string;
  table: TagType[];
}

export interface TagType {
  key: string;
  tagName: string;
  shape: number;
  texture: number;
  classes: string | null;
  innerTags: TagType[] | null;
  isMove: boolean;
}

export type Status = false | 'done' | 'help' | 'help-done';

export interface FullUpdate {
  updateNavList: () => void;
  updateField: () => void;
  updateHtmlViewer: () => void;
  resetInput: () => void;
}

export interface CreateEl<Type> {
  (rootClass: string): Type;
}
