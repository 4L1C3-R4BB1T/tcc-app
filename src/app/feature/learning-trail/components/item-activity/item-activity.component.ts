import { Component, computed, inject, Input, signal, ViewChild } from '@angular/core';
import { ALTERNATIVE } from 'src/app/models/question';
import { LearningTrailComponent } from '../../learning-trail.component';
import { ActivityDragdropQuestionComponent } from './components/activity-dragdrop-question/activity-dragdrop-question.component';

@Component({
  selector: 'app-item-activity',
  templateUrl: './item-activity.component.html',
  styleUrls: ['./item-activity.component.scss'],
})
export class ItemActivityComponent {

  @Input({ required: true })
  data!: any;

  parent = inject(LearningTrailComponent);
  selectedAlternativeId = signal<number | null>(null);

  isCorrect = computed(() => this.selectedAlternativeId() === this.data.correctId);

  isAnswered = signal(false);
  selectedAnswerId: number | null = null;

  canMark = signal(false);

  @ViewChild(ActivityDragdropQuestionComponent)
  child!: ActivityDragdropQuestionComponent;

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
