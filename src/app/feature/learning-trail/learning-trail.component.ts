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

  loading = signal<boolean>(true);

  correctAnswerSound = new Howl({ src: ['assets/sounds/right.wav'] });
  wrongAnswerSound = new Howl({ src: ['assets/sounds/wrong.wav'] });

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

    this.loading.set(true);
    this.sectionService.getItens(this.sectionId).subscribe({
      next: (data) => {
        this.trailItemContent.set(data)
        this.itemContent.set(this.trailItemContent()[this.itemId - 1]);
        this.loading.set(false);
      },
      error: (error) => {
        console.error("Erro ao carregar seção:", error);
        this.loading.set(false);
      }
    });

    this.disableButton.set(true);
  }

  checkAnswered() {
    this.isAnswered.set(true);
    this.itemActivityComponent.canMark.set(true);

    if (this.itemActivityComponent.isCorrect()) {
      this.correctAnswerSound.play();
    } else {
      this.wrongAnswerSound.play();
    }
  }

  returnActivity() {
    this.itemActivityComponent.selectedAnswerId = null;
    this.itemActivityComponent.isAnswered.set(false);
    this.itemActivityComponent.canMark.set(false);
    this.isAnswered.set(false);

    let updateExp = { correctAnswers: 0, wrongAnswers: 0, totalExp: 5 };
    let updateItem = { completed: true, disabled: false };

    if (this.itemActivityComponent.isCorrect()) {
      updateExp.correctAnswers = 1;
    } else {
      updateExp.wrongAnswers = 1;
      updateExp.totalExp = 0;

      // verifica se o item ja n foi concluido antes
      if (!this.itemContent()?.completed) {
        updateItem.completed = false;
      }
    }

    if (this.itemContent()?.completed) {
      updateExp.totalExp = 0;
    }

    this.updateData(updateExp, updateItem);
    this.router.navigate(['/tabs/learn']);
  }

  returnContent() {
    let updateExp: Partial<UserStatistics> = { totalExp: 5 };

    if (this.itemContent()?.completed) {
      updateExp.totalExp = 0;
    }

    this.updateData(updateExp, { completed: true, disabled: false });
    this.router.navigate(['/tabs/learn']);
  }

  updateData(updateExp: any, updateItem: any) {
    // setar item como completed
    this.sectionService.updateItem(this.sectionId, this.itemId, updateItem)
      .subscribe({
        next: () => console.log("Item atualizado com sucesso"),
        error: (error) => console.error("Erro ao atualizar seção:", error)
      });

    // atualizar estatisticas do usuario
    this.statisticService.updateStatistics(updateExp).subscribe({
      next: () => console.log("Estatísticas atualizadas"),
      error: (error) => console.error("Erro ao atualizar estatísticas:", error),
    });

    // se o item atual foi completa, ou seja, se foi respondido corretamente
    if (updateItem.completed) {
      // setar next item como disable false
      const nextItemIndex = Number(this.itemId) + 1;

      // verificar se existe um próximo item
      if (nextItemIndex <= this.trailItemContent().length) {
        const nextItem = this.trailItemContent()[nextItemIndex - 1];
        this.sectionService.updateItem(this.sectionId, nextItem.id, { disabled: false }).subscribe({
          next: () => console.log(`Próximo item (ID: ${nextItem.id}) habilitado com sucesso`),
          error: (error) => console.error("Erro ao habilitar o próximo item:", error)
        });
      } else {
        console.log("Não há próximo item");
      }
    }

    // checar conquistas
    this.achievementService.checkAchievements().subscribe({
      next: (data) => console.log(data),
      error: (error) => console.error("Erro ao checar conquistas:", error)
    });
  }

}
