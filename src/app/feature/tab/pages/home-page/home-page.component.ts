import { Component } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { UserRanking } from 'src/app/models/user';
import { RankingService } from 'src/app/services/ranking.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements ViewDidEnter {

  userRanking: UserRanking | null = null;

  constructor(readonly rankingService: RankingService) { }

  ionViewDidEnter(): void {
    this.rankingService.findByUser().subscribe({
      next: (data) => this.userRanking = data,
      error: (error) => console.error("Erro ao carregar ranking do usuário:", error)
    });
  }

}
