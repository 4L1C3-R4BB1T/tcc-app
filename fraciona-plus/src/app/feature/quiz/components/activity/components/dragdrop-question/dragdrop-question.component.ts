import { Component, inject, Input } from '@angular/core';
import { Question } from 'src/app/models/question';
import { ActivityComponent } from '../../activity.component';

@Component({
  selector: 'app-dragdrop-question',
  templateUrl: './dragdrop-question.component.html',
  styleUrls: ['./dragdrop-question.component.scss'],
})
export class DragdropQuestionComponent {

  @Input({ required: true })
  data!: Question;

  parent = inject(ActivityComponent);

}
