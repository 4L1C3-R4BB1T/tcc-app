import { Component, inject, Input } from '@angular/core';
import { ItemActivityComponent } from '../../item-activity.component';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-dragdrop-question',
  templateUrl: './dragdrop-question.component.html',
  styleUrls: ['./dragdrop-question.component.scss'],
})
export class DragdropQuestionComponent {

  @Input({ required: true })
  data!: Question;

  parent = inject(ItemActivityComponent);

}
