import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RaceChallengeRoutingModule } from './race-challenge-routing.module';
import { RaceChallengeComponent } from './race-challenge.component';

@NgModule({
  declarations: [
    RaceChallengeComponent
  ],
  imports: [
    RaceChallengeRoutingModule,
    SharedModule
  ]
})
export default class RaceChallengeModule { }
