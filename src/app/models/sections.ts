import { TrailItem } from "./trail-item";

export interface Section {
  id: number;
  divider: string;
  units: Unit[];
}

export interface Unit {
  id: number;
  title: string;
  items: TrailItem[];
}
