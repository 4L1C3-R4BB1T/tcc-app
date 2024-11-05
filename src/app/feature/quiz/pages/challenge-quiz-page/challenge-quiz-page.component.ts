import { Component, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { Question } from 'src/app/models/question';
import { ChallengeService } from 'src/app/services/challenge.service';
import { ActivityComponent } from '../../components/activity/activity.component';

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

  questions = signal<Question[]>([]);

  isAnswered = signal(false);

  totalCorrectAnswers = signal<number>(0);

  disableButton = signal(false);

  challengeId = signal<string>("");

  lifes = signal(5);

  loading = signal<boolean>(true);

  correctAnswerSound = new Howl({ src: ['assets/sounds/right.wav'] });
  wrongAnswerSound = new Howl({ src: ['assets/sounds/wrong.wav'] });

  constructor(
    readonly router: Router,
    readonly route: ActivatedRoute,
    readonly challengeService: ChallengeService
  ) { }

  ionViewDidEnter(): void {
    this.challengeId.set(this.route.snapshot.params['id'] as string);

    this.loading.set(true);
    this.challengeService.findById(this.challengeId()).subscribe({
      next: (data) => {
        this.questions.set(data.questions as Question[]);

        if (this.questions().length > 0) {
          this.currentQuestion.set(this.questions()[0]);
          this.currentQuestionIndex.set(0);
          this.lifes.set(5);
        }

        this.loading.set(false);
      },
      error: (error) => {
        console.error("Erro ao carregar conquistas:", error);
        this.loading.set(false);
      }
    });

    this.disableButton.set(true);
    this.currentPercentage.set(0.1);
  }

  checkAnswered() {
    this.isAnswered.set(true);
    this.activityComponent.canMark.set(true);

    if (this.activityComponent.isCorrect()) {
      this.totalCorrectAnswers.set(this.totalCorrectAnswers() + 1);
      this.correctAnswerSound.play();
    } else {
      this.lifes.set(this.lifes() - 1); // perder vidas
      this.wrongAnswerSound.play();
    }

    if (this.lifes() === 0) {
      this.totalCorrectAnswers.set(0);
      this.router.navigate(['quiz', 'fail']);
    }
  }

  checkAnsweredDragdrop() {
    this.isAnswered.set(true);
    if (this.activityComponent.child.isCorrectDrop) {
      this.totalCorrectAnswers.set(this.totalCorrectAnswers() + 1);
      this.correctAnswerSound.play();
    } else {
      this.lifes.set(this.lifes() - 1); // perder vidas
      this.wrongAnswerSound.play();
    }

    if (this.lifes() === 0) {
      this.totalCorrectAnswers.set(0);
      this.router.navigate(['quiz', 'fail']);
    }
  }

  goToNext() {
    // resetando variaveis
    this.activityComponent.selectedAnswerId = null;
    this.activityComponent.isAnswered.set(false);
    this.activityComponent.canMark.set(false);
    this.isAnswered.set(false);

    const currentQuestionIndex = this.currentQuestionIndex()! + 1;
    this.currentPercentage.set(currentQuestionIndex / this.questions().length);

    this.activityComponent.selectedAlternativeId.set(null);

    if (currentQuestionIndex < this.questions().length) {
      this.currentQuestion.set(this.questions()[currentQuestionIndex]);
      this.currentQuestionIndex.set(currentQuestionIndex);
      this.disableButton.set(true);
    } else {
      // criar pagina de resultados
      this.router.navigate(['quiz', 'result'], {
        queryParams: {
          state: JSON.stringify({
            totalQuestions: this.questions().length,
            totalCorrectAnswers: this.totalCorrectAnswers(),
            gainedExp: this.totalCorrectAnswers() * 5
          })
        }
      });
      // resetando quantidade de respostas corretas
      this.totalCorrectAnswers.set(0);
    }
  }

}
