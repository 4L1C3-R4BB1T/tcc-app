export interface UserRanking {
  name: string;
  totalExp: number;
  isCurrentUser?: boolean;
  position?: number;
}

export interface UserStatistics {
  correctAnswers: number;
  wrongAnswers: number;
  qttAchievements: number;
  totalExp: number;
}
