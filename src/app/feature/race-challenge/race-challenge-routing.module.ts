import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceChallengeComponent } from './race-challenge.component';

const routes: Routes = [
  {
    path: '',
    component: RaceChallengeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaceChallengeRoutingModule { }
