import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallengeQuizPageComponent } from './pages/challenge-quiz-page/challenge-quiz-page.component';

const routes: Routes = [
  {
    path: 'challenge',
    children: [
      {
        path: '',
        component: ChallengeQuizPageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizRoutingModule { }
