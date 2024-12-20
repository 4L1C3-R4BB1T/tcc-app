import { Component, signal } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { UserRanking } from 'src/app/models/user';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.scss'],
})
export class RankingPageComponent implements ViewDidEnter {

  users = signal<UserRanking[]>([]);

  loading = signal<boolean>(true);

  limit = 5;

  constructor(readonly rankingService: RankingService) { }

  ionViewDidEnter(): void {
    this.loading.set(true);
    this.rankingService.findAll().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Erro ao carregar ranking:", error)
        this.loading.set(false);
      }
    });
  }

}
