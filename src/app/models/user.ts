export interface UserRanking {
  name: string;
  totalExp: number;
  isCurrentUser?: boolean;
  position?: number;
}

export interface UserStatistics {
  correctAnswers: number;
  wrongAnswers: number;
  challengesCompleted: number;
  qttAchievements: number;
  totalExp: number;
  offensive: number;
  activities: ActivityDate[];
}

interface ActivityDate {
  date: Date;
}
