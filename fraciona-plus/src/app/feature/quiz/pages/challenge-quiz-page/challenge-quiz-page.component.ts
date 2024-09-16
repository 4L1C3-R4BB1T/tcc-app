import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-challenge-quiz-page',
  templateUrl: './challenge-quiz-page.component.html',
  styleUrls: ['./challenge-quiz-page.component.scss'],
})
export class ChallengeQuizPageComponent {

  currentPercentage = signal(0.1);

}
