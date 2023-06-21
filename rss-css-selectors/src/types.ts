export interface Data {
  levels: Level[];
}

interface Level {
  lvl_num: number;
  table: Tag[];
}

export interface Tag {
  tag: string;
  classes: string;
  innerTags: Tag[] | null;
}
