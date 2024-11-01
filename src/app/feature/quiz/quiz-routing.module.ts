import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeFailPageComponent } from './pages/challenge-fail-page/challenge-fail-page.component';
import { ChallengeQuizPageComponent } from './pages/challenge-quiz-page/challenge-quiz-page.component';
import { ChallengeResultPageComponent } from './pages/challenge-result-page/challenge-result-page.component';

const routes: Routes = [
  {
    path: 'started/:id',
    component: ChallengeQuizPageComponent
  },
  {
    path: 'result',
    component: ChallengeResultPageComponent
  },
  {
    path: 'fail',
    component: ChallengeFailPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
