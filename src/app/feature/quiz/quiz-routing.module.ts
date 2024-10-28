import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeQuizPageComponent } from './pages/challenge-quiz-page/challenge-quiz-page.component';
import { ChallengeResultPageComponent } from './pages/challenge-result-page/challenge-result-page.component';

const routes: Routes = [
  {
    path: 'started',
    component: ChallengeQuizPageComponent
  },
  {
    path: 'result',
    component: ChallengeResultPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
