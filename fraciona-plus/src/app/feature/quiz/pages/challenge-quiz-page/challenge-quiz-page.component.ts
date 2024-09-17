import { Component, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { ActivityComponent, Question } from '../../components/activity/activity.component';

const questions: Question[] = [
  {
    id: 1,
    content: 'Que fração representa 1 parte da pizza?',
    image: 'pizza.png',
    alternatives: [
      { id: 1, label: '1/1' },
      { id: 2, label: '1/8' },
      { id: 3, label: '1/2' },
      { id: 4, label: '1/4' }
    ],
    correctId: 2
  },
  {
    id: 2,
    content: 'Que fração representa o mesmo que 1/3?',
    alternatives: [
      { id: 1, label: '2/3' },
      { id: 2, label: '3/3' },
      { id: 3, label: '2/6' },
      { id: 4, label: '3/6' }
    ],
    correctId: 3
  }
];

@Component({
  selector: 'app-challenge-quiz-page',
  templateUrl: './challenge-quiz-page.component.html',
  styleUrls: ['./challenge-quiz-page.component.scss'],
})
export class ChallengeQuizPageComponent implements ViewDidEnter {

  @ViewChild(ActivityComponent)
  activityComponent!: ActivityComponent;

  currentPercentage = signal(0.1);

  currentQuestion = signal<Question | null>(null);
  currentQuestionIndex = signal<number | null>(null);

  questions = questions;

  canGo = signal(false);

  constructor(readonly router: Router, readonly route: ActivatedRoute) { }

  ionViewDidEnter() {
    if (this.questions.length > 0) {
      this.currentQuestion.set(this.questions[0]);
      this.currentQuestionIndex.set(0);
    }
  }

  goToNext() {
    // resetando variaveis
    this.activityComponent.selectedAnswerId = null;
    this.activityComponent.isAnswered.set(false);
    this.canGo.set(false);

    const currentQuestionIndex = this.currentQuestionIndex()! + 1;
    this.currentPercentage.update(oldPercentage => oldPercentage + (currentQuestionIndex / this.questions.length));

    this.activityComponent.selectedAlternativeId.set(null);

    if (currentQuestionIndex < this.questions.length) {
      this.currentQuestion.set(this.questions[currentQuestionIndex]);
      this.currentQuestionIndex.set(currentQuestionIndex);
    } else {
      // criar pagina de resultados
      this.router.navigate(['/tabs/challenge']);
    }
  }

}
