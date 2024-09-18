export interface TrailItem {
  id: number;
  disabled?: boolean;
  action: () => void;
  icon?: string;
}
