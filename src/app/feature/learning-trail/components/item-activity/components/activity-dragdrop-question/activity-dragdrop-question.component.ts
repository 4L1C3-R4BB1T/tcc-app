import { Component, inject, Input } from '@angular/core';
import { ItemActivityComponent } from '../../item-activity.component';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-activity-dragdrop-question',
  templateUrl: './activity-dragdrop-question.component.html',
  styleUrls: ['./activity-dragdrop-question.component.scss'],
})
export class ActivityDragdropQuestionComponent {

  @Input({ required: true })
  data!: Question;

  parent = inject(ItemActivityComponent);

}
