import { Component, computed, inject, Input, signal, ViewChild } from '@angular/core';
import { ALTERNATIVE, Question } from 'src/app/models/question';
import { ChallengeQuizPageComponent } from '../../pages/challenge-quiz-page/challenge-quiz-page.component';
import { DragdropQuestionComponent } from './components/dragdrop-question/dragdrop-question.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {

  @Input({ required: true })
  data!: Question;

  parent = inject(ChallengeQuizPageComponent);
  selectedAlternativeId = signal<number | null>(null);

  isCorrect = computed(() => this.selectedAlternativeId() === this.data.correctId);

  isAnswered = signal(false);
  selectedAnswerId: number | null = null;

  canMark = signal(false);

  @ViewChild(DragdropQuestionComponent)
  child!: DragdropQuestionComponent;

  getOrder(index: number) {
    if (index < 0 || index >= ALTERNATIVE.length) {
      throw new Error('O índice deve estar entre 0 e o comprimento das alternativas menos 1.');
    }
    return ALTERNATIVE[index];
  }

  markAnswer(id: number) {
    this.selectedAlternativeId.set(id);
    this.isAnswered.set(true);
    this.selectedAnswerId = id;
    this.parent.disableButton.set(false);
  }

  getAlternativeStatusClass(alternativeId: number) {
    return {
      selected: this.selectedAlternativeId() === alternativeId
    };
  }

}
