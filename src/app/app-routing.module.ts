import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authLoggedGuard } from './guards/auth-logged.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./feature/welcome/welcome.module'),
    canActivate: [authLoggedGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./feature/login/login.module')
  },
  {
    path: 'tabs',
    loadChildren: () => import('./feature/tab/tab.module'),
    canActivate: [authGuard]
  },
  {
    path: 'quiz',
    loadChildren: () => import('./feature/quiz/quiz.module'),
    canActivate: [authGuard]
  },
  {
    path: 'learning/section/:sectionId/item/:itemId',
    loadChildren: () => import('./feature/learning-trail/learning-trail.module'),
    canActivate: [authGuard]
  },
  {
    path: 'challenge/race',
    loadChildren: () => import('./feature/race-challenge/race-challenge.module'),
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, bindToComponentInputs: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
