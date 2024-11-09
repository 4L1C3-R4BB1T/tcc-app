import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { Howl } from 'howler';
import { interval, Subscription } from 'rxjs';
import { QuestionRace } from 'src/app/models/question';
import { questions } from 'src/app/utils/questions';
import { StatisticService } from './../../services/statistic.service';

@Component({
  selector: 'app-race-challenge',
  templateUrl: './race-challenge.component.html',
  styleUrls: ['./race-challenge.component.scss']
})
export class RaceChallengeComponent implements OnInit, OnDestroy, ViewDidEnter {
  questions= signal<QuestionRace[]>([]);

  currentQuestionIndex = signal<number>(0);

  userPosition = signal<number>(0);
  systemPosition = signal<number>(0);

  win = signal<boolean>(true);
  gameOver = signal<boolean>(false);
  winnerMessage = signal<string>('');

  systemVelocity = signal<number>(1);

  timerSubscription: Subscription | undefined;

  loading = signal<boolean>(true);

  correctAnswerSound = new Howl({ src: ['assets/sounds/right.wav'] });
  wrongAnswerSound = new Howl({ src: ['assets/sounds/wrong.wav'] });

  winGameSound = new Howl({ src: ['assets/sounds/win.wav'] });
  loseGameSound = new Howl({ src: ['assets/sounds/lose.wav'], volume: 0.3 });

  bgGameSound = new Howl({ src: ['assets/sounds/happy-sandbox.wav'], loop: true, volume: 0.8 });

  constructor(
    readonly router: Router,
    readonly statisticService: StatisticService
  ) { }

  ngOnInit() {
    this.loadingData();
    this.bgGameSound.play();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  ionViewDidEnter(): void {
    this.loadingData();
    this.bgGameSound.play();
  }

  loadingData() {
    this.loading.set(true);
    this.questions.set(questions.sort(() => Math.random() - 0.5));
    this.resetGame();
    this.startSystemMovement();

    setTimeout(() => this.loading.set(false), 500);
  }

  startSystemMovement() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.systemPosition.set(this.systemPosition() + this.systemVelocity());
      if (!this.gameOver()) this.checkWinCondition();
    });
  }

  answerQuestion(selectedAnswer: string) {
    const currentQuestion = this.questions()[this.currentQuestionIndex()];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      this.correctAnswerSound.play();
      this.userPosition.set(this.userPosition() + 10);
    } else {
      this.wrongAnswerSound.play();
      this.systemVelocity.set(this.systemVelocity() + 1);
    }

    this.checkWinCondition();

    this.currentQuestionIndex.set(this.currentQuestionIndex() + 1);;

    if (this.currentQuestionIndex() >= this.questions.length) {
      this.checkWinCondition();
    }
  }

  checkWinCondition() {
    if (this.userPosition() >= 100) {
      this.gameOver.set(true);
      this.winnerMessage.set("Você ganhou! Continue assim!");
      this.win.set(true);
      this.stopSystemMovement();
      this.bgGameSound.stop();
      this.winGameSound.play();
    } else if (this.systemPosition() >= 100) {
      this.gameOver.set(true);
      this.winnerMessage.set("Você perdeu... Mas não desista, continue praticando!");
      this.win.set(false);
      this.stopSystemMovement();
      this.bgGameSound.stop();
      this.loseGameSound.play();
    }
  }

  stopSystemMovement() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resetGame() {
    if (this.gameOver()) {
      this.updateUserExp({ totalExp: this.win() ? 30 : 0 });
    }
    // resetando variaveis
    this.currentQuestionIndex.set(0);
    this.userPosition.set(0);
    this.systemPosition.set(0);
    this.gameOver.set(false);
    this.winnerMessage .set('');
    this.win.set(false);
    this.systemVelocity.set(1);

    this.stopSystemMovement();

    this.loseGameSound.stop();
    this.winGameSound.stop();
    this.bgGameSound.stop();
  }

  return() {
    this.bgGameSound.stop();
    this.resetGame();
    this.router.navigate(['tabs', 'home']);
  }

  updateUserExp(updateExp: { totalExp: number; }) {
    this.statisticService.updateStatistics(updateExp).subscribe({
      next: () => console.log("Estatísticas atualizadas"),
      error: (error) => console.error("Erro ao atualizar estatísticas:", error),
    });
  }
}
