import { Component } from '@angular/core';

export type Alternative = {
  id: string;
  label: string;
};

export type Question = {
  id: number;
  content: string;
  image?: string;
  alternatives: Alternative[];
  correct: string;
};

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {

  questions: Question[] = [
    {
      id: 1,
      content: 'Que fração representa 1 parte da pizza?',
      image: 'pizza.png',
      alternatives: [
        { id: 'A', label: '1/1' },
        { id: 'B', label: '1/8' },
        { id: 'C', label: '1/2' },
        { id: 'D', label: '1/4' }
      ],
      correct: 'B'
    }
  ];

}
