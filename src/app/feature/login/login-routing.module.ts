import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authLoggedGuard } from 'src/app/guards/auth-logged.guard';
import { authGuard } from 'src/app/guards/auth.guard';
import { LoginComponent } from './login.component';
import { AccountCreatedPageComponent } from './pages/account-created-page/account-created-page.component';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RecoveryPageComponent } from './pages/recovery-page/recovery-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [authLoggedGuard]
      },
      {
        path: 'register',
        component: CreateAccountPageComponent,
        canActivate: [authLoggedGuard]
      },
      {
        path: 'recovery',
        component: RecoveryPageComponent,
        canActivate: [authLoggedGuard]
      }
    ],
  },
  {
    path: 'created',
    component: AccountCreatedPageComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
