import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserInfoPanelComponent } from './components/user-info-panel/user-info-panel.component';
import { AchievementPageComponent } from './pages/achievement-page/achievement-page.component';
import { ChallengePageComponent } from './pages/challenge-page/challenge-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TrailProgressComponent } from './pages/learn-page/components/trail-progress/trail-progress.component';
import { LearnPageComponent } from './pages/learn-page/learn-page.component';
import { ChangeNameComponent } from './pages/profile-page/components/change-name/change-name.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RankingPageComponent } from './pages/ranking-page/ranking-page.component';
import { TabRoutingModule } from './tab-routing.module';
import { TabComponent } from './tab.component';

@NgModule({
  declarations: [
    TabComponent,
    HomePageComponent,
    LearnPageComponent,
    ChallengePageComponent,
    RankingPageComponent,
    ProfilePageComponent,
    UserInfoPanelComponent,
    TrailProgressComponent,
    ChangeNameComponent,
    AchievementPageComponent
  ],
  imports: [
    TabRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class TabModule { }
