import { Component } from '@angular/core';

export type Challenge = {
  title: string;
  difficulty: number;
  exp: number;
  image: string;
}

@Component({
  selector: 'app-challenge-page',
  templateUrl: './challenge-page.component.html',
  styleUrls: ['./challenge-page.component.scss'],
})
export class ChallengePageComponent {

  challengers: Challenge[] = [
    {
      title: 'Rachando a Cuca',
      difficulty: 3,
      exp: 30,
      image: 'puzzle.png'
    },
    {
      title: 'Primeiros Passos',
      difficulty: 1,
      exp: 10,
      image: 'baby.png'
    },
    {
      title: 'Mestre das Frações',
      difficulty: 2,
      exp: 40,
      image: 'wizard.png'
    },
    {
      title: 'Calculadora Humana',
      difficulty: 2,
      exp: 45,
      image: 'calculator.png'
    },
    {
      title: 'A Grande Fração',
      difficulty: 3,
      exp: 35,
      image: 'number.png'
    },
    {
      title: 'Conhecimento Sólido',
      difficulty: 1,
      exp: 10,
      image: 'stone.png'
    }
  ];

}
