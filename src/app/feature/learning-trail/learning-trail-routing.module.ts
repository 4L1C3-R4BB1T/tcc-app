import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningTrailComponent } from './learning-trail.component';

const routes: Routes = [
  {
    path: '',
    component: LearningTrailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningTrailRoutingModule { }
