import { Component, OnInit, signal } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { User } from 'firebase/auth';
import { filter } from 'rxjs';
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

  constructor(
    readonly statisticService: StatisticService,
    readonly auth: Auth,
    readonly router: Router
  ) { }

  ngOnInit(): void {
    // Monitora todas as mudanças de rota
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      // Atualiza as informações do usuário e as estatísticas após qualquer navegação
      this.user.set(this.auth.currentUser);
      console.log(this.user());
      // Chama o serviço de estatísticas e atualiza os dados
      this.statisticService.findByUser().subscribe({
        next: (data) => {
          this.statistics.set(data);
          console.log("Atualizando estatísticas do usuário...");
        },
        error: (error) => console.error("Erro ao carregar estatísticas:", error)
      });
    });
  }

  calculateLevelAndProgress(totalExp: number) {
    let level = 1; // iniciar o nível em 1
    let expForNextLevel = 100 * (level) + 50; // a primeira experiência necessária para o nível 1

    while (totalExp >= expForNextLevel) {
      totalExp -= expForNextLevel;
      level++;
      expForNextLevel = 100 * (level) + 50; // atualiza a experiência necessária para o próximo nível
    }

    // calcula o progresso como uma porcentagem do total necessário para o próximo nível
    const progress = totalExp / expForNextLevel;

    return {
      level,
      progress,
      currentExp: totalExp,
      nextLevelExp: expForNextLevel
    };
  }

  get currentExp() {
    const totalExp = this.statistics()?.totalExp ?? 0;
    return this.calculateLevelAndProgress(totalExp).currentExp;
  }

  get nextLevelExp() {
    const totalExp = this.statistics()?.totalExp ?? 0;
    return this.calculateLevelAndProgress(totalExp).nextLevelExp;
  }

  get level() {
    const totalExp = this.statistics()?.totalExp ?? 0;
    return this.calculateLevelAndProgress(totalExp).level;
  }

  get progress() {
    const totalExp = this.statistics()?.totalExp ?? 0;
    return this.calculateLevelAndProgress(totalExp).progress;
  }

  get levelIcon() {
    const iconIndex = Math.floor((this.level - 1) / 5);
    return `assets/image/level/${Math.min(iconIndex + 1, 8)}.png`;
  }

}
