import { Component, inject, Input } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ActivityComponent } from '../../activity.component';
import { Alternative } from './../../../../../../models/question';

@Component({
  selector: 'app-objective-question',
  templateUrl: './objective-question.component.html',
  styleUrls: ['./objective-question.component.scss'],
})
export class ObjectiveQuestionComponent {

  @Input({ required: true })
  data!: Question;

  parent = inject(ActivityComponent);

  checkState(a: Alternative) {
    return {
      selected: this.isSelected(a),
      correct: this.isCorrect(a),
      wrong: this.isWrong(a),
    };
  }

  isSelected(a: Alternative) {
    return this.parent.selectedAnswerId === a.id;
  }

  isCorrect(a: Alternative) {
    return (this.parent.selectedAnswerId === a.id
      && a.id === this.parent.data.correctId
      && this.parent.canMark())
      || (a.id === this.parent.data.correctId
        && this.parent.selectedAnswerId !== this.parent.data.correctId
        && this.parent.canMark());
  }

  isWrong(a: Alternative) {
    return this.parent.selectedAnswerId === a.id
      && a.id !== this.parent.data.correctId
      && this.parent.canMark();
  }

}
