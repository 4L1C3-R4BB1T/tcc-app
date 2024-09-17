import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface ChallengeResultState {
  totalQuestions: number;
  totalCorrectAnswers: number;
}

@Component({
  selector: 'app-challenge-result-page',
  templateUrl: './challenge-result-page.component.html',
  styleUrls: ['./challenge-result-page.component.scss'],
})
export class ChallengeResultPageComponent implements OnInit {

  totalCorrectAnswers = signal<number>(0);
  totalQuestions = signal<number>(0);

  challengeResult = signal<number>(0);

  constructor(readonly route: ActivatedRoute, readonly router: Router) { }

  ngOnInit() {
    const state = JSON.parse(this.route.snapshot.queryParams['state']) as ChallengeResultState;

    const { totalQuestions, totalCorrectAnswers } = state;

    this.totalCorrectAnswers.set(totalCorrectAnswers);
    this.totalQuestions.set(totalQuestions);

    if (totalCorrectAnswers == totalQuestions) {
      this.challengeResult.set(1);
    } else if (totalCorrectAnswers >= totalQuestions / 2) {
      this.challengeResult.set(2);
    } else {
      this.challengeResult.set(3);
    }
  }

}
