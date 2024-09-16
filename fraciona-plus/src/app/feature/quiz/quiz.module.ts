import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivityComponent } from './components/activity/activity.component';
import { ChallengeQuizPageComponent } from './pages/challenge-quiz-page/challenge-quiz-page.component';
import { QuizRoutingModule } from './quiz-routing.module';

@NgModule({
  declarations: [
    ChallengeQuizPageComponent,
    ActivityComponent
  ],
  imports: [
    QuizRoutingModule,
    SharedModule
  ]
})
export default class QuizModule { }
