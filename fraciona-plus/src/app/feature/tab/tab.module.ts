import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserInfoPanelComponent } from './components/user-info-panel/user-info-panel.component';
import { ChallengePageComponent } from './pages/challenge-page/challenge-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LearnPageComponent } from './pages/learn-page/learn-page.component';
import { PerfilPageComponent } from './pages/perfil-page/perfil-page.component';
import { TabRoutingModule } from './tab-routing.module';
import { TabComponent } from './tab.component';
import { TrailProgressComponent } from './pages/learn-page/components/trail-progress/trail-progress.component';

@NgModule({
  declarations: [
    TabComponent,
    HomePageComponent,
    LearnPageComponent,
    ChallengePageComponent,
    PerfilPageComponent,
    UserInfoPanelComponent,
    TrailProgressComponent
  ],
  imports: [
    TabRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class TabModule { }
