import { Alternative } from "./question";

export interface Section {
  id: number;
  divider: string;
  units: Unit[];
}

export interface Unit {
  id: number;
  title: string;
  items: Item[];
}

export interface Item {
  id: number;
  type: 'dragdrop' | 'objective';
  item: 'content' | 'activity';
  content?: string;
  image?: string;
  correctId?: number,
  alternatives?: Alternative[],
  title?: string;
  description: string;
  disabled: boolean;
  completed?: boolean;
}
