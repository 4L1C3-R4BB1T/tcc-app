import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DragdropQuestionComponent } from './components/item-activity/components/dragdrop-question/dragdrop-question.component';
import { ObjectiveQuestionComponent } from './components/item-activity/components/objective-question/objective-question.component';
import { ItemActivityComponent } from './components/item-activity/item-activity.component';
import { ItemContentComponent } from './components/item-content/item-content.component';
import { LearningTrailRoutingModule } from './learning-trail-routing.module';
import { LearningTrailComponent } from './learning-trail.component';

@NgModule({
  declarations: [
    LearningTrailComponent,
    ItemActivityComponent,
    ItemContentComponent,
    ObjectiveQuestionComponent,
    DragdropQuestionComponent
  ],
  imports: [
    LearningTrailRoutingModule,
    SharedModule
  ]
})
export default class LearningTrailModule { }
