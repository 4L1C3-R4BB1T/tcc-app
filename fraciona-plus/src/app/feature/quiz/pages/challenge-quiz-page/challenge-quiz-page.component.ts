import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ChallengeQuizPageComponent implements OnInit {

  @ViewChild(ActivityComponent)
  activityComponent!: ActivityComponent;

  currentPercentage = signal(0.1);

  currentQuestion = signal<Question | null>(null);
  currentQuestionIndex = signal<number | null>(null);

  questions = questions;

  isAnswered = signal(false);

  totalCorrectAnswers: number = 0;

  disableButton = signal(false);

  constructor(readonly router: Router, readonly route: ActivatedRoute) { }

  ngOnInit() {
    this.disableButton.set(true);

    if (this.questions.length > 0) {
      this.currentQuestion.set(this.questions[0]);
      this.currentQuestionIndex.set(0);
    }
  }

  checkAnswered() {
    this.isAnswered.set(true);
    this.activityComponent.canMark.set(true);

    if (this.activityComponent.isCorrect()) {
      this.totalCorrectAnswers++;
    }
  }

  goToNext() {
    // resetando variaveis
    this.activityComponent.selectedAnswerId = null;
    this.activityComponent.isAnswered.set(false);
    this.activityComponent.canMark.set(false);
    this.isAnswered.set(false);

    const currentQuestionIndex = this.currentQuestionIndex()! + 1;
    this.currentPercentage.update(oldPercentage => oldPercentage + (currentQuestionIndex / this.questions.length));

    this.activityComponent.selectedAlternativeId.set(null);

    if (currentQuestionIndex < this.questions.length) {
      this.currentQuestion.set(this.questions[currentQuestionIndex]);
      this.currentQuestionIndex.set(currentQuestionIndex);
      this.disableButton.set(true);
    } else {
      // criar pagina de resultados
      this.router.navigate(['/quiz/result'], {
        queryParams: {
          state: JSON.stringify({
            totalQuestions: this.questions.length,
            totalCorrectAnswers: this.totalCorrectAnswers
          })
        }
      });
      // resetando quantidade de respostas corretas
      this.totalCorrectAnswers = 0;
    }
  }

}
