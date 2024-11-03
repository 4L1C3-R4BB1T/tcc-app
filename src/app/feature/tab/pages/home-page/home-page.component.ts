import { Component, signal } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import { UserRanking } from 'src/app/models/user';
import { AchievementService } from 'src/app/services/achievement.service';
import { RankingService } from 'src/app/services/ranking.service';
import { StatisticService } from './../../../../services/statistic.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements ViewDidEnter {

  userRanking = signal<UserRanking | null>(null);

  offensive = signal<number>(0);

  activities: Date[] = []; // Para armazenar as datas das atividades
  daysWithActivity: boolean[] = [false, false, false, false, false, false, false]; // Para marcar os dias

  constructor(
    readonly rankingService: RankingService,
    readonly statisticService: StatisticService,
    readonly achievementService: AchievementService
  ) { }

  ionViewDidEnter(): void {
    this.rankingService.findByUser().subscribe({
      next: (data) => this.userRanking.set(data),
      error: (error) => console.error("Erro ao carregar ranking do usuário:", error)
    });

    this.statisticService.findByUser().subscribe({
      next: (data) => {
        this.offensive.set(data.offensive),
        this.activities = data.activities.map(activity => new Date(activity.date));
        this.markDaysWithActivity();
      },
      error: (error) => console.error('Erro ao buscar estatísticas:', error)
    });

    this.achievementService.checkAchievements().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error("Erro ao checar conquistas:", error)
    });
  }

  markDaysWithActivity() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera horas, minutos, segundos e milissegundos

    // Para cada data de atividade, verifica qual dia da semana corresponde
    this.activities.forEach(activity => {
      const activityDate = new Date(activity);
      activityDate.setHours(0, 0, 0, 0); // Zera horas, minutos, segundos e milissegundos
      const dayOfWeek = activityDate.getDay(); // 0 = domingo, 1 = segunda, ..., 6 = sábado

      // Marca o dia da semana correspondente como verdadeiro se a atividade é da semana atual
      if (activityDate >= this.getStartOfWeek(today)) {
        this.daysWithActivity[dayOfWeek] = true;
      }
    });
  }

  // Função para obter o início da semana (domingo ou segunda, dependendo da sua lógica)
  getStartOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay()); // Ajusta para o domingo
    startOfWeek.setHours(0, 0, 0, 0); // Zera horas, minutos, segundos e milissegundos
    return startOfWeek;
  }

}
