import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/sections';
import { UserStatistics } from 'src/app/models/user';
import { AchievementService } from 'src/app/services/achievement.service';
import { StatisticService } from 'src/app/services/statistic.service';
import { SectionService } from './../../services/section.service';
import { ItemActivityComponent } from './components/item-activity/item-activity.component';

@Component({
  selector: 'app-learning-trail',
  templateUrl: './learning-trail.component.html',
  styleUrls: ['./learning-trail.component.scss'],
})
export class LearningTrailComponent implements OnInit {

  trailItemContent = signal<Item[]>([]);

  itemId: number = 0;
  sectionId: number = 0;

  itemContent = signal<Item | null>(null);

  @ViewChild(ItemActivityComponent)
  itemActivityComponent!: ItemActivityComponent;

  isAnswered = signal(false);

  disableButton = signal(false);

  constructor(
    readonly router: Router,
    readonly route: ActivatedRoute,
    readonly sectionService: SectionService,
    readonly statisticService: StatisticService,
    readonly achievementService: AchievementService
  ) { }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['itemId'] as number;
    this.sectionId = this.route.snapshot.params['sectionId'] as number;

    this.sectionService.getItens(this.sectionId).subscribe({
      next: (data) => {
        this.trailItemContent.set(data)
        this.itemContent.set(this.trailItemContent()[this.itemId - 1]);
        console.log('Conteúdo dos itens:', this.trailItemContent());
        console.log('Item atual:', this.itemContent());
      },
      error: (error) => console.error("Erro ao carregar seção:", error)
    });

    this.disableButton.set(true);
  }

  checkAnswered() {
    this.isAnswered.set(true);
    this.itemActivityComponent.canMark.set(true);
  }

  returnActivity() {
    this.itemActivityComponent.selectedAnswerId = null;
    this.itemActivityComponent.isAnswered.set(false);
    this.itemActivityComponent.canMark.set(false);
    this.isAnswered.set(false);

    this.updateData(this.itemActivityComponent.isCorrect() ? 5 : 0);

    let update: Partial<UserStatistics> = {
      correctAnswers: 0, wrongAnswers: 0, totalExp: 0
    };

    if (this.itemActivityComponent.isCorrect()) {
      update.correctAnswers = 1;
      update.totalExp = 5;
    } else {
      update.wrongAnswers = 1;
    }

    update.totalExp = !this.itemContent()?.completed ? 5 : 0;

    console.log("totalExp", update.totalExp)

    this.updateData(update);
    this.router.navigate(['/tabs/learn']);
  }

  returnContent() {
    let update: Partial<UserStatistics> = { totalExp: 0 };
    update.totalExp = !this.itemContent()?.completed ? 5 : 0;
    this.updateData(update);
    this.router.navigate(['/tabs/learn']);
  }

  updateData(obj: any) {
    // setar item como completed
    this.sectionService.updateItem(this.sectionId, this.itemId, { completed: true, disabled: false })
      .subscribe({
        next: () => console.log("Item atualizado com sucesso"),
        error: (error) => console.error("Erro ao atualizar seção:", error)
      });

    // atualizar estatisticas do usuario
    this.statisticService.updateStatistics(obj).subscribe({
      next: (response) => console.log('Estatísticas atualizadas:', response),
      error: (error) => console.error('Erro ao atualizar estatísticas:', error),
    });

    // setar next item como disable false
    const nextItemIndex = Number(this.itemId) + 1;

    // verificar se existe um próximo item
    if (nextItemIndex <= this.trailItemContent().length) {
      const nextItem = this.trailItemContent()[nextItemIndex - 1];
      this.sectionService.updateItem(this.sectionId, nextItem.id, { disabled: false }).subscribe({
        next: () => console.log(`Próximo item (ID: ${nextItem.id}) habilitado com sucesso!`),
        error: (error) => console.error("Erro ao habilitar o próximo item:", error)
      });
    } else {
      console.log("Não há próximo item.");
    }

    // checar conquistas
    this.achievementService.checkAchievements().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error("Erro ao checar conquistas:", error)
    });
  }

}
