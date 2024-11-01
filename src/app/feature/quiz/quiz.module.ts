import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityComponent } from './components/activity/activity.component';
import { DragdropQuestionComponent } from './components/activity/components/dragdrop-question/dragdrop-question.component';
import { ObjectiveQuestionComponent } from './components/activity/components/objective-question/objective-question.component';
import { ChallengeQuizPageComponent } from './pages/challenge-quiz-page/challenge-quiz-page.component';
import { ChallengeResultPageComponent } from './pages/challenge-result-page/challenge-result-page.component';
import { QuizRoutingModule } from './quiz-routing.module';
import { ChallengeFailPageComponent } from './pages/challenge-fail-page/challenge-fail-page.component';

@NgModule({
  declarations: [
    ActivityComponent,
    ChallengeQuizPageComponent,
    ChallengeResultPageComponent,
    ChallengeFailPageComponent,
    ObjectiveQuestionComponent,
    DragdropQuestionComponent
  ],
  imports: [
    QuizRoutingModule,
    SharedModule
  ]
})
export default class QuizModule { }
