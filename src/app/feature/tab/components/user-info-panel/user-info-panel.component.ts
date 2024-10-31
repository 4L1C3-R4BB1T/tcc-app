import { Component, OnInit, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { User } from 'firebase/auth';
import { UserStatistics } from 'src/app/models/user';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-user-info-panel',
  templateUrl: './user-info-panel.component.html',
  styleUrls: ['./user-info-panel.component.scss'],
})
export class UserInfoPanelComponent implements OnInit {

  user = signal<User | null>(null);
  statistics = signal<UserStatistics | null>(null);

  constructor(readonly statisticService: StatisticService, readonly auth: Auth) { }

  ngOnInit(): void {
    this.user.set(this.auth.currentUser);

    // executa na primeira vez
    this.statisticService.findByUser().subscribe({
      next: (data) => this.statistics.set(data),
      error: (error) => console.error("Erro ao carregar estatísticas:", error)
    });

    // mantem executando a cada 1 segundo
    setInterval(() => {
      this.statisticService.findByUser().subscribe({
        next: (data) => this.statistics.set(data),
        error: (error) => console.error("Erro ao carregar estatísticas:", error)
      });
      console.log("Atualizando estatísticas do usuário...");
    }, 30000);
  }

  calculateLevelAndProgress(totalExp: number): { level: number, progress: number, currentExp: number, nextLevelExp: number } {
    let level = 1; // Iniciar o nível em 1
    let expForNextLevel = 100 * (level) + 50; // A primeira experiência necessária para o nível 1

    while (totalExp >= expForNextLevel) {
      totalExp -= expForNextLevel;
      level++;
      expForNextLevel = 100 * (level) + 50; // Atualiza a experiência necessária para o próximo nível
    }

    // Calcule o progresso como uma porcentagem do total necessário para o próximo nível.
    const progress = totalExp / expForNextLevel;

    return {
      level,
      progress,
      currentExp: totalExp,
      nextLevelExp: expForNextLevel
    };
  }

  get currentExp(): number {
    const totalExp = this.statistics()?.totalExp ?? 0;
    return this.calculateLevelAndProgress(totalExp).currentExp;
  }

  get nextLevelExp(): number {
    const totalExp = this.statistics()?.totalExp ?? 0;
    return this.calculateLevelAndProgress(totalExp).nextLevelExp;
  }

  get level(): number {
    const totalExp = this.statistics()?.totalExp ?? 0;
    return this.calculateLevelAndProgress(totalExp).level;
  }

  get progress(): number {
    const totalExp = this.statistics()?.totalExp ?? 0;
    return this.calculateLevelAndProgress(totalExp).progress;
  }

  get levelIcon(): string {
    const iconIndex = Math.floor((this.level - 1) / 5);
    return `assets/image/level/${Math.min(iconIndex + 1, 8)}.png`;
  }

}
