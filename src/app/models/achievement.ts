export interface Achievement {
  title: string;
  description: string;
  image: string;
  color: string;
  disabled?: boolean;
  obtainedAt?: string;
}

export interface AchievementIcon {
  image: string;
  color: string;
}
