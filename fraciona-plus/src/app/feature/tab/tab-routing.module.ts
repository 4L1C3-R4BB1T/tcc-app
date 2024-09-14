import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementPageComponent } from './pages/achievement-page/achievement-page.component';
import { ChallengePageComponent } from './pages/challenge-page/challenge-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LearnPageComponent } from './pages/learn-page/learn-page.component';
import { ProfilePageComponent } from './pages/perfil-page/profile-page.component';
import { RankingPageComponent } from './pages/ranking-page/ranking-page.component';
import { TabComponent } from './tab.component';

const routes: Routes = [
  {
    path: '',
    component: TabComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'learn',
        component: LearnPageComponent
      },
      {
        path: 'challenge',
        component: ChallengePageComponent
      },
      {
        path: 'ranking',
        component: RankingPageComponent
      },
      {
        path: 'profile',
        component: ProfilePageComponent
      },
      {
        path: 'achievements',
        component: AchievementPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabRoutingModule { }
