import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AccountCreatedPageComponent } from './pages/account-created-page/account-created-page.component';
import { CreateAccountPageComponent } from './pages/create-account-page/create-account-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginPageComponent,
    LoginFormComponent,
    CreateAccountPageComponent,
    AccountCreatedPageComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export default class LoginModule { }
