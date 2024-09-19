import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./feature/welcome/welcome.module')
  },
  {
    path: 'account',
    loadChildren: () => import('./feature/login/login.module')
  },
  {
    path: 'tabs',
    loadChildren: () => import('./feature/tab/tab.module')
  },
  {
    path: 'quiz',
    loadChildren: () => import('./feature/quiz/quiz.module')
  },
  {
    path: 'learning/trail/:id',
    loadChildren: () => import('./feature/learning-trail/learning-trail.module')
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
