import { Question } from "./question";

export interface Challenge {
  _id: string;
  title: string;
  difficulty: number;
  exp: number;
  image: string;
  questions?: Question[];
}
