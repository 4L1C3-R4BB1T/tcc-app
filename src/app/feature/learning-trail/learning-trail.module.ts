import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityDragdropQuestionComponent } from './components/item-activity/components/activity-dragdrop-question/activity-dragdrop-question.component';
import { ActivityObjectiveQuestionComponent } from './components/item-activity/components/activity-objective-question/activity-objective-question.component';
import { ItemActivityComponent } from './components/item-activity/item-activity.component';
import { ItemContentComponent } from './components/item-content/item-content.component';
import { LearningTrailRoutingModule } from './learning-trail-routing.module';
import { LearningTrailComponent } from './learning-trail.component';

@NgModule({
  declarations: [
    LearningTrailComponent,
    ItemActivityComponent,
    ItemContentComponent,
    ActivityObjectiveQuestionComponent,
    ActivityDragdropQuestionComponent
  ],
  imports: [
    LearningTrailRoutingModule,
    SharedModule
  ]
})
export default class LearningTrailModule { }
