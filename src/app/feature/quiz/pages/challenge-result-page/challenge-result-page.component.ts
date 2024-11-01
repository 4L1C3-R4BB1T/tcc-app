import { StatisticService } from './../../../../services/statistic.service';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeResult } from 'src/app/models/challenge-result';
import { UserStatistics } from 'src/app/models/user';

@Component({
  selector: 'app-challenge-result-page',
  templateUrl: './challenge-result-page.component.html',
  styleUrls: ['./challenge-result-page.component.scss'],
})
export class ChallengeResultPageComponent implements OnInit {

  totalCorrectAnswers = signal<number>(0);
  totalQuestions = signal<number>(0);
  gainedExp = signal<number>(0);

  challengeResult = signal<number>(0);

  constructor(
    readonly route: ActivatedRoute,
    readonly router: Router,
    readonly statisticService: StatisticService
  ) { }

  ngOnInit() {
    const state = JSON.parse(this.route.snapshot.queryParams['state']) as ChallengeResult;

    const { totalQuestions, totalCorrectAnswers, gainedExp } = state;

    this.totalCorrectAnswers.set(totalCorrectAnswers);
    this.totalQuestions.set(totalQuestions);
    this.gainedExp.set(gainedExp);

    if (totalCorrectAnswers == totalQuestions) {
      this.challengeResult.set(1);
    } else if (totalCorrectAnswers >= totalQuestions / 2) {
      this.challengeResult.set(2);
    } else {
      this.challengeResult.set(3);
    }
  }

  updateStatistics(): void {
    const update: Partial<UserStatistics> = {
      correctAnswers: this.totalCorrectAnswers(),
      wrongAnswers: this.totalQuestions() - this.totalCorrectAnswers(),
      totalExp: this.gainedExp()
    };

    this.statisticService.updateStatistics(update).subscribe({
      next: (response) => console.log('Estatísticas atualizadas:', response),
      error: (error) => console.error('Erro ao atualizar estatísticas:', error),
    });

    this.router.navigate(['tabs', 'challenge']);
  }

}
