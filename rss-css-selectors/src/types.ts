export interface Data {
  curLvl: number;
  levels: Level[];
}

interface Level {
  table: TagType[];
}

export interface TagType {
  tagName: string;
  classes: string;
  innerTags: TagType[] | null;
}
