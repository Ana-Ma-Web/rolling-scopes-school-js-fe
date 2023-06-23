export interface Data {
  curLvl: number;
  levels: Level[];
}

interface Level {
  status: false | 'done' | 'help';
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
