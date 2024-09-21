import { TrailItem } from "./trail-item";

export interface Section {
  id: number;
  title: string;
  items: TrailItem[];
}
