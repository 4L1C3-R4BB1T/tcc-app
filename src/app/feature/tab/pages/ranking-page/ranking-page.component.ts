import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { UserRanking } from 'src/app/models/user';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss'],
})
export class RankingPageComponent implements ViewDidEnter {

  users: UserRanking[] = [];

  constructor(readonly rankingService: RankingService) { }

  ionViewDidEnter(): void {
    this.rankingService.findAll().subscribe({
      next: (data) => this.users = data,
      error: (error) => console.error("Erro ao carregar ranking:", error)
    });
  }

}
